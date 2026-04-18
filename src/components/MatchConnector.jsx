import React, { useState, useEffect, useRef } from 'react'
import { useMatch } from '../context/MatchContext'

const MatchConnector = () => {
  const { state, dispatch } = useMatch()
  const [paths, setPaths] = useState([])
  const animationRef = useRef()

  const calculatePaths = () => {
    const newPaths = state.pairs.map((pair) => {
      const fromRect = pair.fromRef?.current?.getBoundingClientRect()
      const toRect = pair.toRef?.current?.getBoundingClientRect()

      if (!fromRect || !toRect) return null

      const startX = fromRect.right
      const startY = fromRect.top + fromRect.height / 2
      const endX = toRect.left
      const endY = toRect.top + toRect.height / 2

      const midX = (startX + endX) / 2
      const midY = (startY + endY) / 2

      return {
        id: pair.id,
        path: `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`,
        midX,
        midY,
        color: pair.color,
      }
    }).filter(Boolean)

    setPaths(newPaths)
  }

  useEffect(() => {
    if (state.pairs.length === 0) {
      setPaths([])
      return
    }

    const animate = () => {
      calculatePaths()
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [state.pairs])

  if (state.pairs.length === 0) return null

  return (
    <>
      <svg
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
        style={{ zIndex: 100 }}
      >
        {paths.map((pathData) => (
          <path
            key={pathData.id}
            d={pathData.path}
            stroke={pathData.color}
            strokeWidth="2"
            fill="none"
            opacity="0.75"
          />
        ))}
      </svg>
      
      {/* Delete buttons at midpoints */}
      {paths.map((pathData) => (
        <div
          key={`btn-${pathData.id}`}
          className="fixed pointer-events-auto"
          style={{
            left: pathData.midX - 10,
            top: pathData.midY - 10,
            zIndex: 101,
          }}
        >
          <div
            onClick={() => dispatch({ type: 'REMOVE_PAIR', payload: pathData.id })}
            className="w-5 h-5 rounded-full bg-black/80 hover:bg-red-500 text-white text-xs flex items-center justify-center cursor-pointer transition-colors border border-white/30"
          >
            ✕
          </div>
        </div>
      ))}
    </>
  )
}

export default MatchConnector
