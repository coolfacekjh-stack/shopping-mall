import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ id, title, price, image, quantity }]
  },
  reducers: {
    // 장바구니에 상품 추가 (이미 있으면 수량 증가)
    addToCart: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // 장바구니에서 상품 삭제
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // 수량 증가
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // 수량 감소 (1 이하가 되면 장바구니에서 제거)
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },

    // 장바구니 전체 비우기
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// 셀렉터: 장바구니 상품 목록
export const selectCartItems = (state) => state.cart.items;

// 셀렉터: 장바구니 총 수량 (헤더 뱃지용)
export const selectCartTotalCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// 셀렉터: 장바구니 총 금액
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
