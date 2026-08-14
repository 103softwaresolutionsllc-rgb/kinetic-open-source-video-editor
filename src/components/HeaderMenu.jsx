import React, { useEffect, useId, useRef } from 'react';

export default function HeaderMenu({
  id,
  label,
  variant = 'secondary',
  open,
  onOpenChange,
  children,
}) {
  const generatedId = useId();
  const menuId = id || generatedId;
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        onOpenChange(false);
      }
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div className={`header-menu${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={variant}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => onOpenChange(!open)}
      >
        {label}
        <span className="header-menu-caret" aria-hidden>
          ▼
        </span>
      </button>
      {open && (
        <div id={menuId} role="menu" className="header-menu-panel">
          {typeof children === 'function'
            ? children(() => onOpenChange(false))
            : children}
        </div>
      )}
    </div>
  );
}
