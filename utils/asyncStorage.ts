import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../types/AsyncStorage';

export const setItem = async (key: StorageKeys, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
}

export const getItem = async (key: StorageKeys): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value === null) {
            throw new Error(`No value for key ${key}`);
        }
        return value;
    } catch (e) {
        console.log(e);
        return 'error'
    }
}