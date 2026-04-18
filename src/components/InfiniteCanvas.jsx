import React, { useState, useEffect, useCallback } from 'react'

const InfiniteCanvas = ({ children }) => {
  const [offset, setOffset] = useState({ x: 50, y: 50 })
  const [isPanning, setIsPanning] = useState(false)
  const [startPan, setStartPan] = useState({ x: 0, y: 0 })
  const [isSpacePressed, setIsSpacePressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.repeat) {
        setIsSpacePressed(true)
        e.preventDefault()
      }
    }
    
    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const handleMouseDown = useCallback((e) => {
    // Middle mouse button or left mouse with space
    if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
      setIsPanning(true)
      setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y })
      e.preventDefault()
    }
  }, [isSpacePressed, offset])

  const handleMouseMove = useCallback((e) => {
    if (isPanning) {
      setOffset({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      })
    }
  }, [isPanning, startPan])

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ top: '36px', cursor: isPanning ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default InfiniteCanvas
