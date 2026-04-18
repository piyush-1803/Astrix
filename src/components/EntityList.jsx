import React from 'react'
import { motion } from 'framer-motion'

const EntityList = ({ entities, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2"
    >
      {entities.map((entity, index) => (
        <motion.div
          key={entity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          onClick={() => onSelect(entity)}
          className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 rounded-lg cursor-pointer transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {entity.glyph}
            </span>
            <span className="text-white text-sm font-medium">{entity.name}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default EntityList
