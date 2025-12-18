import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountDashboard } from "../../service/accountDashboard.service";

interface AccountDashboardState {
  postsCount: number;
  commentsCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: AccountDashboardState = {
  postsCount: 0,
  commentsCount: 0,
  loading: false,
  error: null,
};

export const fetchAccountDashboard = createAsyncThunk(
  "accountDashboard/fetch",
  async (userId: number) => {
    return await getAccountDashboard(userId);
  }
);

const accountDashboardSlice = createSlice({
  name: "accountDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.postsCount = action.payload.postsCount;
        state.commentsCount = action.payload.commentsCount;
      })
      .addCase(fetchAccountDashboard.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudo cargar el dashboard";
      });
  },
});

export default accountDashboardSlice.reducer;
