import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebaseConfig';
import {
  setUser,
  setError,
  setLoading,
  selectIsLoggedIn,
  selectAuthError,
} from '../store/slices/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authError = useSelector(selectAuthError);

  // 이미 로그인된 상태면 홈으로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // 리다이렉트 후 돌아왔을 때 결과 처리
  useEffect(() => {
    dispatch(setLoading(true));
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const firebaseUser = result.user;
          dispatch(
            setUser({
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
            })
          );
          navigate('/');
        } else {
          dispatch(setLoading(false));
        }
      })
      .catch((error) => {
        dispatch(setError(error.message));
        console.error('리다이렉트 로그인 실패:', error);
      });
  }, [dispatch, navigate]);

  // 구글 로그인 처리 (팝업 → 실패 시 리다이렉트 방식으로 fallback)
  const handleGoogleLogin = async () => {
    try {
      // 팝업 방식 먼저 시도
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      dispatch(
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        })
      );
      navigate('/');
    } catch (error) {
      // 팝업 차단 시 리다이렉트 방식으로 전환
      if (
        error.code === 'auth/popup-blocked' ||
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/cancelled-popup-request'
      ) {
        console.warn('팝업 차단됨 → 리다이렉트 방식으로 전환');
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          dispatch(setError(redirectError.message));
        }
      } else {
        dispatch(setError(error.message));
        console.error('구글 로그인 실패:', error.code, error.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛍️ ShopMall</h1>
        <p style={styles.subtitle}>로그인하고 쇼핑을 시작하세요</p>

        {/* 에러 메시지 */}
        {authError && (
          <p style={styles.errorMsg}>⚠️ 로그인에 실패했습니다. 다시 시도해 주세요.</p>
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
