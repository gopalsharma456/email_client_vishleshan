import AsyncStorage from "@react-native-async-storage/async-storage";

const DRAFTS_KEY = "drafts";

export const saveDrafts = async (drafts: any) => {
  await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
};

export const getDrafts = async () => {
  const data = await AsyncStorage.getItem(DRAFTS_KEY);
  return data ? JSON.parse(data) : [];
};
