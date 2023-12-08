// asyncStorage.ts

// Use a conditional import to handle the testing scenario
const AsyncStorage = process.env.NODE_ENV === 'test'
  ? require('mock-async-storage').default
  : require('@react-native-async-storage/async-storage').default;

import { StorageKeys } from '../types/AsyncStorage';

export const setItem = async (key: StorageKeys, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
}

export const getItem = async (key: StorageKeys): Promise<string | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value === null) {
            throw new Error(`No value for key ${key}`);
        }
        return value;
    } catch (e) {
        console.log(e);
        return null;
    }
}
