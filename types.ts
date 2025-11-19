export enum RaceStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
}

export interface Horse {
  id: number;
  name: string;
  color: string;
  position: number; // 0 to 100
  speedFactor: number; // Intrinsic speed variance
  rank: number | null; // Final rank
  finished: boolean;
}

export interface HorseConfig {
  name: string;
  color: string;
}