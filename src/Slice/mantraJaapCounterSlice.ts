import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
export interface CounterState {
  value: number;
  // byDate example:
  // {
  //   '13-09-2025': { '10:00 AM': 5, '11:00 AM': 50, '01:00 PM': 1, endOfDay: 123 }
  // }
  byDate: Record<string, Record<string, number>>; // hour -> count mapping for each date
}

// Initial state
const initialState: CounterState = {
  value: 0,
  byDate: {},
};

// Slice
const mantraJaapCounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      const now = new Date();
      const dateKey = formatDateKey(now); // e.g., '13-09-2025'
      const hourKey = formatHourKey(now); // e.g., '10:00 AM'

      if (!state.byDate[dateKey]) {
        state.byDate[dateKey] = {};
      }
      if (!state.byDate[dateKey][hourKey]) {
        state.byDate[dateKey][hourKey] = 0;
      }
      state.byDate[dateKey][hourKey] += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    reset: (state) => {
      state.value = 0;
    },

  },
});

export const { increment, decrement, reset } = mantraJaapCounterSlice.actions;
export default mantraJaapCounterSlice.reducer;

// Helpers
function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

// Returns 'DD-MM-YYYY'
function formatDateKey(d: Date): string {
  const dd = pad2(d.getDate());
  const mm = pad2(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

// Returns hour bucket like '10:00 AM'
function formatHourKey(d: Date): string {
  let hours = d.getHours(); // 0..23
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12; // 12 AM/PM
  const hh = pad2(hours);
  return `${hh}:00 ${suffix}`;
}
