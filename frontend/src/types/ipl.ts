export type TeamCode = 
  | 'CSK'
  | 'RCB'
  | 'MI'
  | 'RR'
  | 'KKR'
  | 'PBKS'
  | 'SRH'
  | 'DC'
  | 'LSG'
  | 'GT';

export interface IPLTeam {
  code: TeamCode;
  name: string;
  shortName: string;
  city: string;
  titles: number;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  gradient: string;
  slogan: string;
  established: number;
  captain: string;
  venue: string;
}

export interface PredictionRequest {
  team1: TeamCode | string;
  team2: TeamCode | string;
}

export interface PredictionSuccessResponse {
  winner: string; // The API returns winner code e.g. "CSK" or full name
}

export interface PredictionErrorResponse {
  error: string;
}

export type ApiResponse = PredictionSuccessResponse | PredictionErrorResponse;

export interface PredictionResult {
  winnerCode: TeamCode | string;
  winnerTeam?: IPLTeam;
  team1: IPLTeam;
  team2: IPLTeam;
  timestamp: Date;
  rawWinner: string;
}

export interface PredictionHistoryItem {
  id: string;
  team1Code: TeamCode;
  team2Code: TeamCode;
  winnerCode: string;
  winnerName: string;
  date: string;
}
