import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AddTokenInput = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd({
        id: Date.now().toString(),
        text: text.trim(),
      })
      setText('')
      setIsExpanded(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    } else if (e.key === 'Escape') {
      setIsExpanded(false)
      setText('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-3"
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="px-3 py-2 border-2 border-dashed border-white/20 rounded-full cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all text-center"
          >
            <span className="text-xs text-gray-400">+ add token</span>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="px-3 py-2 border border-white/30 rounded-full bg-white/5"
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!text.trim()) {
                  setIsExpanded(false)
                }
              }}
              className="w-full bg-transparent text-white text-xs focus:outline-none placeholder-gray-500"
              placeholder="Type keyword..."
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AddTokenInput
