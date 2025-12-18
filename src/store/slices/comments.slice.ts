import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

import{ getComment as apiGetCommentByPostId, createComment as apiCreateComment } from "../../service/comments.service";

interface CommentsState{

  items: any[];
  loading: boolean;
  error: string | null;

};

const initialState:CommentsState={

    items: [],
    loading: false,
    error: null,
};


export const fetchGetComment = createAsyncThunk(
    "comments/fetchGetComment",
    async (postId:Number) => {

        const res = await apiGetCommentByPostId(postId);
        return res.data;
    }
);

export const fetchCreateComment = createAsyncThunk(
    "comment/fetchCreateComment",
    async (comment:any) => {
        const res = await apiCreateComment(comment);
        return res.data;
        
    }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchGetComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchGetComment.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchGetComment.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudieron cargar los comentarios";
      })

     
      .addCase(fetchCreateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCreateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(fetchCreateComment.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudo crear el comentario";
      });
  },
});

export default commentsSlice.reducer;
