import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion import
import cardBeforeImage from '../assets/testcard2.png';
import cardAfterImage from '../assets/testcard3.png';
import CardRevealModal from '../components/CardRevealModal';
import RecordModal from '../components/RecordModal';
import PostInterviewModal from '../components/PostInterviewModal';
import { cardList, type Card } from '../data/cardData'; // 1. 카드 데이터와 타입 import
import { getCardImageUrl } from '../utils/imageUtils';

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
  /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 👇 2. CardFront 스타일 수정
const CardFront = styled(CardFace)<{ $imageUrl: string }>`
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover; /* 이미지가 카드 영역을 꽉 채우도록 */
  background-position: center; /* 이미지를 중앙 정렬 */
  /* background-color: rgba(0, 0, 0, 0.1); 이미지 위에 반투명 오버레이로 텍스트 가독성 높임 */
  background-blend-mode: darken; /* 배경 이미지와 배경색을 혼합하여 어둡게 */
  color: white; /* 텍스트 색상을 흰색으로 */
  justify-content: space-between; /* 번호와 타이틀을 상단/하단으로 밀어냄 */
  padding: 30px 20px;
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

// 수정된 CardSymbol
const CardSymbol = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 비율을 유지하며 컨테이너를 꽉 채웁니다.
  border-radius: 16px; // 부모 컨테이너의 둥근 모서리와 맞춰줍니다.
`;
const CardNumber = styled.span`
  align-self: flex-start;
  font-size: 1.9rem;
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

const PickCardButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background-color: #8a61f0;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
`;

// Placeholder 스타일 추가
const Placeholder = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
`;

export default function MyDayPage() {
  // 1. "면접 전/후" 상태를 관리할 새로운 state 생성
  const [toggleState, setToggleState] = useState<'before' | 'after'>('before');
  const [isModalOpen, setIsModalOpen] = useState(false); // 2. 모달 표시 상태 추가
  // const { theme } = useContext(ThemeContext);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // 2. 선택된 카드를 저장할 state

  const [isCardPicked, setIsCardPicked] = useState(false); // 👈 카드 뽑기 완료 상태
  const [isFlipped, setIsFlipped] = useState(false); // 👈 카드 뒤집힘 상태
  const [isBubbleVisible, setIsBubbleVisible] = useState(true); // 2. 말풍선 상태 추가
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false); // 2. 기록 모달 상태 추가
  const [isPostInterviewModalOpen, setIsPostInterviewModalOpen] = useState(false); // 2. 자소서 모달 상태 추가
  const [postInterviewText, setPostInterviewText] = useState(''); // 3. 자소서 내용 저장 상태 추가

  const handleToggle = () => {
    const newState = toggleState === 'before' ? 'after' : 'before';

    // 4. '면접 후'로 변경될 때 모달을 엽니다.
    if (newState === 'after') {
      setIsPostInterviewModalOpen(true);
    } else {
      setToggleState('before');
    }
  };
  const handlePickCard = () => {
    const cardType = toggleState === 'before' ? 'pre' : 'post';
    const filteredCards = cardList.filter((card) => card.card_type === cardType);

    if (filteredCards.length === 0) {
      alert('뽑을 카드가 없습니다.');
      return;
    }

    // 2. 랜덤으로 카드 하나를 선택합니다.
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    const pickedCard = filteredCards[randomIndex];

    setSelectedCard(pickedCard);
    setIsModalOpen(true);
  };

  const cardName = selectedCard?.name.split(' ').slice(1).join(' ') || '';
  const cardNumber = selectedCard?.name.split(' ')[0] || '';
  // 모달에서 "설명 보러 가기"를 눌렀을 때 실행될 함수
  const handleCardPickConfirm = () => {
    setIsCardPicked(true);
    setIsModalOpen(false);
    setIsBubbleVisible(true); // 3. 카드를 새로 뽑을 때마다 말풍선이 다시 보이도록 설정
  };

  // 5. 자소서 모달에서 제출했을 때 실행될 함수
  const handlePostInterviewSubmit = (text: string) => {
    setPostInterviewText(text);
    console.log('제출된 자소서 내용:', text);
    setIsPostInterviewModalOpen(false);
    setToggleState('after'); // 모달이 닫힌 후 토글 상태를 변경
  };

  const canShowCardUI = toggleState === 'before' || (toggleState === 'after' && postInterviewText);

  const currentCardImage = cardBeforeImage;

  return (
    <>
      <PageContainer>
        <Header>
          <TitleSection>
            <h1>오늘의 아르카나</h1>
            <p>타로 카드를 뽑아보세요.</p>
          </TitleSection>

          {/* '카드 뽑기 완료' 상태가 아닐 때만 토글 스위치를 보여줍니다. */}
          {!isCardPicked && (
            <ToggleContainer onClick={handleToggle}>
              <ToggleHandle
                animate={{ x: toggleState === 'before' ? 0 : 62 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              />
              <Label $isActive={toggleState === 'before'}>면접 전</Label>
              <Label $isActive={toggleState === 'after'}>면접 후</Label>
            </ToggleContainer>
          )}
        </Header>

        {/* '면접 후' 내용을 작성해야만 카드 UI가 보이도록 합니다. */}
        {canShowCardUI ? (
          <>
            <CardWrapper>
              {/* 말풍선 UI */}
              <AnimatePresence>
                {isCardPicked && isBubbleVisible && (
                  <InfoBubble
                    key="info-bubble"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <span>카드를 클릭해 설명을 읽어보세요.</span>
                    <BubbleCloseButton onClick={() => setIsBubbleVisible(false)} />
                  </InfoBubble>
                )}
              </AnimatePresence>

              {/* 카드 UI: 뽑기 전과 뽑은 후를 나눕니다. */}
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
                selectedCard && ( // selectedCard 데이터가 있을 때만 렌더링
                  <FlippableCardContainer
                    onClick={() => setIsFlipped(!isFlipped)}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* 카드 앞면 */}
                    {/* 👇 1. 카드 앞면 JSX 수정 */}
                    <CardFront $imageUrl={getCardImageUrl(selectedCard.id, selectedCard.card_type)} />
                    {/* 카드 뒷면 */}
                    <CardBack>
                      <CardNumber style={{ alignSelf: 'center' }}>
                        {cardNumber}. {cardName}
                      </CardNumber>
                      {/* <h2 style={{ fontSize: '1.8rem' }}>{cardName}</h2> */}
                      <CardDescription>"{selectedCard.description}"</CardDescription>
                    </CardBack>
                  </FlippableCardContainer>
                )
              )}
            </CardWrapper>

            {/* 페이지 하단 버튼 UI */}
            {!isCardPicked ? (
              <PickCardButton onClick={handlePickCard}>타로 카드 뽑기</PickCardButton>
            ) : (
              <AnimatePresence>
                {isFlipped && (
                  <motion.div
                    key="record-button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}
                  >
                    <RecordButton onClick={() => setIsRecordModalOpen(true)}>기록 하러 가기</RecordButton>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </>
        ) : (
          <Placeholder>
            <p>'면접 후' 내용을 먼저 작성해주세요.</p>
          </Placeholder>
        )}
      </PageContainer>

      {/* 전체 화면을 덮는 모달들을 여기에 모아둡니다. */}
      <AnimatePresence>
        {isModalOpen && selectedCard && (
          <CardRevealModal
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleCardPickConfirm}
            cardData={selectedCard}
          />
        )}
        {isRecordModalOpen && selectedCard && (
          <RecordModal onClose={() => setIsRecordModalOpen(false)} cardData={selectedCard} />
        )}
        {isPostInterviewModalOpen && (
          <PostInterviewModal onClose={() => setIsPostInterviewModalOpen(false)} onSubmit={handlePostInterviewSubmit} />
        )}
      </AnimatePresence>
    </>
  );
}
