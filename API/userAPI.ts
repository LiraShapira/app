import { mockUser } from "../Mocks/mockDB";
import { User } from "../types/User";

export function fetchUser(userPhoneNumber: string) {
  return new Promise<{ data: User }>(resolve =>
    setTimeout(() => resolve({ data: mockUser }), 1000),
  );
}
