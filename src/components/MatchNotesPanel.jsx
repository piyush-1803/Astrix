import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMatch } from '../context/MatchContext'

const MatchNotesPanel = () => {
  const { state, dispatch } = useMatch()
  const [isExpanded, setIsExpanded] = useState(true)

  if (state.pairs.length === 0) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-3xl w-[90vw] bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      style={{ zIndex: 60 }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">{isExpanded ? '▼' : '▶'}</span>
            <h3 className="text-white font-semibold text-xs">
              Active Matches ({state.pairs.length})
            </h3>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="max-h-48 overflow-y-auto p-3 space-y-2 custom-scrollbar"
          >
            {state.pairs.map((pair) => (
              <div
                key={pair.id}
                className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: pair.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 truncate">
                    <span className="text-white font-medium">{pair.fromToken.text}</span>
                    {' ↔ '}
                    <span className="text-white font-medium">{pair.toToken.text}</span>
                  </p>
                  <input
                    type="text"
                    value={pair.note}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_NOTE',
                        payload: { id: pair.id, note: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-2 py-0.5 bg-transparent border border-white/10 rounded text-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                    placeholder="Add note..."
                  />
                </div>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_PAIR', payload: pair.id })}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MatchNotesPanel
