import styled from 'styled-components';
import { motion } from 'framer-motion';

// 카드 심볼 이미지를 import 합니다.
import theFoolSymbol from '../assets/testcard.png';

// --- 타입 정의 ---
interface CardData {
  name: string;
  number: number;
  symbolImage: string;
}

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void; // 👈 1. onConfirm prop 타입 추가
  cardData: CardData;
}

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
  return (
    <ModalBackdrop variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
      <ModalContainer
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // 모달 클릭 시 닫히는 것 방지
      >
        <CloseButton onClick={onClose} />

        <TitleSection>
          <h1>{cardData.name}</h1>
          <p>카드가 나왔어요.</p>
        </TitleSection>

        <CardView>
          {/* <CardNumber>{cardData.number}</CardNumber> */}
          <CardSymbol src={cardData.symbolImage} alt={cardData.name} />
          {/* <CardName>{cardData.name}</CardName> */}
        </CardView>

        <ActionButton onClick={onConfirm}>설명 보러 가기</ActionButton>
      </ModalContainer>
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

const ModalContainer = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  height: 100%;
  background: radial-gradient(ellipse at 100% 0%, #b48aeb 0%, #6c6fdf 25%, #0031ac 50%, #111111 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  color: white;
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

const CardView = styled.div`
  max-width: 280px;
  max-height: 450px;
  background-color: #1e1e1e;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* padding: 20px; */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const CardNumber = styled.span`
  align-self: flex-start;
  font-size: 1.2rem;
`;

const CardSymbol = styled.img`
  width: 100%;
  height: 100%;
`;

const CardName = styled.span`
  font-size: 1.2rem;
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
