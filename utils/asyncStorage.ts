import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../types/AsyncStorage';
import { Platform } from 'react-native';
import { CompostStand } from '../types/Deposit';

export const setItem = async (key: StorageKeys, value: string) => {
    if (Platform.OS === 'web') {
        localStorage.setItem(key, value)
    } else {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log(e);
        }
    }
}

// Map StorageKeys to their respective types
type StorageKeyTypes = {
    [StorageKeys.userId]: string;
    [StorageKeys.phoneNumber]: string;
    [StorageKeys.firstName]: string;
    [StorageKeys.lastName]: string;
    [StorageKeys.amount]: string;
    [StorageKeys.compostStand]: CompostStand;
    [StorageKeys.productsForSale]: string;
};

type StorageValue<K extends StorageKeys> = K extends keyof StorageKeyTypes ? StorageKeyTypes[K] : never;

export const getItem = async <K extends StorageKeys>(key: K): Promise<StorageValue<K> | null> => {
    if (Platform.OS === 'web') {
        return localStorage.getItem(key) as StorageValue<K> | null;
    } else {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value === null) {
                return null;
            } else {
                return value as StorageValue<K>;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

export const removeItem = async (key: StorageKeys): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(e);
    }
}
