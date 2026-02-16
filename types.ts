
export enum AppTab {
  CHAT = 'Chat',
  VOICE = 'Voice (Live)',
  IMAGE = 'Image Studio',
  VIDEO = 'Video (Veo)',
  ANALYSIS = 'Analysis',
  EXPLORE = 'Explore'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: string[];
  groundingUrls?: Array<{title: string, uri: string}>;
  isThinking?: boolean;
}

export interface ImageGenerationParams {
  prompt: string;
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" | "2:3" | "3:2" | "21:9";
  imageSize: "1K" | "2K" | "4K";
}

export interface VideoGenerationParams {
  prompt: string;
  aspectRatio: "16:9" | "9:16";
  resolution: "720p" | "1080p";
  initialImage?: string;
}
