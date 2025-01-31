import axios from "axios";

const API_URL = "http://localhost:5000/emails"; // Mock API URL

// Get all emails (Drafts & Sent)
export const fetchEmail = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
};

// Save a new draft
export const saveDraft = async (draft: any) => {
  try {
    const response = await axios.post(API_URL, draft);
    return response.data;
  } catch (error) {
    console.error("Error saving draft:", error);
  }
};

// Send Email (Update status to "Sent")
export const sendEmail = async (emailId: number) => {
  try {
    await axios.patch(`${API_URL}/${emailId}`, { status: "Sent" });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Delete Email (Draft or Sent)
export const deleteEmail = async (emailId: number) => {
  try {
    await axios.delete(`${API_URL}/${emailId}`);
    console.log("Email deleted successfully");
  } catch (error) {
    console.error("Error deleting email:", error);
  }
};