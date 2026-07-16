import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectAuthLoading } from '../../store/slices/authSlice';

// 로그인이 필요한 페이지를 보호하는 컴포넌트
// Firebase 인증 초기화 중에는 빈 화면 유지 (로그인 상태 깜빡임 방지)
function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectAuthLoading);

  // Firebase onAuthStateChanged 초기화 중 → 아무것도 렌더링하지 않음
  if (loading) {
    return null;
  }

  // 로그인 상태가 아니면 /login 으로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 로그인 상태면 자식 컴포넌트(페이지) 렌더링
  return children;
}

export default ProtectedRoute;
