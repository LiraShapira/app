import { mockUser } from "../Mocks/mockDB";
import { FetchUserArgs, User } from "../types/User";
import { SERVER_URL } from "./config";
import { Transaction } from "../types/Transaction";

export const fetchUser = async (fetchUserArgs: FetchUserArgs): Promise<User | null> => {
  if (process.env.NODE_ENV === 'development') return mockUser
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
    return user.json()
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function saveTransactionToDatabase(userID: string, transaction: Transaction) {
  return new Promise<{ data: Transaction }>(resolve =>
    setTimeout(() => resolve({ data: transaction }), 1000),
  );
}
