// import { mockUser } from "../Mocks/mockDB";
// import { User } from "../types/User";
import { FetchUserArgs, User } from "../types/User";
import { SERVER_URL } from "./config";

export const fetchUser = async (fetchUserArgs: FetchUserArgs): Promise<User | null> => {
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
  // return new Promise<{ data: User }>(resolve =>
  //   setTimeout(() => resolve({ data: mockUser }), 1000),
  // );
}


