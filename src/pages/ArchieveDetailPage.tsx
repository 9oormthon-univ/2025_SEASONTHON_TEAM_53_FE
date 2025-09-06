// src/pages/ArchiveDetailPage.tsx
import styled from 'styled-components';
// 👇 useParams로 URL 파라미터를, useNavigate로 뒤로가기 기능을 구현합니다.
import { useParams, useNavigate } from 'react-router-dom';
// 👇 상세 페이지 카드 이미지를 import 합니다. (MyDayPage에서 사용했던 이미지 재사용)
import cardSymbolImage from '../assets/testcard3.png';

// 🚨 실제 앱에서는 이 데이터를 별도 파일(e.g. data/cardData.ts)로 분리해서 가져오는 것이 좋습니다.
// 여기서는 설명을 위해 ArchivePage의 데이터를 그대로 가져왔습니다.
// import foolIcon from '../assets/icons/fool.svg';
// import magicianIcon from '../assets/icons/magician.svg';
// import loversIcon from '../assets/icons/lovers.svg';
// import strengthIcon from '../assets/icons/strength.svg';
// import justiceIcon from '../assets/icons/justice.svg';
// import hangedManIcon from '../assets/icons/hanged-man.svg';
// import starsIcon from '../assets/icons/stars.svg';
// import sunIcon from '../assets/icons/sun.svg';
// import worldIcon from '../assets/icons/world.svg';
// import wandsIcon from '../assets/icons/wands.svg';

import RecordDetailModal from '../components/RecordDetailModal';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Record {
  id: number;
  date: string;
  memo: string;
}

// 카드별 기록 데이터
const mockRecords: { [key: string]: Record[] } = {
  'The Fool': Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    date: `2025.09.0${i + 1}`,
    memo: `The Fool 카드에 대한 ${i + 1}번째 기록입니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  })),
  'The Magician': Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    date: `2025.08.1${i + 1}`,
    memo: `The Magician 카드에 대한 ${i + 1}번째 기록입니다.`,
  })),
  // ... 다른 카드들에 대한 기록 데이터 ...
};

export default function ArchiveDetailPage() {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const { cardName: cardNameFromUrl } = useParams(); // URL에서 카드 이름(:cardName)을 가져옴
  const navigate = useNavigate(); // 페이지 이동 함수

  // 👇 1. URL 파라미터가 없는 경우를 먼저 처리합니다.
  if (!cardNameFromUrl) {
    // 이 코드가 실행되면 아래 로직은 실행되지 않습니다.
    return <PageContainer>잘못된 접근입니다.</PageContainer>;
  }

  // URL 파라미터(e.g., "The-Fool")를 실제 카드 이름("The Fool")으로 변환
  const cardName = cardNameFromUrl?.replace(/-/g, ' ');

  // 이름이 일치하는 카드 데이터를 찾음

  const recordsToShow = mockRecords[cardName] || [];

  if (recordsToShow.length === 0) {
    return <PageContainer>기록을 찾을 수 없습니다.</PageContainer>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <BackButton onClick={() => navigate(-1)}>&lt;</BackButton>
        <PageTitle>{cardName}에 대한 나의 기록</PageTitle>
        <div style={{ width: '24px' }} />
      </PageHeader>

      <CardGrid>
        {recordsToShow.map((record) => (
          // 👇 CardItem 클릭 시 selectedRecord state를 업데이트
          <CardItem key={record.id} onClick={() => setSelectedRecord(record)}>
            <CardSymbol src={cardSymbolImage} alt={cardName} />
          </CardItem>
        ))}
      </CardGrid>

      {/* 👇 selectedRecord가 있을 때만 모달을 렌더링 */}
      <AnimatePresence>
        {selectedRecord && (
          <RecordDetailModal record={selectedRecord} cardName={cardName} onClose={() => setSelectedRecord(null)} />
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

// --- Styled Components ---
const PageContainer = styled.div`
  color: white;
  padding: 20px;
  min-height: 100vh;
`;

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-top: 20px; // 상태바 영역 고려
`;

const BackButton = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const PageTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2열 그리드
  gap: 16px;
`;

const CardItem = styled.div`
  background-color: #1a1a2e;
  border-radius: 12px;
  aspect-ratio: 280 / 450;
  overflow: hidden;
  cursor: pointer; // 클릭 가능함을 표시
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
const CardSymbol = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
