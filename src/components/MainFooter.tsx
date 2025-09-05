import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// const HomeIcon = () => (
//   <svg fill="currentColor" viewBox="0 0 24 24">
//     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//   </svg>
// );

const SunIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zm-9-7c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zm0 12c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zM5.64 7.05c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.64 4.22c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.41 1.42zm12.72 12.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.41-1.42c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.41 1.42zM4.22 18.36c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.41-1.42c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.41 1.42zm14.14-12.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.41-1.42c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.41 1.42z" />
  </svg>
);
const ArchiveIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z" />
  </svg>
);

const FooterContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
`;

const NavItem = styled(NavLink)`
  color: #888;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  svg {
    max-width: 28px;
    max-height: 28px;
  }

  &.active {
    color: white;
  }
`;

export default function MainFooter() {
  return (
    <FooterContainer>
      {/* <NavItem to="/main">
        <HomeIcon />
        <span>홈</span>
      </NavItem> */}
      <NavItem to="/today-arcana">
        <SunIcon />
        <span>오늘의 아르카나</span>
      </NavItem>
      <NavItem to="/archive">
        <ArchiveIcon />
        <span>모아보기</span>
      </NavItem>
    </FooterContainer>
  );
}
