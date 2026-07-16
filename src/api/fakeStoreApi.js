// ─────────────────────────────────────────
// Mock 대체 데이터 (API 호출 실패 시 사용)
// ─────────────────────────────────────────
export const mockProducts = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fAn0fQ-BL._AC_UL640_FMwebp_QL65_.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style, contrast raglan long sleeve.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description: 'Great outerwear jackets for Spring/Autumn/Winter.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: 'Womens Casual T-Shirt',
    price: 12.99,
    description: 'Casual wear for women, comfortable and stylish.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 5,
    title: 'John Hardy Bracelet',
    price: 695.0,
    description: 'From our Legends Collection.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg',
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: 'WD 2TB Elements Portable External Hard Drive',
    price: 64.0,
    description: 'USB 3.0 and USB 2.0 Compatibility Fast data transfers.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: { rate: 3.3, count: 203 },
  },
];

export const mockCategories = [
  "men's clothing",
  "women's clothing",
  'jewelery',
  'electronics',
];

// ─────────────────────────────────────────
// API 호출 함수 (실패 시 mock 데이터 반환)
// ─────────────────────────────────────────

const BASE_URL = 'https://fakestoreapi.com';

// 전체 상품 목록
export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('API 응답 오류');
    return await response.json();
  } catch (error) {
    console.warn('Fake Store API 호출 실패 → mock 데이터 사용:', error.message);
    return mockProducts;
  }
};

// 단일 상품 상세
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('API 응답 오류');
    return await response.json();
  } catch (error) {
    console.warn('Fake Store API 호출 실패 → mock 데이터 사용:', error.message);
    return mockProducts.find((p) => p.id === Number(id)) || null;
  }
};

// 카테고리 목록
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('API 응답 오류');
    return await response.json();
  } catch (error) {
    console.warn('Fake Store API 호출 실패 → mock 데이터 사용:', error.message);
    return mockCategories;
  }
};
