import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Initial state for timeline
const initialState = {
  layers: [
    {
      id: 'video-layer-1',
      name: 'Video Track 1',
      type: 'video',
      clips: [],
      zIndex: 2
    },
    {
      id: 'audio-layer-1', 
      name: 'Audio Track 1',
      type: 'audio',
      clips: [],
      zIndex: 1
    }
  ],
  currentTime: 0,
  duration: 0,
  selectedClip: null,
  selectedLayer: null,
  isPlaying: false
};

// Action types
const ActionTypes = {
  ADD_CLIP: 'ADD_CLIP',
  REMOVE_CLIP: 'REMOVE_CLIP',
  UPDATE_CLIP: 'UPDATE_CLIP',
  MOVE_CLIP: 'MOVE_CLIP',
  SELECT_CLIP: 'SELECT_CLIP',
  SELECT_LAYER: 'SELECT_LAYER',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
  SET_PLAYING: 'SET_PLAYING',
  ADD_LAYER: 'ADD_LAYER',
  REMOVE_LAYER: 'REMOVE_LAYER'
};

// Reducer function
function timelineReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_CLIP: {
      const { layerId, clip } = action.payload;
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === layerId
            ? { ...layer, clips: [...layer.clips, { ...clip, id: `clip-${Date.now()}` }] }
            : layer
        )
      };
    }
    
    case ActionTypes.REMOVE_CLIP: {
      const { layerId, clipId } = action.payload;
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === layerId
            ? { ...layer, clips: layer.clips.filter(clip => clip.id !== clipId) }
            : layer
        ),
        selectedClip: state.selectedClip === clipId ? null : state.selectedClip
      };
    }
    
    case ActionTypes.UPDATE_CLIP: {
      const { layerId, clipId, updates } = action.payload;
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === layerId
            ? {
                ...layer,
                clips: layer.clips.map(clip =>
                  clip.id === clipId ? { ...clip, ...updates } : clip
                )
              }
            : layer
        )
      };
    }
    
    case ActionTypes.MOVE_CLIP: {
      const { fromLayerId, toLayerId, clipId, newStartTime } = action.payload;
      const clipToMove = state.layers
        .find(layer => layer.id === fromLayerId)
        ?.clips.find(clip => clip.id === clipId);
      
      if (!clipToMove) return state;
      
      return {
        ...state,
        layers: state.layers.map(layer => {
          if (layer.id === fromLayerId) {
            return {
              ...layer,
              clips: layer.clips.filter(clip => clip.id !== clipId)
            };
          }
          if (layer.id === toLayerId) {
            return {
              ...layer,
              clips: [...layer.clips, { ...clipToMove, start: newStartTime }]
            };
          }
          return layer;
        })
      };
    }
    
    case ActionTypes.SELECT_CLIP:
      return {
        ...state,
        selectedClip: action.payload.clipId,
        selectedLayer: action.payload.layerId
      };
    
    case ActionTypes.SELECT_LAYER:
      return {
        ...state,
        selectedLayer: action.payload.layerId
      };
    
    case ActionTypes.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime
      };
    
    case ActionTypes.SET_DURATION:
      return {
        ...state,
        duration: action.payload.duration
      };
    
    case ActionTypes.SET_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying
      };
    
    case ActionTypes.ADD_LAYER:
      return {
        ...state,
        layers: [...state.layers, {
          id: `layer-${Date.now()}`,
          name: action.payload.name,
          type: action.payload.type,
          clips: [],
          zIndex: state.layers.length + 1
        }]
      };
    
    case ActionTypes.REMOVE_LAYER:
      return {
        ...state,
        layers: state.layers.filter(layer => layer.id !== action.payload.layerId)
      };
    
    default:
      return state;
  }
}

// Create context
const TimelineContext = createContext();

// Provider component
export function TimelineProvider({ children }) {
  const [state, dispatch] = useReducer(timelineReducer, initialState);

  // Action creators
  const actions = {
    addClip: useCallback((layerId, clip) => {
      dispatch({ type: ActionTypes.ADD_CLIP, payload: { layerId, clip } });
    }, []),
    
    removeClip: useCallback((layerId, clipId) => {
      dispatch({ type: ActionTypes.REMOVE_CLIP, payload: { layerId, clipId } });
    }, []),
    
    updateClip: useCallback((layerId, clipId, updates) => {
      dispatch({ type: ActionTypes.UPDATE_CLIP, payload: { layerId, clipId, updates } });
    }, []),
    
    moveClip: useCallback((fromLayerId, toLayerId, clipId, newStartTime) => {
      dispatch({ type: ActionTypes.MOVE_CLIP, payload: { fromLayerId, toLayerId, clipId, newStartTime } });
    }, []),
    
    selectClip: useCallback((clipId, layerId) => {
      dispatch({ type: ActionTypes.SELECT_CLIP, payload: { clipId, layerId } });
    }, []),
    
    selectLayer: useCallback((layerId) => {
      dispatch({ type: ActionTypes.SELECT_LAYER, payload: { layerId } });
    }, []),
    
    setCurrentTime: useCallback((currentTime) => {
      dispatch({ type: ActionTypes.SET_CURRENT_TIME, payload: { currentTime } });
    }, []),
    
    setDuration: useCallback((duration) => {
      dispatch({ type: ActionTypes.SET_DURATION, payload: { duration } });
    }, []),
    
    setPlaying: useCallback((isPlaying) => {
      dispatch({ type: ActionTypes.SET_PLAYING, payload: { isPlaying } });
    }, []),
    
    addLayer: useCallback((name, type) => {
      dispatch({ type: ActionTypes.ADD_LAYER, payload: { name, type } });
    }, []),
    
    removeLayer: useCallback((layerId) => {
      dispatch({ type: ActionTypes.REMOVE_LAYER, payload: { layerId } });
    }, [])
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

// Hook to use timeline context
export function useTimeline() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}

export { ActionTypes };
