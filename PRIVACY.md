# Privacy

Kinetic is built so people can edit video in public without leaving footage behind for someone else to find.

## What never happens

- Your videos, audio, logos, and project files are **not uploaded** to Kinetic servers.
- There are **no accounts**.
- The live site does **not restore** a previous visitor’s timeline.

## What happens in your browser

- Clips stay in memory for the current tab.
- Closing or leaving the editor wipes leftover IndexedDB data from older versions.
- Exporting MP4/MP3 or saving a `.kinetic.json` file downloads to **your** computer. That copy is yours to keep or delete.

## What may remain on the device (not your footage)

- Theme preference (`kinetic-theme` in localStorage).
- Cached app files and the FFmpeg engine so Kinetic can load faster or offline.

## Shared computers

If you use a public or shared computer, export your finished video or project file, then close the tab. The next person who opens Kinetic starts with an empty editor.

## Contact

Questions: open an issue on [GitHub](https://github.com/103softwaresolutionsllc-rgb/kinetic-open-source-video-editor) or email 103softwaresolutionsllc@gmail.com.
