import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebaseConfig';
import {
  setUser,
  setError,
  selectIsLoggedIn,
  selectAuthError,
  selectAuthLoading,
} from '../store/slices/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authError = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);

  // 이미 로그인 상태면 홈으로 이동
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // 구글 로그인 — 팝업 방식으로 직접 결과 처리
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      dispatch(
        setUser({
          uid: u.uid,
          displayName: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
        })
      );
      navigate('/', { replace: true });
    } catch (error) {
      dispatch(setError(`에러코드: ${error.code}`));
      console.error('구글 로그인 실패:', error.code, error.message);
    }
  };

  // Firebase 초기 인증 확인 중이면 로딩 표시
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={{ color: '#6b7280' }}>인증 확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛍️ ShopMall</h1>
        <p style={styles.subtitle}>로그인하고 쇼핑을 시작하세요</p>

        {/* 에러 메시지 */}
        {authError && (
          <p style={styles.errorMsg}>⚠️ {authError}</p>
        )}

        {/* 구글 로그인 버튼 */}
        <button onClick={handleGoogleLogin} style={styles.googleBtn}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={styles.googleIcon}
          />
          Google로 로그인
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 120px)',
    backgroundColor: '#f9fafb',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '3rem 2.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2rem',
  },
  errorMsg: {
    color: '#ef4444',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
};

export default LoginPage;
