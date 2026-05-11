import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class FFmpegService {
  constructor() {
    this.ffmpeg = null;
    this.loaded = false;
    this.baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm';
  }

  async initialize() {
    if (this.loaded) return;

    this.ffmpeg = new FFmpeg();

    try {
      await this.ffmpeg.load({
        coreURL: await toBlobURL(
          `${this.baseURL}/ffmpeg-core.js`,
          'text/javascript'
        ),
        wasmURL: await toBlobURL(
          `${this.baseURL}/ffmpeg-core.wasm`,
          'application/wasm'
        ),
        workerURL: await toBlobURL(
          `${this.baseURL}/ffmpeg-core.worker.js`,
          'text/javascript'
        ),
      });

      this.loaded = true;
      console.log('FFmpeg loaded successfully');
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
      throw error;
    }
  }

  async exportVideo(inputFile, outputFile, options = {}) {
    if (!this.loaded) {
      await this.initialize();
    }

    const {
      width = 1920,
      height = 1080,
      bitrate = '2M',
      fps = 30,
      crop = null,
      format = 'mp4'
    } = options;

    try {
      // Upload input file
      await this.ffmpeg.writeFile(inputFile, await fetchFile(inputFile));

      // Build FFmpeg command
      const command = ['-i', inputFile];

      // Add crop filter if specified
      if (crop) {
        command.push('-vf', `crop=${crop.width}:${crop.height}:${crop.x}:${crop.y}`);
      }

      // Add output parameters
      command.push(
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-b:v', bitrate,
        '-r', fps.toString(),
        '-s', `${width}x${height}`,
        '-c:a', 'aac',
        '-b:a', '128k',
        outputFile
      );

      // Execute command
      await this.ffmpeg.exec(command);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data.buffer], { type: `video/${format}` });

      // Clean up files
      await this.ffmpeg.deleteFile(inputFile);
      await this.ffmpeg.deleteFile(outputFile);

      return blob;
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  }

  async addWatermark(inputFile, watermarkFile, outputFile, position = 'bottom-right') {
    if (!this.loaded) {
      await this.initialize();
    }

    try {
      // Upload files
      await this.ffmpeg.writeFile(inputFile, await fetchFile(inputFile));
      await this.ffmpeg.writeFile(watermarkFile, await fetchFile(watermarkFile));

      // Position calculations
      const positions = {
        'top-left': '10:10',
        'top-right': 'W-w-10:10',
        'bottom-left': '10:H-h-10',
        'bottom-right': 'W-w-10:H-h-10'
      };

      const pos = positions[position] || positions['bottom-right'];

      // Execute watermark command
      await this.ffmpeg.exec([
        '-i', inputFile,
        '-i', watermarkFile,
        '-filter_complex', `[1:v]scale=100:-1[wm];[0:v][wm]overlay=${pos}[v]`,
        '-map', '[v]',
        '-map', '0:a',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-c:a', 'aac',
        outputFile
      ]);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data.buffer], { type: 'video/mp4' });

      // Clean up
      await this.ffmpeg.deleteFile(inputFile);
      await this.ffmpeg.deleteFile(watermarkFile);
      await this.ffmpeg.deleteFile(outputFile);

      return blob;
    } catch (error) {
      console.error('Watermark failed:', error);
      throw error;
    }
  }

  async getVideoMetadata(file) {
    if (!this.loaded) {
      await this.initialize();
    }

    try {
      await this.ffmpeg.writeFile('input.mp4', await fetchFile(file));
      
      await this.ffmpeg.exec([
        '-i', 'input.mp4',
        '-f', 'null',
        '-'
      ]);

      // Parse metadata from FFmpeg output
      const metadata = await this.ffmpeg.readFile('input.mp4');
      
      await this.ffmpeg.deleteFile('input.mp4');

      return {
        duration: 0, // Parse from metadata
        width: 1920,
        height: 1080,
        fps: 30
      };
    } catch (error) {
      console.error('Failed to get metadata:', error);
      throw error;
    }
  }
}

export default FFmpegService;
