// Interface minimaliste pour Theme
export interface Theme {
  id: string;
  name: string;
  background?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  unlocked?: boolean;
  cost?: number;
} 