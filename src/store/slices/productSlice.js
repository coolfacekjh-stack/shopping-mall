import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById, getCategories } from '../../api/fakeStoreApi';

// ─────────────────────────────────────────
// Thunk: 비동기 API 액션 (실패 시 mock 자동 대체)
// ─────────────────────────────────────────

// 전체 상품 목록 불러오기
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 단일 상품 상세 불러오기
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const product = await getProductById(id);
      if (!product) throw new Error('상품을 찾을 수 없습니다.');
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 카테고리 목록 불러오기
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ─────────────────────────────────────────
// Slice
// ─────────────────────────────────────────

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],           // 전체 상품 목록
    selectedItem: null,  // 상세페이지에서 선택된 상품
    categories: [],      // 카테고리 목록
    filterCategory: 'all', // 현재 선택된 카테고리 필터
    status: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // 카테고리 필터 변경
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },

    // 선택된 상품 초기화 (상세 페이지 벗어날 때 사용)
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchProducts ──────────────────────
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // ── fetchProductById ───────────────────
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedItem = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // ── fetchCategories ────────────────────
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilterCategory, clearSelectedItem } = productSlice.actions;

// ─────────────────────────────────────────
// 셀렉터
// ─────────────────────────────────────────

// 전체 상품 목록
export const selectAllProducts = (state) => state.products.items;

// 카테고리 필터가 적용된 상품 목록
export const selectFilteredProducts = (state) => {
  const { items, filterCategory } = state.products;
  if (filterCategory === 'all') return items;
  return items.filter((item) => item.category === filterCategory);
};

// 현재 선택된 상품 (상세 페이지)
export const selectSelectedItem = (state) => state.products.selectedItem;

// 카테고리 목록
export const selectCategories = (state) => state.products.categories;

// 현재 선택된 카테고리 필터
export const selectFilterCategory = (state) => state.products.filterCategory;

// API 로딩 상태
export const selectProductStatus = (state) => state.products.status;

// API 에러
export const selectProductError = (state) => state.products.error;

export default productSlice.reducer;
