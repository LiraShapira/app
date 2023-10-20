import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch(e){
        console.log(e);
    }
}

export const getItem = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch(e){
        console.log(e);
    }
}