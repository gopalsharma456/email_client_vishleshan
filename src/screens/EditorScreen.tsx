import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { sendEmail } from "../services/sendEmail"; 
import { v4 as uuidv4 } from "uuid";

const EditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const draft = route.params?.draft || null;

  const [recipient, setRecipient] = useState(draft?.recipient || "");
  const [subject, setSubject] = useState(draft?.subject || "");
  const [body, setBody] = useState(draft?.body || "");
  const [isSending, setIsSending] = useState(false);

  const saveDraft = async () => {
    const newDraft = {
      id: draft?.id || uuidv4(),
      recipient,
      subject,
      body,
      status: "Draft",
    };

    const storedDrafts = await AsyncStorage.getItem("drafts");
    let drafts = storedDrafts ? JSON.parse(storedDrafts) : [];

    const existingIndex = drafts.findIndex((d: any) => d.id === newDraft.id);
    if (existingIndex !== -1) {
      drafts[existingIndex] = newDraft;
    } else {
      drafts.push(newDraft);
    }

    await AsyncStorage.setItem("drafts", JSON.stringify(drafts));
    Alert.alert("Saved", "Draft saved successfully!");
    navigation.goBack();
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      await sendEmail(recipient, subject, body);
      
      // Mark as sent
      const storedDrafts = await AsyncStorage.getItem("drafts");
      let drafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      const updatedDrafts = drafts.map((d: any) =>
        d.id === draft?.id ? { ...d, status: "Sent" } : d
      );

      await AsyncStorage.setItem("drafts", JSON.stringify(updatedDrafts));

      Alert.alert("Success", "Email sent successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to send email.");
    }
    setIsSending(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipient Email"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Email Body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button mode="contained" onPress={saveDraft} style={styles.button}>
        Save Draft
      </Button>
      <Button mode="contained" onPress={handleSendEmail} loading={isSending} disabled={isSending} style={styles.button}>
        Send Email
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  textArea: { borderWidth: 1, borderColor: "#ccc", padding: 10, height: 150, borderRadius: 5, textAlignVertical: "top" },
  button: { marginTop: 10 },
});

export default EditorScreen;
