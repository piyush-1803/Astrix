import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TokenChip from './TokenChip'
import AddTokenInput from './AddTokenInput'

const TokenGrid = ({ tokens, pillar, onAddToken, onDeleteToken, isMatchMode }) => {
  const tokenRefs = useRef({})

  const getRef = (tokenId) => {
    if (!tokenRefs.current[tokenId]) {
      tokenRefs.current[tokenId] = React.createRef()
    }
    return tokenRefs.current[tokenId]
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
      {tokens.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-xs">
            No tokens yet — add your first keyword below
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap">
          <AnimatePresence>
            {tokens.map((token) => (
              <TokenChip
                key={token.id}
                ref={getRef(token.id)}
                token={token}
                pillar={pillar}
                onDelete={onDeleteToken}
                isMatchMode={isMatchMode}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
      <AddTokenInput onAdd={onAddToken} />
    </div>
  )
}

export default TokenGrid
