import { mockEvents } from "../Mocks/mockDB";
import { ApiResponse } from "../types/APITypes";
import { LSEvent } from "../types/LSEvents";
import { SERVER_URL } from "./config";

export const fetchEvents = async (): Promise<ApiResponse<LSEvent[]>> => {
  if (process.env.EXPO_PUBLIC_DEMO) return {
    data: mockEvents,
    status: 200
  };
  try {
    return { data: mockEvents, status: 200 };
    const requestString = `${SERVER_URL}/events`;
    const response = await fetch(requestString)
    const JSONresponse = await response.json()

    if (response.status !== 200) {
      throw new Error(JSONresponse.error);
    }
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
}
