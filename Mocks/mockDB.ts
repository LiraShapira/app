import { AttendeeRole, LSEvent } from "../types/LSEvents";
import { Category, Transaction } from "../types/Transaction";
import { User, UserRole } from "../types/User";
import { Contact } from "expo-contacts";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

// Get the date one month from today
const futureDate = new Date();
futureDate.setMonth(today.getMonth() + 1);

const futureDatePlusOneHour = new Date();
futureDatePlusOneHour.setMonth(today.getMonth() + 1);
futureDatePlusOneHour.setHours(today.getHours() + 1);

const futureDatePlusOneDay = new Date();
futureDatePlusOneDay.setMonth(today.getMonth() + 1);
futureDatePlusOneDay.setDate(today.getDate() + 1);

export const mockTransaction: Transaction = {
  recipientId: '1234355',
  purchaserId: '1234',
  category: Category.GROCERIES,
  amount: 10,
  createdAt: new Date('2023-07-05').toDateString(),
  reason: 'bought a spade',
  id: '123456',
  isRequest: false,
  users: [{ firstName: 'Bill', lastName: 'Withers' }]
}

export const mockTransaction2: Transaction = {
  recipientId: '1234',
  purchaserId: '1234355',
  category: Category.GARDEN,
  amount: 14,
  createdAt: new Date('2023-07-06').toDateString(),
  reason: 'bought seeds',
  id: '1234567',
  isRequest: false,
  users: [{ firstName: 'Bill', lastName: 'Withers' }]
}

export const mockTransaction3: Transaction = {
  recipientId: '1234',
  purchaserId: '1234355',
  category: Category.GROCERIES,
  amount: 100,
  createdAt: new Date('2023-07-08').toDateString(),
  reason: 'בקשה ממירון גלברד',
  id: '12345678',
  isRequest: false,
  users: [{ firstName: 'Bill', lastName: 'Withers' }]
}

export const mockUser: User = {
  firstName: 'Simon',
  lastName: 'Test',
  id: '1234',
  userLocalCompostStandId: 4,
  accountBalance: 154,
  createdAt: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
  phoneNumber: '123456789',
  role: UserRole.ADMIN,
  adminCompostStandId: null
}

export const mockUser2: User = {
  firstName: 'Bill',
  lastName: 'Withers',
  id: '1234355',
  userLocalCompostStandId: 4,
  accountBalance: 200,
  createdAt: new Date('2023-07-05').toDateString(),
  transactions: [mockTransaction, mockTransaction2, mockTransaction3],
  phoneNumber: '987654321',
  role: UserRole.BASIC,
  adminCompostStandId: null
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
        number: "123456789",
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

export const mockEvent1: LSEvent = {
  id: '239rifjv23rfn',
  startDate: today.toISOString(),
  endDate: tomorrow.toISOString(),
  title: 'Example LS Event',
  description: 'An example event as a placeholder ',
  attendees: [{
    role: AttendeeRole.seller,
    user: mockUser,
    productsForSale: ['granola', 'תכשיטים']
  },
  {
    role: AttendeeRole.seller,
    user: mockUser2,
    productsForSale: ['hats']
  }],
  location: {
    name: 'Tel Hubez',
    coordinates: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12272.110261163607!2d34.77849904797926!3d32.05162391583166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7db0ff13cd%3A0x3de42a04d2cb8236!2z16rXnCDXl9eV15HXliDXlNeX15XXldeUINeU15fXp9ec15DXmdeqINeR16nXm9eV16DXqiDXqdek15nXqNeQ!5e0!3m2!1sen!2sil!4v1715154541848!5m2!1sen!2sil" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  }
}

export const mockEvent2: LSEvent = {
  id: 'ju930rotjgma23r-08ijm',
  startDate: futureDate.toISOString(),
  endDate: futureDatePlusOneHour.toISOString(),
  title: 'shabbat singalong',
  description: 'An example event for demonstration purposes',
  attendees: [
    {
      role: AttendeeRole.seller,
      user: mockUser,
      productsForSale: ['granola']
    }
  ],
  location: {
    name: 'Tel Hubez',
    coordinates: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12272.110261163607!2d34.77849904797926!3d32.05162391583166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7db0ff13cd%3A0x3de42a04d2cb8236!2z16rXnCDXl9eV15HXliDXlNeX15XXldeUINeU15fXp9ec15DXmdeqINeR16nXm9eV16DXqiDXqdek15nXqNeQ!5e0!3m2!1sen!2sil!4v1715154541848!5m2!1sen!2sil" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  }
}

export const mockEvents: LSEvent[] = [
  mockEvent1,
  mockEvent2,
  {
    id: 'asd3f767n22sxpp08ijm',
    startDate: futureDate.toISOString(),
    endDate: futureDatePlusOneHour.toISOString(),
    title: 'example event harvet',
    description: 'An example event for demonstration purposes',
    attendees: [
      {
        role: AttendeeRole.attendee,
        user: mockUser,
      },
      {
        role: AttendeeRole.attendee,
        user: mockUser2,
      }
    ],
    location: {
      name: 'Tel Hubez',
      coordinates: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12272.110261163607!2d34.77849904797926!3d32.05162391583166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b7db0ff13cd%3A0x3de42a04d2cb8236!2z16rXnCDXl9eV15HXliDXlNeX15XXldeUINeU15fXp9ec15DXmdeqINeR16nXm9eV16DXqiDXqdek15nXqNeQ!5e0!3m2!1sen!2sil!4v1715154541848!5m2!1sen!2sil" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    }
  }]
