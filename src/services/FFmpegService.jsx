import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class FFmpegService {
  constructor() {
    this.ffmpeg = null;
    this.isLoaded = false;
    this.onProgress = null;
  }

  async initialize() {
    if (this.isLoaded) return;

    this.ffmpeg = new FFmpeg();
    
    // Set up progress callback
    this.ffmpeg.on('progress', ({ progress, time }) => {
      if (this.onProgress) {
        this.onProgress(Math.round(progress * 100), time);
      }
    });

    // Load FFmpeg core with multi-threading support
    const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd';
    
    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
    });

    this.isLoaded = true;
  }

  async extractAudio(videoFile) {
    await this.initialize();
    
    const inputFileName = `input-${Date.now()}.${this.getFileExtension(videoFile.name)}`;
    const outputFileName = `output-${Date.now()}.mp3`;

    // Write input file to FFmpeg memory
    await this.ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

    // Extract audio using FFmpeg
    await this.ffmpeg.exec([
      '-i', inputFileName,
      '-vn', // No video
      '-acodec', 'libmp3lame',
      '-ab', '192k',
      '-ar', '44100',
      '-y', // Overwrite output
      outputFileName
    ]);

    // Read the output file
    const data = await this.ffmpeg.readFile(outputFileName);
    
    // Clean up
    await this.ffmpeg.deleteFile(inputFileName);
    await this.ffmpeg.deleteFile(outputFileName);

    return new Blob([data], { type: 'audio/mpeg' });
  }

  async generateWaveform(audioFile) {
    await this.initialize();
    
    const inputFileName = `input-${Date.now()}.mp3`;
    const outputFileName = `waveform-${Date.now()}.json`;

    await this.ffmpeg.writeFile(inputFileName, await fetchFile(audioFile));

    // Generate waveform data using FFmpeg's aformat and showwaves
    await this.ffmpeg.exec([
      '-i', inputFileName,
      '-filter_complex', 'showwavespic=colors=blue:s=1920x108:scale=lin',
      '-frames:v', '1',
      '-y',
      outputFileName
    ]);

    const data = await this.ffmpeg.readFile(outputFileName);
    
    // Clean up
    await this.ffmpeg.deleteFile(inputFileName);
    await this.ffmpeg.deleteFile(outputFileName);

    // Convert image data to waveform peaks (simplified)
    // In a real implementation, you'd parse the image data
    return Array.from({ length: 100 }, () => Math.random() * 0.8 + 0.2);
  }

  async applyBranding(videoFile, brandSettings) {
    await this.initialize();
    
    const inputFileName = `input-${Date.now()}.${this.getFileExtension(videoFile.name)}`;
    const logoFileName = brandSettings.logo ? `logo-${Date.now()}.png` : null;
    const outputFileName = `branded-${Date.now()}.mp4`;

    // Write input file
    await this.ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

    // Write logo file if provided
    if (brandSettings.logo && logoFileName) {
      // Convert base64 to blob and write to FFmpeg
      const logoBlob = this.base64ToBlob(brandSettings.logo);
      await this.ffmpeg.writeFile(logoFileName, await fetchFile(logoBlob));
    }

    const filters = [];
    const inputs = ['-i', inputFileName];

    // Add logo overlay if provided
    if (brandSettings.logo && logoFileName) {
      inputs.push('-i', logoFileName);
      
      // Calculate overlay position
      const position = this.getOverlayPosition(brandSettings.position);
      const overlayFilter = `[1:v]scale=100:-1[logo];[0:v][logo]${position}`;
      filters.push(overlayFilter);
    }

    // Add neon glow effect if enabled
    if (brandSettings.neonGlow) {
      const glowFilter = brandSettings.logo ? '[out]' : '[0:v]';
      filters.push(`${glowFilter}colorbalance=rs=0.1:gs=-0.2:bs=0.3:rm=0.1:gm=-0.2:bm=0.3`);
    }

    // Build FFmpeg command
    const command = [
      ...inputs,
      ...(filters.length > 0 ? ['-filter_complex', filters.join(';')] : []),
      ...(filters.length > 0 ? ['-map', '[out]'] : ['-map', '0:v']),
      '-map', '0:a?', // Include audio if exists
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '23',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-y',
      outputFileName
    ];

    await this.ffmpeg.exec(command);

    // Read output file
    const data = await this.ffmpeg.readFile(outputFileName);
    
    // Clean up
    await this.ffmpeg.deleteFile(inputFileName);
    if (logoFileName) {
      await this.ffmpeg.deleteFile(logoFileName);
    }
    await this.ffmpeg.deleteFile(outputFileName);

    return new Blob([data], { type: 'video/mp4' });
  }

  async exportVideo(projectData, exportFormat = 'mp4') {
    await this.initialize();
    
    const { clips, duration, brandSettings } = projectData;
    
    if (clips.length === 0) {
      throw new Error('No clips to export');
    }

    // Create concat list for joining clips
    const concatList = clips.map((clip, index) => {
      return `file '${clip.fileName}'`;
    }).join('\n');

    const concatFileName = `concat-${Date.now()}.txt`;
    const inputFileName = `input-${Date.now()}.${this.getFileExtension(clips[0].fileName)}`;
    const outputFileName = `final-${Date.now()}.${exportFormat}`;

    // Write concat list
    await this.ffmpeg.writeFile(concatFileName, concatList);

    // Write first clip (for concat demuxer)
    await this.ffmpeg.writeFile(inputFileName, await fetchFile(clips[0].file));

    // Concatenate clips
    await this.ffmpeg.exec([
      '-f', 'concat',
      '-safe', '0',
      '-i', concatFileName,
      '-c', 'copy',
      '-y',
      'temp-concat.mp4'
    ]);

    // Apply branding if provided
    if (brandSettings?.logo) {
      const tempFile = await this.ffmpeg.readFile('temp-concat.mp4');
      const brandedBlob = await this.applyBranding(
        new Blob([tempFile], { type: 'video/mp4' }),
        brandSettings
      );
      
      // Clean up temp files
      await this.ffmpeg.deleteFile(concatFileName);
      await this.ffmpeg.deleteFile(inputFileName);
      await this.ffmpeg.deleteFile('temp-concat.mp4');

      return brandedBlob;
    } else {
      const data = await this.ffmpeg.readFile('temp-concat.mp4');
      
      // Clean up
      await this.ffmpeg.deleteFile(concatFileName);
      await this.ffmpeg.deleteFile(inputFileName);
      await this.ffmpeg.deleteFile('temp-concat.mp4');

      return new Blob([data], { type: 'video/mp4' });
    }
  }

  getOverlayPosition(position) {
    const positions = {
      'top-left': 'overlay=10:10',
      'top-right': 'overlay=W-w-10:10',
      'bottom-left': 'overlay=10:H-h-10',
      'bottom-right': 'overlay=W-w-10:H-h-10',
      'center': 'overlay=(W-w)/2:(H-h)/2'
    };
    return positions[position] || positions['bottom-right'];
  }

  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  base64ToBlob(base64) {
    const parts = base64.split(',');
    const mimeType = parts[0].match(/:(.*?);/)[1];
    const byteString = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([uint8Array], { type: mimeType });
  }

  setProgressCallback(callback) {
    this.onProgress = callback;
  }
}

// Export singleton instance
export const ffmpegService = new FFmpegService();
export default ffmpegService;
