import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import checkIcon from '../assets/confirm_icon.svg';
import { type Card } from '../data/cardData';

interface ModalProps {
  onClose: () => void;
  cardData: Card;
}

// 애니메이션 Variants (CardRevealModal과 동일)
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  visible: { opacity: 1, y: 0, scale: 1 },
  hidden: { opacity: 0, y: 50, scale: 0.9 },
};

export default function RecordModal({ onClose, cardData }: ModalProps) {
  // 1. 텍스트 입력을 위한 state
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false); // 1. 저장 완료 상태 추가

  const isButtonActive = text.length > 0;

  // 2. 저장 핸들러 수정 (비동기 처리 시뮬레이션)
  const handleSave = async () => {
    if (!isButtonActive) return;

    console.log('서버로 내용 전송:', text);
    // 실제로는 여기서 await axios.post(...) 같은 API 호출이 일어납니다.
    // 지금은 0.5초 딜레이로 API 호출을 시뮬레이션합니다.
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSaving(true); // 저장 완료 상태로 변경
  };

  return (
    <ModalBackdrop variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
      <ModalContainer variants={modalVariants} onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          {isSaving ? (
            // --- 저장 완료 화면 ---
            <motion.div
              key="confirmation"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SaveConfirmation onConfirm={onClose} />
            </motion.div>
          ) : (
            // --- 기록 폼 화면 ---
            <motion.div
              key="form"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CloseButton onClick={onClose} />
              <TitleSection>
                <h1>
                  당신은
                  <br />
                  <Highlight>"{cardData.strength}"</Highlight>
                  <br />
                  사람이군요!
                </h1>
              </TitleSection>
              <StyledTextArea
                placeholder="생각나는 간단한 내용을 적어 보세요."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <SaveButton onClick={handleSave} disabled={!isButtonActive} $isActive={isButtonActive}>
                저장 하기
              </SaveButton>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalContainer>
    </ModalBackdrop>
  );
}

// --- Styled Components ---
export const ModalBackdrop = styled(motion.div)`
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

export const ModalContainer = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  height: 100%;
  background: radial-gradient(ellipse at 100% 0%, #b48aeb 0%, #6c6fdf 25%, #0031ac 50%, #111111 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly; /* 콘텐츠를 위에서부터 정렬 */
  padding-top: 80px;
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
  margin-bottom: 30px;
  margin-top: 100px;
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.4;
  }
`;

const Highlight = styled.span`
  color: #b48aeb;
`;

const StyledTextArea = styled.textarea`
  width: 90%;
  max-width: 380px;
  height: 350px;
  background-color: #2d3748;
  border: 1px solid #555;
  border-radius: 12px;
  padding: 16px;
  color: white;
  font-size: 1rem;
  resize: none;
  margin-bottom: 50px; // 버튼을 맨 아래로 밀어냄

  &::placeholder {
    color: #888;
  }
`;

export const SaveButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  max-width: 380px;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;

  // 2. 활성화 상태에 따라 스타일 변경
  background-color: ${(props) => (props.$isActive ? '#8A61F0' : '#4A5568')};
  color: ${(props) => (props.$isActive ? 'white' : '#A0AEC0')};
  cursor: ${(props) => (props.$isActive ? 'pointer' : 'not-allowed')};
  transition: background-color 0.3s ease;
`;

function SaveConfirmation({ onConfirm }: ConfirmationProps) {
  return (
    <ConfirmationContainer>
      {/* <CheckmarkCircle> */}
      <CheckmarkImage src={checkIcon} alt="저장 완료 체크" />
      {/* </CheckmarkCircle> */}

      <ConfirmationTitle>저장 완료!</ConfirmationTitle>

      <ConfirmationMessage>
        스스로를 믿으세요,
        <br />
        이미 충분히 잘할 수 있습니다.
      </ConfirmationMessage>

      <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
    </ConfirmationContainer>
  );
}

// --- 저장 완료 화면을 위한 Styled Components ---
const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  width: 100%;
  padding: 80px 20px 40px;
  gap: 10px;
`;

const CheckmarkImage = styled.img`
  width: 60px;
  height: 60px;
`;

const ConfirmationTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ConfirmationMessage = styled.p`
  font-size: 1rem;
  color: #ccc;
  text-align: center;
  line-height: 1.5;
  flex: 0.8; // 남은 공간을 차지해 버튼을 아래로 밀어냄
`;

const ConfirmButton = styled.button`
  width: 100%;
  max-width: 380px;
  padding: 16px;
  border-radius: 12px;
  background-color: #8a61f0;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
`;
