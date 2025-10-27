import { ApiResponse } from "../types/APITypes";
import { SERVER_URL } from "./config";

export const sendSmsVerification = async (phoneNumber: string): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const data = JSON.stringify({
      phoneNumber,
    });

    const response = await fetch(`${SERVER_URL}/startVerify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    
    const json = await response.json();

    if (!response.ok) {
      const errorMessage = json.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return { status: 200, data: json };
  } catch (error: any) {
    console.error('Error in sendSmsVerification:', error);
    // Return a proper error response instead of the raw error
    return { 
      status: 500, 
      data: null, 
      error: error.message || 'Failed to send verification code' 
    };
  }
};

export const checkSmsVerification = async (phoneNumber: string, code: string): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const data = JSON.stringify({
      phoneNumber,
      code,
    });

    const response = await fetch(`${SERVER_URL}/checkVerify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    
    if (!response.ok) {
      const errorMessage = json.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return { data: json, status: 200 };
  } catch (error: any) {
    console.error('Error in checkSmsVerification:', error);
    return { 
      status: 500, 
      data: null, 
      error: error.message || 'Failed to verify code' 
    };
  }
};
