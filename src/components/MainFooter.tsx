import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// 1. 준비한 아이콘 이미지들을 import 합니다.
import sunDefault from '../assets/card_nav_icon.svg';
import sunActive from '../assets/card_nav_icon_active.svg';
import archiveDefault from '../assets/archieve_nav_icon.svg';
import archiveActive from '../assets/archieve_nav_icon_active.svg';

// 2. 기존 SVG 아이콘 컴포넌트는 삭제합니다.

const FooterContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
`;

const NavItem = styled(NavLink)`
  color: #888;
  font-size: 0.8rem;
  text-decoration: none; // 링크 밑줄 제거
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  // 아이콘 이미지 스타일
  img {
    width: 28px;
    height: 28px;
  }

  // 기본 상태: active 아이콘은 숨김
  .icon-active {
    display: none;
  }
  // 기본 상태: default 아이콘은 보여줌
  .icon-default {
    display: block;
  }

  // NavLink가 활성화 상태일 때(&.active)
  &.active {
    color: white; // 텍스트 색상 변경

    // active 아이콘을 보여줌
    .icon-active {
      display: block;
    }
    // default 아이콘은 숨김
    .icon-default {
      display: none;
    }
  }
`;

export default function MainFooter() {
  return (
    <FooterContainer>
      <NavItem to="/today-arcana">
        {/* 3. 두 개의 img 태그(기본, 활성)를 className과 함께 추가합니다. */}
        <img src={sunDefault} alt="오늘의 아르카나" className="icon-default" />
        <img src={sunActive} alt="오늘의 아르카나 활성" className="icon-active" />
        <span>오늘의 아르카나</span>
      </NavItem>
      <NavItem to="/archive">
        <img src={archiveDefault} alt="모아보기" className="icon-default" />
        <img src={archiveActive} alt="모아보기 활성" className="icon-active" />
        <span>모아보기</span>
      </NavItem>
    </FooterContainer>
  );
}
