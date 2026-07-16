import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../../store/slices/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id, title, price, image, quantity } = item;

  // 이미지 로드 실패 시 대체 UI
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div style={styles.item}>
      {/* 상품 이미지 */}
      <div style={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          style={styles.image}
          onError={handleImageError}
        />
        <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#9ca3af', fontSize: '0.75rem' }}>
          🖼️
        </div>
      </div>

      {/* 상품 정보 */}
      <div style={styles.info}>
        <p style={styles.title}>{title}</p>
        <p style={styles.price}>${price.toFixed(2)}</p>
      </div>

      {/* 수량 조절 */}
      <div style={styles.quantityControl}>
        <button
          onClick={() => dispatch(decreaseQuantity(id))}
          style={styles.qtyBtn}
        >
          −
        </button>
        <span style={styles.quantity}>{quantity}</span>
        <button
          onClick={() => dispatch(increaseQuantity(id))}
          style={styles.qtyBtn}
        >
          +
        </button>
      </div>

      {/* 소계 */}
      <p style={styles.subtotal}>${(price * quantity).toFixed(2)}</p>

      {/* 삭제 버튼 */}
      <button
        onClick={() => dispatch(removeFromCart(id))}
        style={styles.deleteBtn}
        title="삭제"
      >
        ✕
      </button>
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    flexShrink: 0,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  info: {
    flex: 1,
    minWidth: '150px',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#111827',
    lineHeight: '1.4',
    // 두 줄로 제한
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    margin: '0 0 0.3rem',
  },
  price: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: 0,
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '0.2rem',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    minWidth: '24px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  subtotal: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#111827',
    minWidth: '70px',
    textAlign: 'right',
    margin: 0,
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '0.3rem',
    flexShrink: 0,
  },
};

export default CartItem;
