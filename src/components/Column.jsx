import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EntityList from './EntityList'
import TokenGrid from './TokenGrid'
import { useMatch } from '../context/MatchContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Column = ({ pillar, data }) => {
  const [columnState, setColumnState] = useState('closed') // closed, selection, tokens
  const [selectedEntity, setSelectedEntity] = useState(null)
  const { state: matchState } = useMatch()
  
  // Load tokens from localStorage
  const [allTokens, setAllTokens] = useLocalStorage('astrix_tokens', {})
  const [deletedTokens, setDeletedTokens] = useLocalStorage('astrix_deleted_tokens', {})

  const pillarLabels = {
    sign: 'Sign',
    house: 'House',
    nakshatra: 'Nakshatra',
    planet: 'Planet',
  }

  const getEntityTokens = (entityId) => {
    const entityTokens = allTokens[entityId] || []
    const deleted = deletedTokens[entityId] || []
    return entityTokens.filter(t => !deleted.includes(t.id))
  }

  const handleEntitySelect = (entity) => {
    setSelectedEntity(entity)
    setColumnState('tokens')
  }

  const handleBack = () => {
    setSelectedEntity(null)
    setColumnState('selection')
  }

  const handleToggle = () => {
    if (columnState === 'closed') {
      setColumnState('selection')
    } else {
      setColumnState('closed')
      setSelectedEntity(null)
    }
  }

  const handleAddToken = (token) => {
    if (!selectedEntity) return
    
    const updatedTokens = { ...allTokens }
    if (!updatedTokens[selectedEntity.id]) {
      updatedTokens[selectedEntity.id] = []
    }
    updatedTokens[selectedEntity.id].push(token)
    setAllTokens(updatedTokens)
  }

  const handleDeleteToken = (tokenId) => {
    if (!selectedEntity) return
    
    const updatedDeleted = { ...deletedTokens }
    if (!updatedDeleted[selectedEntity.id]) {
      updatedDeleted[selectedEntity.id] = []
    }
    updatedDeleted[selectedEntity.id].push(tokenId)
    setDeletedTokens(updatedDeleted)
  }

  const handleResetTokens = () => {
    if (!selectedEntity) return
    
    const updatedDeleted = { ...deletedTokens }
    updatedDeleted[selectedEntity.id] = []
    setDeletedTokens(updatedDeleted)
  }

  const hasDeletedTokens = selectedEntity && (deletedTokens[selectedEntity.id] || []).length > 0

  const getWidth = () => {
    if (columnState === 'closed') return '60px'
    if (columnState === 'selection') return '240px'
    return '260px'
  }

  return (
    <motion.div
      layout
      className="flex-shrink-0 bg-white/[0.04] border border-white/[0.09] rounded-[14px] backdrop-blur-xl overflow-hidden"
      style={{ width: getWidth(), height: '70vh' }}
    >
      {columnState === 'closed' ? (
        <div
          onClick={handleToggle}
          className="h-full flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
        >
          <div className="transform -rotate-90 whitespace-nowrap">
            <p className="text-white text-sm font-medium tracking-wider">
              {pillarLabels[pillar]}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {columnState === 'tokens' && (
                  <button
                    onClick={handleBack}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    ←
                  </button>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {pillarLabels[pillar]}
                  </p>
                  {selectedEntity && (
                    <p className="text-white font-semibold text-sm mt-0.5 truncate">
                      {selectedEntity.glyph} {selectedEntity.name}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleToggle}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-white font-medium transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {columnState === 'selection' && (
              <EntityList
                key="selection"
                entities={data}
                onSelect={handleEntitySelect}
              />
            )}
            
            {columnState === 'tokens' && selectedEntity && (
              <div key="tokens" className="flex flex-col flex-1 min-h-0">
                <TokenGrid
                  tokens={getEntityTokens(selectedEntity.id)}
                  pillar={pillar}
                  onAddToken={handleAddToken}
                  onDeleteToken={handleDeleteToken}
                  isMatchMode={matchState.isMatchMode}
                />
                {hasDeletedTokens && (
                  <div className="p-3 border-t border-white/10 flex-shrink-0">
                    <button
                      onClick={handleResetTokens}
                      className="w-full px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-xs text-gray-300 hover:text-white transition-colors"
                    >
                      Reset Deleted Tokens
                    </button>
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

export default Column
