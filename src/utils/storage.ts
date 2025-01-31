import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "email_drafts";

// Save drafts to AsyncStorage
export const saveDrafts = async (drafts: any[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error("Error saving drafts:", error);
  }
};

// Get drafts from AsyncStorage
export const getDrafts = async () => {
  try {
    const drafts = await AsyncStorage.getItem(STORAGE_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error("Error retrieving drafts:", error);
    return [];
  }
};

// Initialize storage with dummy data (Run this only once)
export const initializeStorage = async () => {
  const existingDrafts = await getDrafts();
  if (existingDrafts.length === 0) {
    await saveDrafts(DUMMY_EMAILS);
  }
};
