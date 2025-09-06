// src/components/RecordDetailModal.tsx

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import cardSymbolImage from '../assets/testcard3.png'; // MyDayPage에서 썼던 카드 이미지 재사용

// Modal이 받을 props 타입 정의
interface Record {
  id: number;
  date: string;
  memo: string;
}
interface ModalProps {
  record: Record;
  cardName: string;
  onClose: () => void;
}

export default function RecordDetailModal({ record, cardName, onClose }: ModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ModalBackdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      {/* 닫기 버튼 */}
      <CloseButton onClick={onClose}>&times;</CloseButton>

      <ModalContainer layout onClick={(e) => e.stopPropagation()}>
        <FlippableCardContainer
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 카드 앞면 */}
          <CardFront $imageUrl={cardSymbolImage}>{/* props로 이미지 URL 전달 */}</CardFront>

          {/* 카드 뒷면 (기록) */}
          <CardBack>
            <RecordDate>{record.date} 금요일</RecordDate>
            <RecordMemo>{record.memo}</RecordMemo>
          </CardBack>
        </FlippableCardContainer>
      </ModalContainer>
    </ModalBackdrop>
  );
}

// --- Styled Components (MyDayPage와 유사) ---
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 20px;
  font-size: 2.5rem;
  color: white;
  z-index: 1010;
`;

const ModalContainer = styled(motion.div)`
  perspective: 1000px;
`;

const FlippableCardContainer = styled(motion.div)`
  width: 300px;
  height: 480px;
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;
  box-shadow: 0 0 39.157px 11.188px rgba(202, 244, 220, 0.3);
  border-radius: 16px;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  padding: 20px;
`;
const CardFront = styled(CardFace)<{ $imageUrl: string }>`
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover; /* 이미지가 카드 영역을 꽉 채우도록 */
  background-position: center; /* 이미지를 중앙 정렬 */
  background-color: rgba(0, 0, 0, 0.1); /* 이미지 위에 반투명 오버레이로 텍스트 가독성 높임 */
  background-blend-mode: darken; /* 배경 이미지와 배경색을 혼합하여 어둡게 */
  color: white; /* 텍스트 색상을 흰색으로 */
  justify-content: space-between; /* 번호와 타이틀을 상단/하단으로 밀어냄 */
  padding: 30px 20px; /* 내부 패딩 조정 */
`;

const CardBack = styled(CardFace)`
  background: var(--gray-300, #707070);
  transform: rotateY(180deg);
  justify-content: flex-start;
  gap: 20px;
`;

const RecordDate = styled.h2`
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
`;

const RecordMemo = styled.p`
  font-size: 1rem;
  color: #ddd;
  line-height: 1.6;
  text-align: center;
`;
