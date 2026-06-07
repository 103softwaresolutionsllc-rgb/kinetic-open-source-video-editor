import React, { createContext, useContext, useReducer, useCallback } from 'react';
import {
  VIDEO_LAYER_ID,
  AUDIO_LAYER_ID,
  clipTimelineEnd,
  clipTrimmedDuration,
  recalcSequentialTimelineStarts,
} from '../utils/clipTimeline.js';

export const initialTimelineState = {
  layers: [
    {
      id: VIDEO_LAYER_ID,
      name: 'Video Track 1',
      type: 'video',
      clips: [],
      zIndex: 2,
      muted: false,
      solo: false,
    },
    {
      id: AUDIO_LAYER_ID,
      name: 'Audio Track 1',
      type: 'audio',
      clips: [],
      zIndex: 1,
      muted: false,
      solo: false,
    },
  ],
  currentTime: 0,
  duration: 60,
  selectedClip: null,
  selectedLayer: null,
  isPlaying: false,
};

const ActionTypes = {
  ADD_CLIP: 'ADD_CLIP',
  REMOVE_CLIP: 'REMOVE_CLIP',
  UPDATE_CLIP: 'UPDATE_CLIP',
  MOVE_CLIP: 'MOVE_CLIP',
  REORDER_CLIPS: 'REORDER_CLIPS',
  REPOSITION_CLIP: 'REPOSITION_CLIP',
  SELECT_CLIP: 'SELECT_CLIP',
  SELECT_LAYER: 'SELECT_LAYER',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
  SET_PLAYING: 'SET_PLAYING',
  ADD_LAYER: 'ADD_LAYER',
  REMOVE_LAYER: 'REMOVE_LAYER',
  CLEAR_PROJECT: 'CLEAR_PROJECT',
  LOAD_PROJECT: 'LOAD_PROJECT',
  SPLIT_CLIP: 'SPLIT_CLIP',
  DUPLICATE_CLIP: 'DUPLICATE_CLIP',
  UPDATE_LAYER: 'UPDATE_LAYER',
};

function packLayerClips(clips) {
  const sorted = [...clips].sort(
    (a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0)
  );
  return recalcSequentialTimelineStarts(sorted);
}

function packClipsForLayer(layerId, clips) {
  return layerId === VIDEO_LAYER_ID ? packLayerClips(clips) : clips;
}

function timelineReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_CLIP: {
      const { layerId, clip } = action.payload;
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== layerId) return layer;

          const timelineStart = layer.clips.reduce(
            (end, c) => Math.max(end, clipTimelineEnd(c)),
            0
          );

          const newClip = {
            ...clip,
            id: clip.id || `clip-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            timelineStart,
            sourceStart: clip.sourceStart ?? clip.start ?? 0,
            sourceEnd: clip.sourceEnd ?? clip.end ?? clip.duration ?? 0,
          };

          const nextClips = packClipsForLayer(layerId, [...layer.clips, newClip]);
          return { ...layer, clips: nextClips };
        }),
      };
    }

    case ActionTypes.REMOVE_CLIP: {
      const { layerId, clipId } = action.payload;
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== layerId) return layer;
          const nextClips = packClipsForLayer(
            layerId,
            layer.clips.filter((clip) => clip.id !== clipId)
          );
          return { ...layer, clips: nextClips };
        }),
        selectedClip: state.selectedClip === clipId ? null : state.selectedClip,
      };
    }

    case ActionTypes.UPDATE_CLIP: {
      const { layerId, clipId, updates } = action.payload;
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== layerId) return layer;
          const nextClips = layer.clips.map((clip) =>
            clip.id === clipId ? { ...clip, ...updates } : clip
          );
          return {
            ...layer,
            clips: packClipsForLayer(layerId, nextClips),
          };
        }),
      };
    }

    case ActionTypes.MOVE_CLIP: {
      const { fromLayerId, toLayerId, clipId, newStartTime } = action.payload;
      const fromLayer = state.layers.find((l) => l.id === fromLayerId);
      const clipToMove = fromLayer?.clips.find((c) => c.id === clipId);
      if (!clipToMove) return state;

      const movedClip = {
        ...clipToMove,
        timelineStart: Math.max(0, newStartTime),
        type: state.layers.find((l) => l.id === toLayerId)?.type || clipToMove.type,
      };

      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id === fromLayerId) {
            return {
              ...layer,
              clips: packClipsForLayer(
                fromLayerId,
                layer.clips.filter((c) => c.id !== clipId)
              ),
            };
          }
          if (layer.id === toLayerId) {
            return {
              ...layer,
              clips: packClipsForLayer(toLayerId, [...layer.clips, movedClip]),
            };
          }
          return layer;
        }),
      };
    }

    case ActionTypes.REORDER_CLIPS: {
      const { layerId, fromIndex, toIndex } = action.payload;
      if (fromIndex === toIndex) return state;

      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== layerId) return layer;

          const sorted = [...layer.clips].sort(
            (a, b) => (a.timelineStart ?? 0) - (b.timelineStart ?? 0)
          );
          const [moved] = sorted.splice(fromIndex, 1);
          sorted.splice(toIndex, 0, moved);

          return { ...layer, clips: packClipsForLayer(layerId, sorted) };
        }),
      };
    }

    case ActionTypes.REPOSITION_CLIP: {
      const { layerId, clipId, timelineStart } = action.payload;
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== layerId) return layer;
          const nextClips = layer.clips.map((clip) =>
            clip.id === clipId
              ? { ...clip, timelineStart: Math.max(0, timelineStart) }
              : clip
          );
          return { ...layer, clips: nextClips };
        }),
      };
    }

    case ActionTypes.SELECT_CLIP:
      return {
        ...state,
        selectedClip: action.payload.clipId,
        selectedLayer: action.payload.layerId,
      };

    case ActionTypes.SELECT_LAYER:
      return {
        ...state,
        selectedLayer: action.payload.layerId,
      };

    case ActionTypes.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime,
      };

    case ActionTypes.SET_DURATION:
      return {
        ...state,
        duration: action.payload.duration,
      };

    case ActionTypes.SET_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };

    case ActionTypes.UPDATE_LAYER: {
      const { layerId, updates } = action.payload;
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === layerId ? { ...layer, ...updates } : layer
        ),
      };
    }

    case ActionTypes.ADD_LAYER:
      return {
        ...state,
        layers: [
          ...state.layers,
          {
            id: `layer-${Date.now()}`,
            name: action.payload.name,
            type: action.payload.type,
            clips: [],
            zIndex: state.layers.length + 1,
            muted: false,
            solo: false,
          },
        ],
      };

    case ActionTypes.REMOVE_LAYER: {
      const { layerId } = action.payload;
      const removedLayer = state.layers.find((layer) => layer.id === layerId);
      if (!removedLayer || removedLayer.clips.length > 0) return state;

      return {
        ...state,
        layers: state.layers.filter((layer) => layer.id !== layerId),
        selectedLayer:
          state.selectedLayer === layerId ? null : state.selectedLayer,
      };
    }

    case ActionTypes.SPLIT_CLIP: {
      const { layerId, clipId, splitTime } = action.payload;
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== layerId) return layer;

          const clipIndex = layer.clips.findIndex((c) => c.id === clipId);
          if (clipIndex === -1) return layer;

          const clip = layer.clips[clipIndex];
          const localSplitTime = splitTime - (clip.timelineStart ?? 0);

          if (localSplitTime <= 0 || localSplitTime >= clipTrimmedDuration(clip)) {
            return layer;
          }

          const splitPoint = (clip.sourceStart ?? 0) + localSplitTime;

          const firstPart = {
            ...clip,
            id: `${clip.id}-split1`,
            sourceEnd: splitPoint,
            name: `${clip.name} (1)`,
          };

          const secondPart = {
            ...clip,
            id: `${clip.id}-split2`,
            timelineStart: splitTime,
            sourceStart: splitPoint,
            name: `${clip.name} (2)`,
          };

          const nextClips = [...layer.clips];
          nextClips.splice(clipIndex, 1, firstPart, secondPart);

          return {
            ...layer,
            clips: packClipsForLayer(layerId, nextClips),
          };
        }),
        selectedClip: null,
      };
    }

    case ActionTypes.DUPLICATE_CLIP: {
      const { layerId, clipId } = action.payload;
      return {
        ...state,
        layers: state.layers.map((layer) => {
          if (layer.id !== layerId) return layer;

          const clip = layer.clips.find((c) => c.id === clipId);
          if (!clip) return layer;

          const nextClips = [...layer.clips];
          const dupStart = (clip.timelineStart ?? 0) + clipTrimmedDuration(clip) + 0.5;
          const duplicated = {
            ...clip,
            id: `clip-dup-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: `${clip.name} (Copy)`,
            timelineStart: dupStart,
          };

          nextClips.push(duplicated);
          return {
            ...layer,
            clips: packClipsForLayer(layerId, nextClips),
          };
        }),
      };
    }

    case ActionTypes.CLEAR_PROJECT:
      return { ...initialTimelineState };

    case ActionTypes.LOAD_PROJECT: {
      const { layers, currentTime = 0, duration = 60 } = action.payload;
      return {
        ...state,
        layers,
        currentTime,
        duration,
        selectedClip: null,
        selectedLayer: null,
        isPlaying: false,
      };
    }

    default:
      return state;
  }
}

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [state, dispatch] = useReducer(timelineReducer, initialTimelineState);

  const addClip = useCallback((layerId, clip) => {
    dispatch({ type: ActionTypes.ADD_CLIP, payload: { layerId, clip } });
  }, []);

  const removeClip = useCallback((layerId, clipId) => {
    dispatch({ type: ActionTypes.REMOVE_CLIP, payload: { layerId, clipId } });
  }, []);

  const updateClip = useCallback((layerId, clipId, updates) => {
    dispatch({
      type: ActionTypes.UPDATE_CLIP,
      payload: { layerId, clipId, updates },
    });
  }, []);

  const moveClip = useCallback((fromLayerId, toLayerId, clipId, newStartTime) => {
    dispatch({
      type: ActionTypes.MOVE_CLIP,
      payload: { fromLayerId, toLayerId, clipId, newStartTime },
    });
  }, []);

  const reorderClips = useCallback((layerId, fromIndex, toIndex) => {
    dispatch({
      type: ActionTypes.REORDER_CLIPS,
      payload: { layerId, fromIndex, toIndex },
    });
  }, []);

  const repositionClip = useCallback((layerId, clipId, timelineStart) => {
    dispatch({
      type: ActionTypes.REPOSITION_CLIP,
      payload: { layerId, clipId, timelineStart },
    });
  }, []);

  const selectClip = useCallback((clipId, layerId) => {
    dispatch({
      type: ActionTypes.SELECT_CLIP,
      payload: { clipId, layerId },
    });
  }, []);

  const selectLayer = useCallback((layerId) => {
    dispatch({ type: ActionTypes.SELECT_LAYER, payload: { layerId } });
  }, []);

  const setCurrentTime = useCallback((currentTime) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_TIME,
      payload: { currentTime },
    });
  }, []);

  const setDuration = useCallback((nextDuration) => {
    dispatch({
      type: ActionTypes.SET_DURATION,
      payload: { duration: nextDuration },
    });
  }, []);

  const setPlaying = useCallback((isPlaying) => {
    dispatch({ type: ActionTypes.SET_PLAYING, payload: { isPlaying } });
  }, []);

  const addLayer = useCallback((name, type) => {
    dispatch({ type: ActionTypes.ADD_LAYER, payload: { name, type } });
  }, []);

  const removeLayer = useCallback((layerId) => {
    dispatch({ type: ActionTypes.REMOVE_LAYER, payload: { layerId } });
  }, []);

  const updateLayer = useCallback((layerId, updates) => {
    dispatch({
      type: ActionTypes.UPDATE_LAYER,
      payload: { layerId, updates },
    });
  }, []);

  const splitClip = useCallback((layerId, clipId, splitTime) => {
    dispatch({ type: ActionTypes.SPLIT_CLIP, payload: { layerId, clipId, splitTime } });
  }, []);

  const duplicateClip = useCallback((layerId, clipId) => {
    dispatch({ type: ActionTypes.DUPLICATE_CLIP, payload: { layerId, clipId } });
  }, []);

  const clearProject = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_PROJECT });
  }, []);

  const loadProject = useCallback((project) => {
    dispatch({
      type: ActionTypes.LOAD_PROJECT,
      payload: project,
    });
  }, []);

  const value = {
    ...state,
    addClip,
    removeClip,
    updateClip,
    moveClip,
    reorderClips,
    repositionClip,
    selectClip,
    selectLayer,
    setCurrentTime,
    setDuration,
    setPlaying,
    addLayer,
    removeLayer,
    updateLayer,
    splitClip,
    duplicateClip,
    clearProject,
    loadProject,
  };

  return (
    <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}

export { ActionTypes };
