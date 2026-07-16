import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  selectCartTotalCount,
  selectCartTotalPrice,
} from '../../store/slices/cartSlice';

function CartSummary() {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectCartTotalCount);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleCheckout = () => {
    alert('결제 기능은 준비 중입니다! 😊');
  };

  const handleClearCart = () => {
    if (window.confirm('장바구니를 전체 비우시겠습니까?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div style={styles.summary}>
      <h3 style={styles.heading}>주문 요약</h3>

      <div style={styles.row}>
        <span style={styles.label}>총 상품 수</span>
        <span style={styles.value}>{totalCount}개</span>
      </div>

      <div style={styles.divider} />

      <div style={styles.row}>
        <span style={styles.totalLabel}>총 결제 금액</span>
        <span style={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
      </div>

      {/* 결제 버튼 */}
      <button onClick={handleCheckout} style={styles.checkoutBtn}>
        결제하기
      </button>

      {/* 전체 비우기 버튼 */}
      <button onClick={handleClearCart} style={styles.clearBtn}>
        장바구니 비우기
      </button>
    </div>
  );
}

const styles = {
  summary: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '1.5rem',
    position: 'sticky',
    top: '80px',
  },
  heading: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '1rem',
    margin: '0 0 1rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  label: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  value: {
    fontSize: '0.9rem',
    color: '#111827',
    fontWeight: '500',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '1rem 0',
  },
  totalLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  totalPrice: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  checkoutBtn: {
    width: '100%',
    padding: '0.85rem',
    backgroundColor: '#111827',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1.5rem',
  },
  clearBtn: {
    width: '100%',
    padding: '0.6rem',
    backgroundColor: 'transparent',
    color: '#9ca3af',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
};

export default CartSummary;
