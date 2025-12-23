
export interface ImageState {
  original: string | null;
  edited: string | null;
}

export interface ProcessingStatus {
  isLoading: boolean;
  message: string;
  error: string | null;
}
