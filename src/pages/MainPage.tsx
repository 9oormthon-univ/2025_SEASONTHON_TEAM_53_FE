import styled from 'styled-components';
// Swiper 컴포넌트와 모듈들을 import 합니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

// Swiper의 CSS를 import 합니다.
// import 'swiper/css';
// import 'swiper/css/effect-cards';
// import 'swiper/css';

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const Header = styled.header`
  padding: 20px;
  display: flex;
  justify-content: flex-start;
`;

const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const SliderWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledSwiper = styled(Swiper)`
  width: 280px;
  height: 400px;
`;

const Card = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => props.bgColor};
`;

const BottomNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  border-top: 1px solid #6a6a6a;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #f0f0f0;
`;

const NavIcon = styled.div`
  width: 28px;
  height: 28px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

export default function MainPage() {
  return (
    <MainPageContainer>
      <Header>
        <IconPlaceholder />
      </Header>

      <SliderWrapper>
        <StyledSwiper effect={'cards'} grabCursor={true} modules={[EffectCards]}>
          <SwiperSlide>
            <Card bgColor="#9B89B3">카드 모션</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card bgColor="#E4A9A8">나의 하루</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card bgColor="#7B8D8E">모아보기</Card>
          </SwiperSlide>
        </StyledSwiper>
      </SliderWrapper>

      <BottomNav>
        <NavItem>
          <NavIcon />
          <span>메인</span>
        </NavItem>
        <NavItem>
          <NavIcon />
          <span>나의 하루</span>
        </NavItem>
        <NavItem>
          <NavIcon />
          <span>모아보기</span>
        </NavItem>
      </BottomNav>
    </MainPageContainer>
  );
}
