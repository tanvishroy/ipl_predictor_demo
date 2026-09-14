import { PredictionRequest, PredictionSuccessResponse, PredictionErrorResponse } from '../types/ipl';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
const PREDICT_ENDPOINT = `${API_BASE_URL}/predict`;
export interface ApiResultSuccess {
  success: true;
  winner: string;
}

export interface ApiResultError {
  success: false;
  error: string;
  isNetworkError?: boolean;
}

export type ApiResult = ApiResultSuccess | ApiResultError;

/**
 * Predict IPL match winner by sending a POST request to the Flask backend
 * @param team1 Code of Team 1 (e.g., 'CSK')
 * @param team2 Code of Team 2 (e.g., 'MI')
 */
export async function predictMatchWinner(team1: string, team2: string): Promise<ApiResult> {
  try {
    const payload: PredictionRequest = {
      team1: team1.trim().toUpperCase(),
      team2: team2.trim().toUpperCase()
    };

    const response = await fetch(PREDICT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data: PredictionSuccessResponse | PredictionErrorResponse = await response.json();

    if (!response.ok) {
      // Handle HTTP status errors (e.g. 400 Bad Request, 500 Server Error)
      const errorMessage = (data as PredictionErrorResponse).error || `Server responded with status ${response.status}`;
      return {
        success: false,
        error: errorMessage,
        isNetworkError: false
      };
    }

    // Handle success response
    if ('winner' in data && data.winner) {
      return {
        success: true,
        winner: data.winner
      };
    } else if ('error' in data && data.error) {
      return {
        success: false,
        error: data.error,
        isNetworkError: false
      };
    } else {
      return {
        success: false,
        error: 'Invalid response format received from prediction server.',
        isNetworkError: false
      };
    }
  } catch (err: unknown) {
    console.error('IPL Predictor API Error:', err);
    
    // Check if error is network failure (e.g., connection refused, backend down)
    return {
      success: false,
      error: 'Unable to connect to the prediction server. Please make sure the Flask backend is running.',
      isNetworkError: true
    };
  }
}

/**
 * Ping backend to check if Flask server is online
 */
export async function pingBackend(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    // We try to make an OPTIONS or POST check to the endpoint
    const response = await fetch(PREDICT_ENDPOINT, {
      method: 'OPTIONS',
      signal: controller.signal
    }).catch(() => null);
    
    clearTimeout(timeoutId);
    return response !== null;
  } catch {
    return false;
  }
}
