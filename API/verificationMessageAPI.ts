import { ApiResponse } from "../types/APITypes";
import { SERVER_URL } from "./config";

export interface VerificationMessage {
  message: string;
}

export const fetchVerificationMessage = async (communityId?: string): Promise<ApiResponse<VerificationMessage>> => {
  try {
    const url = communityId 
      ? `${SERVER_URL}/verificationMessage?communityId=${communityId}`
      : `${SERVER_URL}/verificationMessage`;
    const response = await fetch(url, {
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

