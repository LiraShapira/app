import LoadingPage from '../../utils/LoadingPage.tsx';
import Registration from '../../auth/Registration.tsx';
import { advancedRender } from '../../../tests'
import Auth from '../../../app/Auth.tsx';
import { fireEvent, waitFor } from '@testing-library/react-native';
import i18n from '../../../translationService'

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en' }]
}));

const mockGetItem = jest.fn(() => Promise.resolve(null));
const mockSetItem = jest.fn(() => Promise.resolve());

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: mockGetItem,
    setItem: mockSetItem,
  }
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

const user = {
  firstName: "Bob",
  lastName: "Builder",
  phoneNumber: "0951555555",
  compostStand: "harakevet"
};

// Mock sendRegistrationForm function
const mockSendRegistrationForm = jest.fn(() => Promise.resolve({ data: user }));

test('checking registration adds people properly. case 1', async () => {
  const { getByPlaceholderText, getByText } = advancedRender(<Auth />);

  fireEvent.changeText(getByPlaceholderText(i18n.t('auth_phone_number')), user.phoneNumber);

  fireEvent.press(getByText('Register'));

  expect(mockSetItem).toHaveBeenCalled();
  expect(mockRouter.push).toHaveBeenCalledWith('/Home');
});

describe('Auth Component', () => {
  test('renders correctly', () => {
    const { getAllByText, getByPlaceholderText } = advancedRender(<Auth />);
    
    // Replace the following with actual text content or translations
    expect(getAllByText(i18n.t('auth_register'))).toBeTruthy();
    expect(getByPlaceholderText(i18n.t('auth_phone_number'))).toBeTruthy();
  });

  test('handles registration form submission', async () => {
    // Mock the response for successful registration
    mockSendRegistrationForm.mockResolvedValueOnce({ data: { user: { phoneNumber: '1234567890' } } });

    const { getByPlaceholderText, getAllByText } = advancedRender(<Auth />);

    // Simulate user input
    fireEvent.changeText(getByPlaceholderText(i18n.t('auth_phone_number')), '1234567890');
    const registrationElements = getAllByText(i18n.t('auth_register'));
    fireEvent.press(registrationElements[1]);

    // Wait for the asynchronous operation to complete
    expect(mockSetUser).toHaveBeenCalledWith({ phoneNumber: '1234567890' });
  });

  // Add more test cases for different scenarios as needed
});
