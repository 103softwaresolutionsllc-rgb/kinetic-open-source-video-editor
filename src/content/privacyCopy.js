export const PRIVACY_SUMMARY =
  'Your videos stay in this browser tab. Kinetic never uploads them, and leaving the page wipes the session so the next visitor sees nothing.';

export const PRIVACY_SECTIONS = [
  {
    title: 'Nothing is uploaded',
    body: 'Editing and export run locally with FFmpeg.wasm. Media files are not sent to Kinetic servers, analytics pipelines, or cloud storage.',
  },
  {
    title: 'Sessions leave no footage behind',
    body: 'Clips live in memory for this tab only. Kinetic does not restore another person’s project. Closing or leaving the editor clears local editor data (IndexedDB leftovers from older versions included).',
  },
  {
    title: 'Keep work on your computer',
    body: 'Export MP4/MP3 from the Export menu, or save a .kinetic.json project file to your device. That file stays wherever you download it — not on this site.',
  },
  {
    title: 'What this site may remember',
    body: 'Only a theme preference (dark/light/system) is stored in localStorage. Cached app files and the FFmpeg engine may stay in your browser so the editor can load offline. Those caches are the product, not your videos.',
  },
];
