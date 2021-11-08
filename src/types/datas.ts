export interface IDatas {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  isFavorite: boolean;
  addedAt: string;
  minimum_system_requirements: IDatasMinimumSystemReq;
  screenshots: IDatasScreenshots;
}

export interface IDatasMinimumSystemReq {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface IDatasScreenshots {
  id: number;
  image: string;
}
