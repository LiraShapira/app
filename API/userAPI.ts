import { mockUser } from "../Mocks/mockDB";
import { FetchUserArgs, User } from "../types/User";
import { SERVER_URL } from "./config";
import { Transaction } from "../types/Transaction";

export const fetchUser = async (fetchUserArgs: FetchUserArgs): Promise<User | null> => {
  if (process.env.EXPO_PUBLIC_DEV) return mockUser;
  const jsonBody = JSON.stringify(fetchUserArgs)
  try {
    const requestString = `${SERVER_URL}/user`;
    const user = await fetch(requestString, {
      method: 'POST',
      body: jsonBody,
      headers: {
        'Content-Type': 'application/json', // Set the correct Content-Type header
      },
    })
    return await user.json()
  } catch (e) {
    console.log(e);
    return null;
  }
}

