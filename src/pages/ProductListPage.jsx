import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchCategories,
  setFilterCategory,
  selectFilteredProducts,
  selectCategories,
  selectFilterCategory,
  selectProductStatus,
  selectProductError,
} from '../store/slices/productSlice';
import ProductList from '../components/product/ProductList';
import Spinner from '../components/common/Spinner';

function ProductListPage() {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);
  const filterCategory = useSelector(selectFilterCategory);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);

  // 상품 목록 및 카테고리 불러오기
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [status, categories.length, dispatch]);

  // 카테고리 필터 변경
  const handleCategoryChange = (category) => {
    dispatch(setFilterCategory(category));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 상품 목록</h2>

      {/* 카테고리 필터 버튼 */}
      <div style={styles.filterBar}>
        <button
          style={{
            ...styles.filterBtn,
            ...(filterCategory === 'all' ? styles.activeBtn : {}),
          }}
          onClick={() => handleCategoryChange('all')}
        >
          전체
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.filterBtn,
              ...(filterCategory === cat ? styles.activeBtn : {}),
            }}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 로딩 상태 */}
      {status === 'loading' && <Spinner />}

      {/* 에러 상태 */}
      {status === 'failed' && (
        <p style={styles.error}>⚠️ 상품을 불러오지 못했습니다: {error}</p>
      )}

      {/* 상품 목록 */}
      {status === 'succeeded' && <ProductList products={filteredProducts} />}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '1.5rem',
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  filterBtn: {
    padding: '0.4rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '999px',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '0.85rem',
    cursor: 'pointer',
    textTransform: 'capitalize',
    transition: 'all 0.2s',
  },
  activeBtn: {
    backgroundColor: '#111827',
    color: '#ffffff',
    borderColor: '#111827',
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    padding: '2rem',
  },
};

export default ProductListPage;
