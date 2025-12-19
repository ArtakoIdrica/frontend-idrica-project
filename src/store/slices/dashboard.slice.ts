import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardSummary } from "../../service/dashboard.service";

interface DashboardState {
  totalPosts: number;
  totalComments: number;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  totalPosts: 0,
  totalComments: 0,
  loading: false,
  error: null,
};


export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async () => {
    const res = await getDashboardSummary();
    return res;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPosts = action.payload.totalPosts;
        state.totalComments = action.payload.totalComments;
      })
      .addCase(fetchDashboardSummary.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudo cargar el dashboard";
      });
  },
});

export default dashboardSlice.reducer;
