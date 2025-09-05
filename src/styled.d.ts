// src/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    cardColor: string;
    borderColor: string;
    subTextColor: string;
  }
}
