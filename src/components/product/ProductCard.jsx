import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, title, price, image, category } = product;

  // 상품 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  // 장바구니 담기 (이벤트 버블링 방지)
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ id, title, price, image }));
  };

  // 이미지 로드 실패 시 대체 UI
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      {/* 상품 이미지 */}
      <div style={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          style={styles.image}
          onError={handleImageError}
        />
        <div style={{ ...styles.imageFallback, display: 'none' }}>
          🖼️ 이미지 없음
        </div>
      </div>

      {/* 카테고리 */}
      <span style={styles.category}>{category}</span>

      {/* 상품명 */}
      <h3 style={styles.title}>{title}</h3>

      {/* 가격 + 장바구니 버튼 */}
      <div style={styles.footer}>
        <span style={styles.price}>${price.toFixed(2)}</span>
        <button onClick={handleAddToCart} style={styles.cartBtn}>
          🛒 담기
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '1rem',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  imageFallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#9ca3af',
    fontSize: '0.85rem',
    gap: '0.5rem',
  },
  category: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#111827',
    lineHeight: '1.4',
    // 두 줄로 제한
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  cartBtn: {
    padding: '0.35rem 0.7rem',
    backgroundColor: '#111827',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
};

export default ProductCard;
