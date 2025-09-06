import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  image: string;
  name: string;
  bookmarks: any[]
}

const initialState: UserState = {
  id: "",
  email: "",
  image: "",
  name: "",
  bookmarks: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.name = action.payload.name;
      state.bookmarks = action.payload.bookmarks
    },
    clearUserData: (state) => {
      state.id = "";
      state.email = "";
      state.image = "";
      state.name = "";
    },
  },
});

export const { addUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
