import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageAdapter {
  static async setItem({ key, value }: { key: string; value: string }): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`Error saving item in storage: ${error}`);
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      throw new Error(`Error getting item in storage: ${error}`);
    }
  }
}
