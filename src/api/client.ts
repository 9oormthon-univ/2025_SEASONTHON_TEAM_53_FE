// src/api/client.ts
import axios from 'axios';

// .env 파일에 API 서버의 기본 주소를 설정합니다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
