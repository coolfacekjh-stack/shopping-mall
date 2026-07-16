import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductById,
  clearSelectedItem,
  selectSelectedItem,
  selectProductStatus,
  selectProductError,
} from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import Spinner from '../components/common/Spinner';

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectSelectedItem);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);

  // 상품 상세 정보 불러오기
  useEffect(() => {
    dispatch(fetchProductById(id));

    // 페이지 벗어날 때 선택된 상품 초기화
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [id, dispatch]);

  // 장바구니 담기
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      );
    }
  };

  if (status === 'loading') return <Spinner />;

  if (status === 'failed') {
    return (
      <div style={styles.container}>
        <p style={styles.error}>⚠️ 상품 정보를 불러오지 못했습니다: {error}</p>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← 뒤로가기
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← 뒤로가기
      </button>

      <div style={styles.detail}>
        {/* 상품 이미지 */}
        <div style={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.title}
            style={styles.image}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#9ca3af', fontSize: '1rem' }}>
            🖼️ 이미지를 불러올 수 없습니다
          </div>
        </div>

        {/* 상품 정보 */}
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h2 style={styles.title}>{product.title}</h2>
          <p style={styles.description}>{product.description}</p>

          {/* 평점 */}
          {product.rating && (
            <p style={styles.rating}>
              ⭐ {product.rating.rate} ({product.rating.count}개 리뷰)
            </p>
          )}

          {/* 가격 */}
          <p style={styles.price}>${product.price.toFixed(2)}</p>

          {/* 장바구니 담기 버튼 */}
          <button onClick={handleAddToCart} style={styles.cartBtn}>
            🛒 장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    fontSize: '0.95rem',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    padding: 0,
  },
  detail: {
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    flex: '0 0 300px',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '1.5rem',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  info: {
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  category: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: '1.5',
  },
  description: {
    fontSize: '0.95rem',
    color: '#6b7280',
    lineHeight: '1.7',
  },
  rating: {
    fontSize: '0.9rem',
    color: '#374151',
  },
  price: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0.5rem 0',
  },
  cartBtn: {
    padding: '0.9rem 2rem',
    backgroundColor: '#111827',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: 'auto',
  },
  error: {
    color: '#ef4444',
    marginBottom: '1rem',
  },
};

export default ProductDetailPage;
