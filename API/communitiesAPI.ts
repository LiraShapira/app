import { ApiResponse } from '../types/APITypes';
import { SERVER_URL } from './config';

export interface Community {
  id: string;
  CommunityName: string;
  CommunityLocation: string;
  Coin: string;
}

export const fetchCommunities = async (): Promise<ApiResponse<Community[]>> => {
  try {
    const response = await fetch(`${SERVER_URL}/communities`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const JSONresponse = await response.json();
    if (response.status !== 200) {
      throw new Error(JSONresponse.error || 'Failed to fetch communities');
    }
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
};

export const fetchCommunityById = async (id: string): Promise<ApiResponse<Community>> => {
  try {
    const response = await fetch(`${SERVER_URL}/community/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const JSONresponse = await response.json();
    if (response.status !== 200) {
      throw new Error(JSONresponse.error || 'Failed to fetch community');
    }
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
};
