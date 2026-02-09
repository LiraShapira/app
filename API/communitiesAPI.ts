import { ApiResponse } from '../types/APITypes';
import { Community } from '../types/Community';
import { SERVER_URL } from './config';

export const fetchCommunities = async (): Promise<ApiResponse<Community[]>> => {
  try {
    const requestString = `${SERVER_URL}/communities`;
    const response = await fetch(requestString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
    const requestString = `${SERVER_URL}/community/${encodeURIComponent(id)}`;
    const response = await fetch(requestString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
