import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useMatch } from '../context/MatchContext'

const TokenChip = forwardRef(({ token, pillar, onDelete, isMatchMode }, ref) => {
  const { state, dispatch } = useMatch()
  
  const isSelected = state.pendingSelection && 
    state.pendingSelection.token.id === token.id && 
    state.pendingSelection.pillar === pillar
  
  const isPaired = state.pairs.some(pair => 
    pair.fromToken.id === token.id || pair.toToken.id === token.id
  )
  
  const pairColor = isPaired ? state.pairs.find(pair => 
    pair.fromToken.id === token.id || pair.toToken.id === token.id
  )?.color : null

  const handleClick = () => {
    if (isMatchMode && ref) {
      dispatch({
        type: 'SELECT_TOKEN',
        payload: { pillar, token, tokenRef: ref },
      })
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(token.id)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className={`
        relative inline-flex items-center px-3 py-1.5 mr-2 mb-2
        rounded-full text-xs font-medium
        bg-white/[0.06] border border-white/[0.1]
        text-[#cbd5e1] cursor-default
        transition-all duration-200 group
        ${isMatchMode ? 'cursor-pointer hover:bg-white/[0.12] hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20' : ''}
        ${isSelected ? 'ring-2 ring-yellow-400 bg-yellow-400/10 border-yellow-400/50' : ''}
        ${isPaired && !isSelected ? 'bg-white/[0.08]' : ''}
      `}
    >
      <span className="pr-1">{token.text}</span>
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 ml-1 text-gray-400 hover:text-red-400 transition-all"
      >
        ✕
      </button>
      {isPaired && pairColor && (
        <div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-black/50"
          style={{ backgroundColor: pairColor }}
        />
      )}
    </motion.div>
  )
})

TokenChip.displayName = 'TokenChip'

export default TokenChip
