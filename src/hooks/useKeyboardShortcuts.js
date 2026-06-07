import { useEffect } from 'react';

export function useKeyboardShortcuts(handlers, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const key = e.key.toLowerCase();
      const withCtrl = e.ctrlKey || e.metaKey;

      if (key === ' ' && handlers.onPlayPause) {
        e.preventDefault();
        handlers.onPlayPause();
      } else if (withCtrl && key === 's' && handlers.onSave) {
        e.preventDefault();
        handlers.onSave();
      } else if (withCtrl && key === 'o' && handlers.onOpen) {
        e.preventDefault();
        handlers.onOpen();
      } else if (key === 'delete' && handlers.onDelete) {
        handlers.onDelete();
      } else if (withCtrl && key === 'd' && handlers.onDuplicate) {
        e.preventDefault();
        handlers.onDuplicate();
      } else if (key === 's' && !withCtrl && handlers.onSplit) {
        handlers.onSplit();
      } else if (key === 'arrowleft' && handlers.onSeekBack) {
        e.preventDefault();
        handlers.onSeekBack();
      } else if (key === 'arrowright' && handlers.onSeekForward) {
        e.preventDefault();
        handlers.onSeekForward();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlers, enabled]);
}
