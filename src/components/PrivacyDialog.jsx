import React, { useEffect } from 'react';
import { PRIVACY_SECTIONS, PRIVACY_SUMMARY } from '../content/privacyCopy.js';

export default function PrivacyDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="privacy-dialog-overlay" role="presentation" onClick={onClose}>
      <div
        className="privacy-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="privacy-dialog-header">
          <h2 id="privacy-dialog-title">Privacy</h2>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close privacy details">
            ✕
          </button>
        </div>
        <p className="privacy-dialog-summary">{PRIVACY_SUMMARY}</p>
        <div className="privacy-dialog-sections">
          {PRIVACY_SECTIONS.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
