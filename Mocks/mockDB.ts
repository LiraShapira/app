import { Transaction } from "../types/Transaction";
import { User } from "../types/User";
import { Contact } from "expo-contacts";

export const mockTransaction: Transaction = {
  recipientUserID: '1234355',
  purchaserUserID: '1234',
  category: 'garden',
  amount: 10,
  date: new Date('2023-07-05').toDateString(),
  reason: 'bought a spade'
}

export const mockTransaction2: Transaction = {
  recipientUserID: '1234',
  purchaserUserID: '1234355',
  category: 'garden',
  amount: 14,
  date: new Date('2023-07-06').toDateString(),
  reason: 'bought seeds'
}

export const mockTransaction3: Transaction = {
  recipientUserID: '1234',
  purchaserUserID: '1234355',
  category: 'groceries',
  amount: 100,
  date: new Date('2023-07-08').toDateString(),
  reason: 'בקשה ממירון גלברד'
}

export const mockUser: User = {
  userName: 'shimon',
  userID: '1234',
  userLocalCompostStand: 4,
  accountBalance: 154,
  dateJoined: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
}

export const mockUser2: User = {
  userName: 'Bill',
  userID: '1234355',
  userLocalCompostStand: 4,
  accountBalance: 200,
  dateJoined: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
}

export const mockTransactions: Transaction[] = [mockTransaction, mockTransaction2, mockTransaction3]

export const mockContacts: Contact[] = [
  {
    firstName: "Aaron",
    id: "821",
    lastName: "Test",
    name: "Aaron Test",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1345",
        isPrimary: false,
        label: "work",
        number: "+447012345678",
      },
    ],
  },
  {
    firstName: "Bob",
    id: "822",
    lastName: "Builder",
    name: "Bob Builder",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1346",
        isPrimary: true,
        label: "home",
        number: "+447912345678",
      },
    ],
  },
  {
    firstName: "Charlie",
    id: "823",
    lastName: "Brown",
    name: "Charlie Brown",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1347",
        isPrimary: true,
        label: "mobile",
        number: "+447812345678",
      },
    ],
  },
  {
    firstName: "Diana",
    id: "824",
    lastName: "Prince",
    name: "Diana Prince",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1348",
        isPrimary: false,
        label: "mobile",
        number: "+447612345678",
      },
    ],
  },
  {
    firstName: "Emily",
    id: "825",
    lastName: "Smith",
    name: "Emily Smith",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1349",
        isPrimary: true,
        label: "home",
        number: "+447522345678",
      },
    ],
  },
  {
    firstName: "Alice",
    id: "826",
    lastName: "Wonder",
    name: "Alice Wonder",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1350",
        isPrimary: true,
        label: "work",
        number: "+447912345679",
      },
    ],
  },
  {
    firstName: "Eve",
    id: "827",
    lastName: "Adamson",
    name: "Eve Adamson",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1351",
        isPrimary: true,
        label: "mobile",
        number: "+447912345680",
      },
    ],
  },
  {
    firstName: "Dave",
    id: "828",
    lastName: "Davids",
    name: "Dave Davids",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1352",
        isPrimary: true,
        label: "home",
        number: "+447912345681",
      },
    ],
  },
  {
    firstName: "Charlie",
    id: "829",
    lastName: "Chaplin",
    name: "Charlie Chaplin",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1353",
        isPrimary: true,
        label: "work",
        number: "+447912345682",
      },
    ],
  },
  {
    firstName: "Frank",
    id: "830",
    lastName: "Sinatra",
    name: "Frank Sinatra",
    contactType: "person",
    phoneNumbers: [
      {
        id: "1354",
        isPrimary: true,
        label: "mobile",
        number: "+447912345683",
      },
    ],
  }  
];
