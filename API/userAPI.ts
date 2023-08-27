import { mockUser } from "../Mocks/mockDB";
import { Transaction } from "../types/Transaction";
import { User } from "../types/User";

export function fetchUser(userPhoneNumber: string) {
  return new Promise<{ data: User }>(resolve =>
    setTimeout(() => resolve({ data: mockUser }), 1000),
  );
}

export function saveTransactionToDatabase(userID: string, transaction: Transaction) {
  return new Promise<{ data: Transaction }>(resolve =>
    setTimeout(() => resolve({ data: transaction}), 1000),
  );
}
