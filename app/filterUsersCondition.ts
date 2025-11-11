import { User } from "../types/User";

export function filterUsersCondition(user: User, searchTerm: string): boolean {
  const lowerSearchTerm = searchTerm.toLowerCase();
  const firstName = user.firstName?.toLowerCase() || '';
  const lastName = user.lastName?.toLowerCase() || '';
  const phoneNumber = user.phoneNumber || '';
  
  return (
    firstName.includes(lowerSearchTerm) ||
    lastName.includes(lowerSearchTerm) ||
    phoneNumber.includes(lowerSearchTerm) ||
    `${firstName} ${lastName}`.includes(lowerSearchTerm)
  );
}

