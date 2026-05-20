import React, { createContext, useContext, useState, useCallback } from 'react';

const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  const [actions, setActions] = useState(null);
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [brandSettings, setBrandSettings] = useState(null);

  const registerActions = useCallback((next) => {
    setActions(next);
    if (next?.ffmpegLoaded != null) {
      setFFmpegLoaded(next.ffmpegLoaded);
    }
  }, []);

  return (
    <EditorContext.Provider
      value={{
        actions,
        registerActions,
        ffmpegLoaded,
        setFFmpegLoaded,
        brandSettings,
        setBrandSettings,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return ctx;
}
