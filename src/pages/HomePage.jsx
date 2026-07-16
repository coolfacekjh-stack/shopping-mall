import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import {
  selectAllProducts,
  selectProductStatus,
  selectProductError,
} from '../store/slices/productSlice';
import ProductList from '../components/product/ProductList';
import Spinner from '../components/common/Spinner';

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);

  // 상품 목록이 없을 때만 API 호출
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛍️ 전체 상품</h2>

      {/* 로딩 상태 */}
      {status === 'loading' && <Spinner />}

      {/* 에러 상태 */}
      {status === 'failed' && (
        <p style={styles.error}>⚠️ 상품을 불러오지 못했습니다: {error}</p>
      )}

      {/* 상품 목록 */}
      {status === 'succeeded' && <ProductList products={products} />}
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
  error: {
    color: '#ef4444',
    textAlign: 'center',
    padding: '2rem',
  },
};

export default HomePage;
