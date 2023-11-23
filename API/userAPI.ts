import { mockUser } from "../Mocks/mockDB";
import { ApiResponse } from "../types/APITypes";
import { FetchUserArgs, User } from "../types/User";
import { SERVER_URL } from "./config";

export const fetchUser = async (phoneNumber: string): Promise<ApiResponse<User>> => {
  if (process.env.EXPO_PUBLIC_DEMO) return {
    data: mockUser,
    status: 200
  };
  const jsonBody = JSON.stringify({ phoneNumber })
  try {
    const requestString = `${SERVER_URL}/user`;
    const response = await fetch(requestString, {
      method: 'POST',
      body: jsonBody,
      headers: {
        'Content-Type': 'application/json', // Set the correct Content-Type header
      },
    })
    const JSONresponse = await response.json()
    if (response.status !== 200) {
      throw new Error(JSONresponse.error);
    }
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
}

export const registerNewUser = async (fetchUserArgs: FetchUserArgs): Promise<ApiResponse<User>> => {
  if (process.env.EXPO_PUBLIC_DEMO) return {
    data: mockUser,
    status: 200
  };
  const jsonBody = JSON.stringify(fetchUserArgs)
  try {
    const requestString = `${SERVER_URL}/register`;
    const response = await fetch(requestString, {
      method: 'POST',
      body: jsonBody,
      headers: {
        'Content-Type': 'application/json', // Set the correct Content-Type header
      },
    })
    const JSONresponse = await response.json()
    if (response.status !== 200) {
      throw new Error(JSONresponse.error);
    }
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
}

