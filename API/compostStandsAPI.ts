import { ApiResponse } from '../types/APITypes';
import { SERVER_URL } from './config';

export interface CompostStandFromAPI {
  compostStandId: number;
  name: string;
  name_he?: string;
  name_en?: string;
  displayName?: string;
  isActive?: boolean;
}

export const fetchCompostStands = async (
  communityId: string,
  locale: string = 'he'
): Promise<ApiResponse<CompostStandFromAPI[]>> => {
  try {
    const requestString = `${SERVER_URL}/compostStands?communityId=${encodeURIComponent(communityId)}&locale=${encodeURIComponent(locale)}`;
    const response = await fetch(requestString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const JSONresponse = await response.json();
    if (response.status !== 200) {
      throw new Error(JSONresponse.error || 'Failed to fetch compost stands');
    }
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
};
