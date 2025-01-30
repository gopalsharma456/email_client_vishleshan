import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Draft {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  status: "Draft" | "Sent";
}

interface DraftsState {
  drafts: Draft[];
}

const initialState: DraftsState = { drafts: [] };

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    addDraft: (state, action: PayloadAction<Draft>) => {
      state.drafts.push(action.payload);
    },
    updateDraft: (state, action: PayloadAction<Draft>) => {
      const index = state.drafts.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) state.drafts[index] = action.payload;
    },
    markAsSent: (state, action: PayloadAction<string>) => {
      const draft = state.drafts.find((d) => d.id === action.payload);
      if (draft) draft.status = "Sent";
    },
  },
});

export const { addDraft, updateDraft, markAsSent } = draftsSlice.actions;
export default draftsSlice.reducer;
