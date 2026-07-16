import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { clearUser, selectUser, selectIsLoggedIn } from '../../store/slices/authSlice';
import { selectCartTotalCount } from '../../store/slices/cartSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartCount = useSelector(selectCartTotalCount);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header style={styles.header}>
      {/* 로고 */}
      <Link to="/" style={styles.logo}>
        🛍️ ShopMall
      </Link>

      {/* 네비게이션 */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>홈</Link>
        <Link to="/products" style={styles.navLink}>상품 목록</Link>
      </nav>

      {/* 우측 영역: 장바구니 + 로그인/로그아웃 */}
      <div style={styles.right}>
        {/* 장바구니 아이콘 (뱃지 포함) */}
        <Link to="/cart" style={styles.cartLink}>
          🛒
          {cartCount > 0 && (
            <span style={styles.badge}>{cartCount}</span>
          )}
        </Link>

        {/* 인증 영역 */}
        {isLoggedIn ? (
          <div style={styles.userArea}>
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="프로필"
                style={styles.avatar}
              />
            )}
            <span style={styles.userName}>{user?.displayName}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              로그아웃
            </button>
          </div>
        ) : (
          <Link to="/login" style={styles.loginLink}>
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}

// 인라인 스타일 (추후 CSS 파일 또는 Tailwind로 교체 가능)
const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '60px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#111827',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#374151',
    fontWeight: '500',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  cartLink: {
    position: 'relative',
    textDecoration: 'none',
    fontSize: '1.5rem',
  },
  badge: {
    position: 'absolute',
    top: '-6px',
    right: '-10px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '0.65rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
  },
  userName: {
    fontSize: '0.9rem',
    color: '#374151',
  },
  logoutBtn: {
    padding: '0.3rem 0.8rem',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  loginLink: {
    textDecoration: 'none',
    padding: '0.3rem 0.8rem',
    backgroundColor: '#111827',
    color: '#ffffff',
    borderRadius: '6px',
    fontSize: '0.85rem',
  },
};

export default Header;
