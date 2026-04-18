import React from 'react'
import { MatchProvider, useMatch } from './context/MatchContext'
import InfiniteCanvas from './components/InfiniteCanvas'
import Column from './components/Column'
import MatchConnector from './components/MatchConnector'
import MatchNotesPanel from './components/MatchNotesPanel'
import { signs } from './data/signs'
import { houses } from './data/houses'
import { nakshatras } from './data/nakshatras'
import { planets } from './data/planets'

const TitleBar = () => {
  const handleMinimize = () => window.electronAPI?.minimize()
  const handleMaximize = () => window.electronAPI?.maximize()
  const handleClose = () => window.electronAPI?.closeApp()

  return (
    <div
      className="fixed top-0 left-0 right-0 h-9 flex items-center justify-between px-4 select-none"
      style={{
        backgroundColor: '#0d0d24',
        zIndex: 200,
        WebkitAppRegion: 'drag',
      }}
    >
      <div className="flex-1" />
      <h1
        className="text-lg font-bold"
        style={{
          fontFamily: 'Cinzel, serif',
          color: '#eab308',
          textShadow: '0 0 10px rgba(234, 179, 8, 0.5)',
        }}
      >
        Astrix
      </h1>
      <div className="flex-1 flex justify-end gap-2">
        <button
          onClick={handleMinimize}
          className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded text-white text-xs transition-colors"
          style={{ WebkitAppRegion: 'no-drag' }}
        >
          −
        </button>
        <button
          onClick={handleMaximize}
          className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded text-white text-xs transition-colors"
          style={{ WebkitAppRegion: 'no-drag' }}
        >
          □
        </button>
        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center bg-red-500/20 hover:bg-red-500 rounded text-white text-xs transition-colors"
          style={{ WebkitAppRegion: 'no-drag' }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

const AppContent = () => {
  const { state, dispatch } = useMatch()

  return (
    <div className="h-screen bg-[#08081a] overflow-hidden">
      <TitleBar />
      
      {/* Match Mode Toggle */}
      <div className="fixed top-10 right-4 z-50">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_MATCH_MODE' })}
          className={`
            px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300
            ${state.isMatchMode
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-500/50'
              : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
            }
          `}
        >
          {state.isMatchMode ? '✦ Match ON' : '○ Match OFF'}
        </button>
        {state.isMatchMode && state.pendingSelection && (
          <p className="mt-1 text-[10px] text-yellow-400 animate-pulse text-center">
            Select token from another pillar
          </p>
        )}
      </div>

      {/* Infinite Canvas */}
      <InfiniteCanvas>
        <div className="flex gap-4 p-8">
          <Column pillar="sign" data={signs} />
          <Column pillar="house" data={houses} />
          <Column pillar="nakshatra" data={nakshatras} />
          <Column pillar="planet" data={planets} />
        </div>
      </InfiniteCanvas>

      {/* Overlays */}
      <MatchConnector />
      <MatchNotesPanel />
    </div>
  )
}

function App() {
  return (
    <MatchProvider>
      <AppContent />
    </MatchProvider>
  )
}

export default App
