import { ApiResponse } from "../types/APITypes";
import { SERVER_URL } from "./config";

export interface CompostStandFromAPI {
  compostStandId: number;
  name: string;
  name_he?: string | null;
  name_en?: string | null;
  isActive: boolean;
  displayName?: string;
}

export const fetchCompostStands = async (locale: string = 'he', communityId?: string): Promise<ApiResponse<CompostStandFromAPI[]>> => {
  try {
    let url = `${SERVER_URL}/compostStands?locale=${locale}`;
    if (communityId) {
      url += `&communityId=${encodeURIComponent(communityId)}`;
    }
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const JSONresponse = await response.json();
    
    if (response.status !== 200) {
      console.error('Failed to fetch compost stands:', JSONresponse);
      return { data: null, status: response.status, error: JSONresponse.error || 'Failed to fetch compost stands' };
    }
    
    if (!Array.isArray(JSONresponse)) {
      console.error('Unexpected response format:', JSONresponse);
      return { data: null, status: response.status, error: 'Invalid response format from server' };
    }
    
    console.log('Fetched compost stands:', JSONresponse);
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    console.error('Error fetching compost stands:', e);
    return { data: null, status: 500, error: e.message || 'Failed to fetch compost stands' };
  }
};
