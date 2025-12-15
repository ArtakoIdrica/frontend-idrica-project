

import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

import { 
  getPaginatedPost, 
  getPost as apiGetPost, 
  createPost as apiCreatePost 
} from "../../service/posts.service";




interface PostsState {
  items: any[];          
  selectedPost: any | null; 
  loading: boolean;      
  error: string | null;  
  page: number;          
  pageSize: number;      
  totalPages: number;    
}



const initialState: PostsState = {
  items: [],
  selectedPost: null,
  loading: false,
  error: null,
  page: 0,
  pageSize: 8,
  totalPages: 0,
};




export const fetchPaginatedPosts = createAsyncThunk(
  "posts/fetchPaginated",
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const res = await getPaginatedPost(page, pageSize);
    return res.data;
  }
);


export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId: string | number) => {
    const res = await apiGetPost(postId);
    return res.data;
  }
);


export const createNewPost = createAsyncThunk(
  "posts/create",
  async (post: any) => {
    const res = await apiCreatePost(post);
    return res.data;
  }
);



const postsSlice = createSlice({
  name: "posts",

  
  initialState,

 
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },

  
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchPaginatedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPaginatedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.page.totalPages;
      })

      .addCase(fetchPaginatedPosts.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudieron cargar los posts";
      })

      
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })

      .addCase(fetchPostById.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudo cargar el post";
      })

     
      .addCase(createNewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createNewPost.fulfilled, (state, action) => {
        state.loading = false;
        
        state.items.unshift(action.payload);
      })

      .addCase(createNewPost.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudo crear el post";
      });
  },
});



export const { setPage } = postsSlice.actions;

export default postsSlice.reducer;

