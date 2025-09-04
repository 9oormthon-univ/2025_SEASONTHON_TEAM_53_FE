import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './SplashScreen';
import LoginPage from './LoginPage';

// 화면 전체를 덮는 컨테이너
const containerStyle = {
  position: 'relative' as const,
  width: '100%',
  height: '100%',
};

export default function EntryPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 2.5초 후에 스플래시 화면을 숨기고 로그인 화면을 표시
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 제거
  }, []);

  return (
    <div style={containerStyle}>
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // 사라지는 애니메이션 시간
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <SplashScreen />
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} // 나타나는 애니메이션 시간
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <LoginPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
