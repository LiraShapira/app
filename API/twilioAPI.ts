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

    if (response.status !== 200) {
      throw new Error(json.error)
    }

    return { status: 200, data: json };
  } catch (error: any) {
    console.error(error);
    return error;
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

    const json: { success: boolean } = await response.json();
    if (response.status !== 200) {
      throw new Error()
    }
    return { data: json, status: 200 };
  } catch (error: any) {
    console.error(error);
    return error
  }
};
