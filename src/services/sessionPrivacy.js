import { clearProjectStorage, deleteEditorDatabase } from './ProjectStorage.js';

export async function wipeLocalEditorData() {
  try {
    await clearProjectStorage();
  } catch {
    // Database may not exist yet.
  }

  try {
    await deleteEditorDatabase();
  } catch {
    // Ignore blocked/missing databases.
  }
}

export function installZeroFootprintGuards() {
  wipeLocalEditorData();

  const onLeave = () => {
    wipeLocalEditorData();
  };

  window.addEventListener('pagehide', onLeave);
  return () => window.removeEventListener('pagehide', onLeave);
}
