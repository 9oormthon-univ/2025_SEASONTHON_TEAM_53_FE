import { useState } from 'react';
import styled from 'styled-components';
import { ModalBackdrop, ModalContainer, SaveButton } from './RecordModal';

interface ModalProps {
  onClose: () => void;
  onSubmit: (text: string) => void;
}

// 애니메이션 Variants (기존 모달들과 동일)
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  visible: { opacity: 1, y: 0, scale: 1 },
  hidden: { opacity: 0, y: 50, scale: 0.9 },
};

export default function PostInterviewModal({ onClose, onSubmit }: ModalProps) {
  const [text, setText] = useState('');
  const isButtonActive = text.length > 0;

  const handleSubmit = () => {
    if (!isButtonActive) return;
    onSubmit(text);
  };

  return (
    <ModalBackdrop variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
      <ModalContainer variants={modalVariants} onClick={(e) => e.stopPropagation()}>
        <TitleSection>
          <h1>자소서나 면접 답변을 적어주세요.</h1>
          <p>실패 했던 자소서나 면접 질문에 대한 답변 내용을 작성해 보세요.</p>
        </TitleSection>

        <StyledTextArea
          placeholder="실패 했던 자소서나 면접 질문에 대한 답변 내용을 작성해 보세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <SaveButton onClick={handleSubmit} disabled={!isButtonActive} $isActive={isButtonActive}>
          카드 뽑으러 가기
        </SaveButton>
      </ModalContainer>
    </ModalBackdrop>
  );
}

const TitleSection = styled.div`
  text-align: center;
  /* margin-bottom: 10px; */
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.4;
  }
  p {
    font-size: 0.9rem;
    color: #ccc;
    margin-top: 8px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 90%;
  height: 100%;
  max-width: 380px;
  max-height: 380px;
  background-color: #2d3748;
  border: 1px solid #555;
  border-radius: 12px;
  padding: 16px;
  color: white;
  font-size: 1rem;
  resize: none;
  /* margin-bottom: 10px; */

  &::placeholder {
    color: #888;
  }
`;

// const SubmitButton = styled.button<{ $isActive: boolean }>`
//   /* 기존 SaveButton과 동일한 스타일 */
//   background-color: ${(props) => (props.$isActive ? '#8A61F0' : '#4A5568')};
//   color: ${(props) => (props.$isActive ? 'white' : '#A0AEC0')};
//   cursor: ${(props) => (props.$isActive ? 'pointer' : 'not-allowed')};
// `;
