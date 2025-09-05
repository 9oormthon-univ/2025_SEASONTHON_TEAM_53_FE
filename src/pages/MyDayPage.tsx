import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../styles/theme';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion import
import cardBeforeImage from '../assets/testcard2.png';
import cardAfterImage from '../assets/testcard3.png';
import theFoolSymbol from '../assets/testcard.png';
import CardRevealModal from '../components/CardRevealModal';
import RecordModal from '../components/RecordModal';

const PageContainer = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleSection = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 8px 0;
  }
  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.subTextColor};
    margin: 0;
  }
`;

// --- 새로운 토글 스위치 컴포넌트 ---
const ToggleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 140px; // 너비 조정
  height: 44px; // 높이 조정
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 22px;
  padding: 4px;
  cursor: pointer;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const ToggleHandle = styled(motion.div)`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 70px; // 핸들 너비
  height: 36px; // 핸들 높이
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Label = styled.span<{ $isActive: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.$isActive ? '#5A67D8' : '#aaa')};
  z-index: 1; // 핸들보다 위에 텍스트가 오도록 설정
  transition: color 0.3s ease-in-out;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column; // 말풍선을 위에 추가하기 위해 column으로 변경
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px 0;
  perspective: 1000px; // 3D 효과를 위한 원근감 설정
`;

const InfoBubble = styled(motion.div)`
  position: relative;
  display: flex; // 텍스트와 버튼을 나란히 놓기 위해 flex 추가
  align-items: center;
  gap: 10px; // 텍스트와 버튼 사이 간격
  background-color: #4a5568;
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px 10px 0 10px;
    border-style: solid;
    border-color: #4a5568 transparent transparent transparent;
  }
`;

const BubbleCloseButton = styled.button`
  width: 16px;
  height: 16px;
  padding: 0;
  background-color: transparent;
  // SVG를 사용해 X 아이콘 생성
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const FlippableCardContainer = styled(motion.div)`
  width: 280px;
  height: 450px;
  position: relative;
  transform-style: preserve-3d; // 자식 요소의 3D 변환 유지
  cursor: pointer;
`;

const CardFace = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  backface-visibility: hidden; // 뒷면은 보이지 않게 처리
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

const CardFront = styled(CardFace)`
  background-color: #1e1e1e;
  /* padding: 20px; */
  flex-direction: column;
  justify-content: space-between;
`;

const CardBack = styled(CardFace)`
  background-color: rgba(255, 255, 255, 0.2);
  transform: rotateY(180deg);
  padding: 40px 20px;
  flex-direction: column;
  color: #8a61f0;
  font-weight: bold;
  :last-child {
    color: white;
    font-weight: 300;
  }

  // 1. 버튼이 빠졌으므로 콘텐츠 정렬을 space-around로 변경
  justify-content: space-evenly;
`;

const CardSymbol = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;
const CardName = styled.span`
  font-size: 1.2rem;
`;
const CardNumber = styled.span`
  align-self: flex-start;
  font-size: 1.2rem;
`;
const CardDescription = styled.p`
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.6;
`;

const RecordButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: #8a61f0;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
`;

// 2. 기존 CardPlaceholder와 QuestionMark를 삭제하고,
//    img 태그를 위한 TarotCardImage 컴포넌트를 새로 만듭니다.
// 2. motion 컴포넌트로 변경하여 애니메이션을 적용합니다.
const TarotCardImage = styled(motion.img)`
  width: 280px;
  height: auto;
  border-radius: 16px;
  filter: drop-shadow(0 0 25px rgba(138, 97, 240, 0.6));
  position: absolute; // AnimatePresence 내에서 부드러운 교체를 위해 absolute 포지션 사용
`;

const PickCardButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: #8a61f0;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
`;

export default function MyDayPage() {
  // 1. "면접 전/후" 상태를 관리할 새로운 state 생성
  const [toggleState, setToggleState] = useState<'before' | 'after'>('before');
  const [isModalOpen, setIsModalOpen] = useState(false); // 2. 모달 표시 상태 추가
  const { theme } = useContext(ThemeContext);

  const [isCardPicked, setIsCardPicked] = useState(false); // 👈 카드 뽑기 완료 상태
  const [isFlipped, setIsFlipped] = useState(false); // 👈 카드 뒤집힘 상태
  const [isBubbleVisible, setIsBubbleVisible] = useState(true); // 2. 말풍선 상태 추가
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false); // 2. 기록 모달 상태 추가

  const handleToggle = () => setToggleState(toggleState === 'before' ? 'after' : 'before');
  const handlePickCard = () => setIsModalOpen(true);

  // 모달에서 "설명 보러 가기"를 눌렀을 때 실행될 함수
  const handleCardPickConfirm = () => {
    setIsCardPicked(true);
    setIsModalOpen(false);
    setIsBubbleVisible(true); // 3. 카드를 새로 뽑을 때마다 말풍선이 다시 보이도록 설정
  };

  const currentCardImage = toggleState === 'before' ? cardBeforeImage : cardAfterImage;
  const selectedCardData = {
    name: 'The Fool',
    number: 0,
    symbolImage: theFoolSymbol,
    description: '“새로운 시작과 모험을 향한 순수한 발걸음, 두려움 없는 도전의 에너지”',
  };

  return (
    <>
      <PageContainer>
        <Header>
          <TitleSection>
            <h1>오늘의 아르카나</h1>
            <p>타로 카드를 뽑아보세요.</p>
          </TitleSection>
          {/* 기존의 ToggleSwitch를 새로운 애니메이션 스위치로 교체 */}
          {/* 2. 기존 스위치를 새로운 토글 스위치로 교체 */}

          {!isCardPicked && (
            <ToggleContainer onClick={handleToggle}>
              <ToggleHandle
                animate={{ x: toggleState === 'before' ? 0 : 62 }} // '면접 후'일 때 오른쪽으로 62px 이동
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              />
              <Label $isActive={toggleState === 'before'}>면접 전</Label>
              <Label $isActive={toggleState === 'after'}>면접 후</Label>
            </ToggleContainer>
          )}
        </Header>

        <CardWrapper>
          {isCardPicked && isBubbleVisible && (
            <InfoBubble initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span>카드를 클릭해 설명을 읽어보세요.</span>
              {/* 5. 닫기 버튼과 onClick 이벤트 추가 */}
              <BubbleCloseButton onClick={() => setIsBubbleVisible(false)} />
            </InfoBubble>
          )}

          {!isCardPicked ? (
            // --- 카드 뽑기 전 UI ---
            <AnimatePresence mode="wait">
              <motion.img
                key={currentCardImage}
                src={currentCardImage}
                alt="타로 카드 뒷면"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{ width: '280px', filter: 'drop-shadow(0 0 25px rgba(138, 97, 240, 0.6))' }}
              />
            </AnimatePresence>
          ) : (
            // --- 카드 뽑은 후 UI (뒤집히는 카드) ---
            <FlippableCardContainer
              onClick={() => setIsFlipped(!isFlipped)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 카드 앞면 */}
              <CardFront>
                <CardSymbol src={selectedCardData.symbolImage} />
              </CardFront>
              {/* 카드 뒷면 */}
              <CardBack>
                <CardNumber style={{ alignSelf: 'center' }}>{selectedCardData.number}.</CardNumber>
                <h2 style={{ fontSize: '1.8rem' }}>{selectedCardData.name}</h2>
                <CardDescription>{selectedCardData.description}</CardDescription>
              </CardBack>
            </FlippableCardContainer>
          )}
        </CardWrapper>

        {/* 카드를 뽑은 후에는 뽑기 버튼 숨김 */}
        {/* --- 페이지 하단 버튼 부분 수정 --- */}
        {/* ... (Header, CardWrapper 등 기존 JSX는 동일) ... */}

        {!isCardPicked ? (
          <PickCardButton onClick={handlePickCard}>타로 카드 뽑기</PickCardButton>
        ) : (
          <AnimatePresence>
            {isFlipped && (
              <motion.div /* ... */>
                {/* 3. onClick 이벤트에 모달을 여는 함수 연결 */}
                <RecordButton onClick={() => setIsRecordModalOpen(true)}>기록 하러 가기</RecordButton>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </PageContainer>

      <AnimatePresence>
        {isModalOpen && (
          <CardRevealModal
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleCardPickConfirm}
            cardData={selectedCardData}
          />
        )}
        {isRecordModalOpen && <RecordModal onClose={() => setIsRecordModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
