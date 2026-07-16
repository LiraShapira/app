import { ApiResponse } from "../types/APITypes";
import { SERVER_URL } from "./config";

export interface VerificationMessage {
  message: string;
}

export const fetchVerificationMessage = async (communityId?: string): Promise<ApiResponse<VerificationMessage>> => {
  try {
    let requestString = `${SERVER_URL}/verificationMessage`;
    if (communityId) {
      requestString += `?communityId=${encodeURIComponent(communityId)}`;
    }
    const response = await fetch(requestString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const JSONresponse = await response.json();
    
    if (response.status !== 200) {
      throw new Error(JSONresponse.error || 'Failed to fetch verification message');
    }
    
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
};

