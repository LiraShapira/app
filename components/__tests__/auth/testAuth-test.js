import "react-native";
import React from 'react';
import LoadingPage from '../../utils/LoadingPage.tsx';
import Registration from '../../auth/Registration.tsx';
import { advancedRender } from '../../../tests'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en' }]
}));


test('renders correctly', () => {
  const tree = advancedRender(
  <LoadingPage />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = advancedRender(<Registration />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test("renders Auth component", () => {
//   render(<Auth />);
// });
// test('checking registration adds people properly. case 1', async () => {
//   // Given
//   const user = {
//     firstName: "Bob",
//     lastName: "Builder",
//     phoneNumber: "0951555555",
//     compostStand: "harakevet"
//   };

//   // Mock AsyncStorage
//   jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(() => Promise.resolve(null)),
//     setItem: jest.fn(() => Promise.resolve()),
//   }));

//   // Mock router
//   const mockPush = jest.fn();
//   const mockRouter = {
//     push: mockPush,
//   };
//   jest.mock('expo-router', () => ({
//     useRouter: () => mockRouter,
//   }));

//   // Mock sendRegistrationForm function
//   const mockSendRegistrationForm = jest.fn(() => Promise.resolve({ data: user }));
//   jest.mock('/Users/Lenovo/app/store/authFormSlice.ts', () => ({
//     sendRegistrationForm: mockSendRegistrationForm,
//   }));

//   // When
//   const { getByPlaceholderText, getByText } = render(<Auth />);
  
//   // Set input values
//   fireEvent.changeText(getByPlaceholderText('Enter phone number'), user.phoneNumber);

//   // Set compost stand (assuming there is only one option in the Picker)
//   fireEvent.changeText(getByText('harakevet'));

//   // Click on the register button
//   fireEvent.press(getByText('Register'));

//   // Then
//   await waitFor(() => {
//     expect(mockSendRegistrationForm).toHaveBeenCalled();
//     expect(mockRouter.push).toHaveBeenCalledWith('/Home');
//   });
// });
