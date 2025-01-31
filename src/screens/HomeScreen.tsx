import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

interface Draft {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  status: "Draft" | "Sent";
}

const HomeScreen = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const navigation = useNavigation();

  const loadDrafts = async () => {
    const storedDrafts = await AsyncStorage.getItem("drafts");
    if (storedDrafts) {
      setDrafts(JSON.parse(storedDrafts));
    }
  };

  useEffect(() => {
    loadDrafts();
  }, []);


  const handleNewDraft = () => {
    //@ts-ignore
    navigation.navigate("Editor", { draft: null, loadDrafts });
  };

  const handleDraftPress = (draft: Draft) => {
    //@ts-ignore
    navigation.navigate("Editor", { draft, loadDrafts });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={drafts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.draftItem}
            onPress={() => handleDraftPress(item)}
          >
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.recipient}>To: {item.recipient}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </TouchableOpacity>
        )}
      />
      <Button mode="contained" onPress={handleNewDraft} style={styles.button}>
        Create New Draft
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  draftItem: { padding: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  subject: { fontSize: 16, fontWeight: "bold" },
  recipient: { fontSize: 14, color: "gray" },
  status: { fontSize: 12, color: "blue" },
  button: { marginTop: 20 },
});

export default HomeScreen;
