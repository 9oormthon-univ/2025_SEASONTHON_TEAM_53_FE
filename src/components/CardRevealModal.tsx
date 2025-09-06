import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// 카드 심볼 이미지를 import 합니다.
import theFoolSymbol from '../assets/testcard.png';
import type { Card } from '../data/cardData';
import { getCardImageUrl } from '../utils/imageUtils';
import cardBackImage from '../assets/testcard2.png';
import { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void; // 👈 1. onConfirm prop 타입 추가
  cardData: Card; // prop 타입을 Card로 변경
}

const cardFanVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

// --- 애니메이션 Variants ---
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  visible: { opacity: 1, y: 0, scale: 1 },
  hidden: { opacity: 0, y: 50, scale: 0.9 },
};

export default function CardRevealModal({ onClose, cardData, onConfirm }: ModalProps) {
  // 'picking' (카드 고르기), 'revealing' (공개 중), 'revealed' (공개 완료) 3단계 상태
  const [animationState, setAnimationState] = useState<'picking' | 'revealing' | 'revealed'>('picking');
  const [pickedCardIndex, setPickedCardIndex] = useState<number | null>(null);

  // 카드 이름에서 숫자 부분과 이름 부분을 분리
  const cardName = cardData.name.split(' ').slice(1).join(' ') || '';

  const handleCardPick = () => {
    if (animationState !== 'picking') return;
    setAnimationState('revealing');
  };

  const CARD_COUNT = 5; // 화면에 보여줄 카드 개수

  return (
    <ModalBackdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* 닫기 버튼 (공개 완료 시에만 나타남) */}
      <AnimatePresence>
        {animationState === 'revealed' && <motion.button /* ... 기존 닫기 버튼 코드와 동일 ... */ onClick={onClose} />}
      </AnimatePresence>

      <RevealedContainer>
        {/* --- 1단계: 카드 선택 --- */}
        <AnimatePresence>
          {animationState === 'picking' && (
            <motion.h1
              key="picking-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              style={{ color: 'white', fontSize: '1.5rem', position: 'absolute', top: '20%', zIndex: 10 }}
            >
              카드를 한 장 골라보세요.
            </motion.h1>
          )}
        </AnimatePresence>

        {/* --- 카드 캐러셀 애니메이션 --- */}
        <AnimatePresence>
          {animationState === 'picking' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CarouselTrack onClick={handleCardPick}>
                {/* 무한 루프를 위해 카드 목록을 두 번 렌더링 */}
                {Array.from({ length: CARD_COUNT * 2 }).map((_, index) => (
                  <CarouselCard key={index}>
                    <CardImage src={cardBackImage} alt="카드 뒷면" />
                  </CarouselCard>
                ))}
              </CarouselTrack>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {animationState !== 'picking' && (
            <RevealedContainer // 👈 1. 새로운 컨테이너 사용
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CloseButton onClick={onClose} />

              {/* 제목 섹션 */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: animationState === 'revealed' ? 1 : 0, y: animationState === 'revealed' ? 0 : -20 }}
                transition={{ delay: 0.5 }}
              >
                <TitleSection>
                  <h1>{cardName}</h1>
                  <p>카드가 나왔어요.</p>
                </TitleSection>
              </motion.div>

              {/* 뒤집히는 카드 */}
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                onAnimationComplete={() => setAnimationState('revealed')}
              >
                <FlippableCard $isRevealed={animationState === 'revealed'}>
                  <CardFace className="front">
                    <CardImage src={cardBackImage} alt="카드 뒷면" />
                  </CardFace>
                  <CardFace className="back">
                    <CardImage src={getCardImageUrl(cardData.id, cardData.card_type)} alt={cardName} />
                  </CardFace>
                </FlippableCard>
              </motion.div>

              {/* 액션 버튼 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationState === 'revealed' ? 1 : 0, y: animationState === 'revealed' ? 0 : 20 }}
                transition={{ delay: 0.5 }}
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              >
                <ActionButton onClick={onConfirm}>설명 보러 가기</ActionButton>
              </motion.div>
            </RevealedContainer>
          )}
        </AnimatePresence>
      </RevealedContainer>
    </ModalBackdrop>
  );
}

// --- Styled Components ---
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const RevealedContainer = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  height: 100%;
  background: radial-gradient(ellipse at 100% 0%, #b48aeb 0%, #6c6fdf 25%, #0031ac 50%, #111111 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 👈 핵심: 공간을 균등하게 배분 */
  /* padding: 80px 20px 40px; */
  color: white;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
`;

const TitleSection = styled.div`
  text-align: center;
  margin-top: 50px;
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
  }
  p {
    font-size: 1rem;
    color: #ccc;
  }
`;

// const CardView = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: #1e1e1e;
//   border-radius: 16px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

//   // 2. 이미지가 꽉 차도록 패딩 제거 및 중앙 정렬
//   padding: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const CardSymbol = styled.img`
  // 3. 이미지가 CardView를 가득 채우도록 스타일 변경
  /* width: 100%;
  height: 100%; */
  object-fit: cover;
  border-radius: 16px;
`;

const ActionButton = styled.button`
  width: 100%;
  max-width: 380px;
  padding: 16px;
  border-radius: 12px;
  background-color: #8a61f0;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

// 1. 캐러셀 애니메이션을 위한 keyframes 정의
const slide = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); } /* 카드 목록의 절반만큼 이동하면 원위치처럼 보임 */
`;

// 2. 캐러셀 트랙 스타일
const CarouselTrack = styled.div`
  position: absolute;
  bottom: 15%;
  left: 0;
  display: flex;
  width: calc(180px * 14); /* (카드너비 + 간격) * 카드개수 * 2 */
  animation: ${slide} 20s linear infinite;
  cursor: pointer;
`;

// 3. 캐러셀에 들어갈 카드 스타일
const CarouselCard = styled.div`
  width: 160px;
  height: 260px;
  margin: 0 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

// 4. 중앙에 나타날 뒤집히는 카드 스타일
const FlippableCard = styled.div<{ $isRevealed: boolean }>`
  width: 250px;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: ${(props) => (props.$isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); */

  &.back {
    transform: rotateY(180deg);
  }
`;

const RevealedContent = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
