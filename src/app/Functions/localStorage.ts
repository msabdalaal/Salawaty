import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataLocally = async (value: object, key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error saving data", e);
  }
};

export const getDataLocally = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading data", e);
    return null; // Optional: Depending on your error handling, you might want to return null or rethrow the error
  }
};
