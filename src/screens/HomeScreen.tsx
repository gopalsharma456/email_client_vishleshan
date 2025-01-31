import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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

  // Function to load drafts from AsyncStorage
  const loadDrafts = async () => {
    try {
      const storedDrafts = await AsyncStorage.getItem("drafts");
      if (storedDrafts) {
        setDrafts(JSON.parse(storedDrafts));
      } else {
        setDrafts([]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load drafts.");
    }
  };

  // Function to delete a draft
  const deleteDraft = async (id: string) => {
    try {
      const updatedDrafts = drafts.filter((draft) => draft.id !== id);
      setDrafts(updatedDrafts);
      await AsyncStorage.setItem("drafts", JSON.stringify(updatedDrafts));
    } catch (error) {
      Alert.alert("Error", "Failed to delete the draft.");
    }
  };

  // Confirmation alert before deleting
  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete Draft",
      "Are you sure you want to delete this draft?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteDraft(id), style: "destructive" },
      ]
    );
  };

  // Load drafts when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadDrafts();
    }, [])
  );

  const handleNewDraft = () => {
    //@ts-ignore
    navigation.navigate("Editor", { draft: null });
  };

  const handleDraftPress = (draft: Draft) => {
    //@ts-ignore
    navigation.navigate("Editor", { draft });
  };

  return (
    <View style={styles.container}>
      {drafts.length === 0 ? (
        <Text style={styles.emptyMessage}>No drafts available.</Text>
      ) : (
        <FlatList
          data={drafts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.draftContainer}>
              <TouchableOpacity
                style={[
                  styles.draftItem,
                  // {
                  //   backgroundColor:
                  //     item.status === "Sent" ? "#d4edda" : "#f8d7da",
                  // },
                ]}
                onPress={() => handleDraftPress(item)}
              >
                <Text style={styles.subject}>{item.subject}</Text>
                <Text style={styles.recipient}>To: {item.recipient}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </TouchableOpacity>
              <Button
                mode="contained"
                onPress={() => confirmDelete(item.id)}
                style={styles.deleteButton}
                color="red"
              >
                Delete
              </Button>
            </View>
          )}
        />
      )}

      <Button mode="contained" onPress={handleNewDraft} style={styles.button}>
        Create New Draft
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  draftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  draftItem: {
    flex: 1,
    padding: 15,
    // borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  subject: { fontSize: 16, fontWeight: "bold" },
  recipient: { fontSize: 14, color: "gray" },
  status: { fontSize: 12, color: "blue", marginTop: 5 },
  deleteButton: { marginLeft: 10 },
  button: { marginTop: 20 },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default HomeScreen;
