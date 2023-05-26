import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  '26-05-2023': [],
} as { [key in string]: Meal[] };

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistoryItem(
      state,
      action: PayloadAction<{
        date: string;
        data: Meal[];
      }>,
    ) {
      state[action.payload.date] = action.payload.data;
    },
  },
});

export default historySlice.reducer;
export const historyActions = historySlice.actions;
