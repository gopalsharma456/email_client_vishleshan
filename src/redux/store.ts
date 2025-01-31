import { configureStore } from "@reduxjs/toolkit";
import draftsReducer from "./draftsSlice";
import emailReducer from "./emailSlice" 

export const store = configureStore({
  reducer: { 
    drafts: draftsReducer,
    emails: emailReducer,
   },
});
