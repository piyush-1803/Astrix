import React, { createContext, useReducer, useContext } from 'react'

const MatchContext = createContext()

const PAIR_COLORS = ["#f59e0b","#10b981","#6366f1","#ec4899","#0ea5e9","#84cc16","#f97316","#a855f7"]

const initialState = {
  isMatchMode: false,
  pendingSelection: null,
  pairs: [],
  colorIndex: 0,
}

function matchReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MATCH_MODE':
      return {
        ...state,
        isMatchMode: !state.isMatchMode,
        pendingSelection: null,
      }
    
    case 'SELECT_TOKEN': {
      const { pillar, token, tokenRef } = action.payload
      
      if (!state.pendingSelection) {
        return {
          ...state,
          pendingSelection: { pillar, token, tokenRef },
        }
      }
      
      // Block same-column matching
      if (state.pendingSelection.pillar === pillar) {
        return {
          ...state,
          pendingSelection: { pillar, token, tokenRef },
        }
      }
      
      const color = PAIR_COLORS[state.colorIndex % PAIR_COLORS.length]
      const newPair = {
        id: Date.now(),
        fromPillar: state.pendingSelection.pillar,
        fromToken: state.pendingSelection.token,
        fromRef: state.pendingSelection.tokenRef,
        toPillar: pillar,
        toToken: token,
        toRef: tokenRef,
        color,
        note: '',
      }
      
      return {
        ...state,
        pendingSelection: null,
        pairs: [...state.pairs, newPair],
        colorIndex: state.colorIndex + 1,
      }
    }
    
    case 'REMOVE_PAIR':
      return {
        ...state,
        pairs: state.pairs.filter(pair => pair.id !== action.payload),
      }
    
    case 'UPDATE_NOTE':
      return {
        ...state,
        pairs: state.pairs.map(pair =>
          pair.id === action.payload.id
            ? { ...pair, note: action.payload.note }
            : pair
        ),
      }
    
    default:
      return state
  }
}

export function MatchProvider({ children }) {
  const [state, dispatch] = useReducer(matchReducer, initialState)
  
  return (
    <MatchContext.Provider value={{ state, dispatch }}>
      {children}
    </MatchContext.Provider>
  )
}

export function useMatch() {
  const context = useContext(MatchContext)
  if (!context) {
    throw new Error('useMatch must be used within MatchProvider')
  }
  return context
}

export default MatchContext
