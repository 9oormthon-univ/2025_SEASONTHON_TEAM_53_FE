// 카드 이미지를 동적으로 가져오는 헬퍼 함수
export const getCardImageUrl = (id: number, cardType: 'pre' | 'post') => {
  // Vite의 new URL() 문법을 사용하여 빌드 시에도 이미지를 올바르게 참조합니다.
  return new URL(`../assets/cards/card${id}_${cardType}.svg`, import.meta.url).href;
};
