// src/pages/ArchivePage.tsx

import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 1. 아이콘 이미지들을 import 합니다. (경로는 실제 위치에 맞게 수정하세요)
import foolIcon from '../assets/icons/fool.svg';
import magicianIcon from '../assets/icons/magician.svg';
import loversIcon from '../assets/icons/lovers.svg';
import strengthIcon from '../assets/icons/strength.svg';
import justiceIcon from '../assets/icons/justice.svg';
import hangedManIcon from '../assets/icons/hanged-man.svg';
import starsIcon from '../assets/icons/stars.svg';
import sunIcon from '../assets/icons/sun.svg';
import worldIcon from '../assets/icons/world.svg';
import wandsIcon from '../assets/icons/wands.svg';

// --- 임시 데이터 (Mock Data) ---
// 실제로는 API를 통해 유저 정보와 카드 목록을 받아옵니다.
const mockUserData = {
  nickname: '아르카나',
};

const mockCardData = [
  { id: 1, name: 'The Fool', count: 10, icon: foolIcon, strength: '도전을 즐겨하는' },
  { id: 2, name: 'The Magician', count: 5, icon: magicianIcon },
  { id: 3, name: 'The Lovers', count: 5, icon: loversIcon },
  { id: 4, name: 'Strength', count: 5, icon: strengthIcon },
  { id: 5, name: 'Justice', count: 5, icon: justiceIcon },
  { id: 6, name: 'The Hanged Man', count: 5, icon: hangedManIcon },
  { id: 7, name: 'The Stars', count: 5, icon: starsIcon },
  { id: 8, name: 'The Sun', count: 5, icon: sunIcon },
  { id: 9, name: 'The World', count: 5, icon: worldIcon },
  { id: 10, name: 'Page of Wands', count: 5, icon: wandsIcon },
];
// --- 임시 데이터 끝 ---

export default function ArchivePage() {
  // 가장 많이 나온 카드를 찾기 위한 로직
  const topCard = mockCardData.reduce((max, card) => (card.count > max.count ? card : max), mockCardData[0]);

  return (
    <PageContainer>
      <UserInfoSection>
        <h1>
          <Highlight>{mockUserData.nickname}</Highlight> 님은 <Highlight>{topCard.name}</Highlight>
          <br />
          카드가 많은 것을 보니
          <br />
          <Highlight>{topCard.strength}</Highlight> 사람이네요.
        </h1>
      </UserInfoSection>

      <CardList>
        {mockCardData.map((card) => (
          <Link to={`/archive/${card.name.replace(/ /g, '-')}`} key={card.id} style={{ textDecoration: 'none' }}>
            <CardListItem key={card.id}>
              <CardInfo>
                <CardIcon src={card.icon} alt={`${card.name} icon`} />
                <span>{card.name}</span>
              </CardInfo>
              <CardCount>{card.count} &gt;</CardCount>
            </CardListItem>
          </Link>
        ))}
      </CardList>
    </PageContainer>
  );
}

// --- Styled Components ---
const PageContainer = styled.div`
  color: white;
  padding: 40px 20px;
  min-height: 100vh;
`;

const UserInfoSection = styled.header`
  margin-bottom: 40px;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.6;
  }
`;

const Highlight = styled.span`
  color: #c4b5fd; // 강조 텍스트 색상
`;

const CardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px; // 리스트 아이템 사이 간격
`;

const CardListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a2e; // 아이템 배경색
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid var(--primary-2, #6c6fdf);

  &:hover {
    background-color: #2a2a4e;
  }
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 500;
`;

const CardIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const CardCount = styled.span`
  color: #888;
  font-weight: 500;
`;
