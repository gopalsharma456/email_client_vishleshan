import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEmail, sendEmail, deleteEmail } from "../services/emailServices";

export const fetchEmails = createAsyncThunk("emails/fetchEmails", async () => {
  return await fetchEmail();
});

export const createEmail = createAsyncThunk(
  "emails/createEmail",
  async (emailData : any) => {
    return await sendEmail(emailData);
  }
);

export const sendEmailRequest = createAsyncThunk(
  "emails/sendEmail",
  async (emailId: number) => {
    await sendEmail(emailId);
    return emailId;
  }
);

export const removeEmail = createAsyncThunk("emails/removeEmail", async (id :any) => {
  await deleteEmail(id);
  return id;
});

const emailSlice = createSlice({
  name: "emails",
  initialState: { emails: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.emails = action.payload;
        state.status = "succeeded";
      })
      .addCase(sendEmailRequest.fulfilled, (state, action) => {
        const email = state.emails.find((email) => email.id === action.payload);
        if (email) {
          email.status = "Sent";
        }
      })
      .addCase(createEmail.fulfilled, (state, action) => {
        state.emails.push(action.payload);
      })
      .addCase(removeEmail.fulfilled, (state, action) => {
        state.emails = state.emails.filter((email) => email.id !== action.payload);
      });
  },
});

export default emailSlice.reducer;
