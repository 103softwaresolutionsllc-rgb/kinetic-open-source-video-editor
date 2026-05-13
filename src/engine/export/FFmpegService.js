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

  // Add text overlay to video
  async addTextOverlay(inputFile, outputFile, textOverlay) {
    if (!this.loaded) {
      await this.initialize();
    }

    try {
      // Upload input video
      await this.ffmpeg.writeFile('input.mp4', await fetchFile(inputFile));
      
      // Create temporary text file
      const textFileContent = this.generateTextFile(textOverlay);
      await this.ffmpeg.writeFile('text.txt', textFileContent);
      
      // Build FFmpeg command for text overlay
      const command = [
        '-i', 'input.mp4',
        '-i', 'text.txt',
        '-filter_complex', 
        `[1:v]scale=1920:1080,drawtext=text='${textOverlay.text.replace(/'/g, "\\'")}':fontfile=/path/to/font.ttf:fontsize=${textOverlay.fontSize}:fontcolor=${textOverlay.color.replace('#', '0x')}:x=${textOverlay.position.x}:y=${textOverlay.position.y}`,
        '-map', '[v]',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-shortest',
        outputFile
      ];

      await this.ffmpeg.exec(command);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data.buffer], { type: 'video/mp4' });

      // Clean up temporary files
      await this.ffmpeg.deleteFile('input.mp4');
      await this.ffmpeg.deleteFile('text.txt');

      return blob;
    } catch (error) {
      console.error('Failed to add text overlay:', error);
      throw error;
    }
  }

  // Generate FFmpeg drawtext filter file content
  generateTextFile(textOverlay) {
    const { text, fontSize, fontFamily, color, position } = textOverlay;
    
    return `
;FFmpeg drawtext filter configuration
;Generated by Kinetic Video Editor

[Drawing]
text=${text.replace(/'/g, "\\'")}
fontfile=/path/to/font.ttf
fontsize=${fontSize}
fontcolor=${color.replace('#', '0x')}
x=${position.x}
y=${position.y}
`;
  }

  // Export video with multiple text overlays
  async exportWithTextOverlays(inputFile, outputFile, textOverlays = []) {
    if (!this.loaded) {
      await this.initialize();
    }

    try {
      await this.ffmpeg.writeFile('input.mp4', await fetchFile(inputFile));
      
      // Create multiple text overlay filters
      let filterComplex = '[1:v]scale=1920:1080';
      
      textOverlays.forEach((overlay, index) => {
        const { text, fontSize, fontFamily, color, position, startTime, duration } = overlay;
        
        // Calculate overlay timing
        const enable = `between(t,${startTime})`;
        
        filterComplex += `,drawtext=text='${text.replace(/'/g, "\\'")}':fontfile=/path/to/font.ttf:fontsize=${fontSize}:fontcolor=${color.replace('#', '0x')}:x=${position.x}:y=${position.y}:enable=${enable}`;
      });
      
      filterComplex += ',format=yuv420p[v]';
      
      // Build FFmpeg command
      const command = [
        '-i', 'input.mp4',
        '-filter_complex', filterComplex,
        '-map', '[v]',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-shortest',
        outputFile
      ];

      await this.ffmpeg.exec(command);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data.buffer], { type: 'video/mp4' });

      // Clean up
      await this.ffmpeg.deleteFile('input.mp4');

      return blob;
    } catch (error) {
      console.error('Failed to export with text overlays:', error);
      throw error;
    }
  }

  // Export as animated GIF
  async exportAsGIF(inputFile, outputFile, settings = {}) {
    if (!this.loaded) {
      await this.initialize();
    }

    try {
      await this.ffmpeg.writeFile('input.mp4', await fetchFile(inputFile));
      
      const {
        gifFps = 10,
        gifDuration = 5,
        resolution = '640x360',
        quality = 'medium'
      } = settings;

      // Build FFmpeg command for GIF export
      const command = [
        '-i', 'input.mp4',
        '-t', gifDuration.toString(),
        '-vf', `fps=${gifFps},scale=${resolution.split('x')[0]}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        '-loop', '0',
        outputFile
      ];

      await this.ffmpeg.exec(command);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data.buffer], { type: 'image/gif' });

      // Clean up
      await this.ffmpeg.deleteFile('input.mp4');

      return blob;
    } catch (error) {
      console.error('Failed to export as GIF:', error);
      throw error;
    }
  }

  // Export with custom settings
  async exportWithSettings(inputFile, outputFile, settings = {}) {
    if (!this.loaded) {
      await this.initialize();
    }

    try {
      await this.ffmpeg.writeFile('input.mp4', await fetchFile(inputFile));
      
      const {
        format = 'mp4',
        resolution = '1920x1080',
        quality = 'high',
        bitrate = '5M',
        fps = 30
      } = settings;

      // Build FFmpeg command based on format
      let command = ['-i', 'input.mp4'];

      // Add video filters
      command.push('-vf', `scale=${resolution.split('x')[0]}:${resolution.split('x')[1]}`);

      // Add frame rate
      command.push('-r', fps.toString());

      // Add encoding settings based on format
      switch (format) {
        case 'mp4':
          command.push(
            '-c:v', 'libx264',
            '-preset', 'medium',
            '-crf', quality === 'high' ? '20' : quality === 'medium' ? '23' : '28',
            '-b:v', bitrate,
            '-pix_fmt', 'yuv420p',
            '-c:a', 'aac',
            '-b:a', '128k'
          );
          break;
        case 'webm':
          command.push(
            '-c:v', 'libvpx-vp9',
            '-b:v', bitrate,
            '-crf', '31',
            '-c:a', 'libopus',
            '-b:a', '128k'
          );
          break;
        case 'mov':
          command.push(
            '-c:v', 'libx264',
            '-preset', 'medium',
            '-crf', '20',
            '-b:v', bitrate,
            '-pix_fmt', 'yuv420p',
            '-c:a', 'aac',
            '-b:a', '128k'
          );
          break;
        default:
          command.push(
            '-c:v', 'libx264',
            '-preset', 'medium',
            '-crf', '23',
            '-b:v', bitrate,
            '-pix_fmt', 'yuv420p',
            '-c:a', 'aac',
            '-b:a', '128k'
          );
      }

      command.push(outputFile);

      await this.ffmpeg.exec(command);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFile);
      const mimeType = format === 'gif' ? 'image/gif' : `video/${format}`;
      const blob = new Blob([data.buffer], { type: mimeType });

      // Clean up
      await this.ffmpeg.deleteFile('input.mp4');

      return blob;
    } catch (error) {
      console.error('Failed to export with settings:', error);
      throw error;
    }
  }

  // Create preview GIF from specific time range
  async createPreviewGIF(inputFile, outputFile, startTime = 0, duration = 3) {
    if (!this.loaded) {
      await this.initialize();
    }

    try {
      await this.ffmpeg.writeFile('input.mp4', await fetchFile(inputFile));
      
      // Build FFmpeg command for preview GIF
      const command = [
        '-i', 'input.mp4',
        '-ss', startTime.toString(),
        '-t', duration.toString(),
        '-vf', 'fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
        '-loop', '0',
        outputFile
      ];

      await this.ffmpeg.exec(command);

      // Read output file
      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data.buffer], { type: 'image/gif' });

      // Clean up
      await this.ffmpeg.deleteFile('input.mp4');

      return blob;
    } catch (error) {
      console.error('Failed to create preview GIF:', error);
      throw error;
    }
  }
}

export default FFmpegService;
