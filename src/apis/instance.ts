import axios from 'axios';

const REFRESH_URL = '/api/v1/member/reissue';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    let token: string | null = null;
    if (config.url !== REFRESH_URL) {
      token = localStorage.getItem('accessToken');
    } else {
      // 리프레시 토큰은 쿠키로 담김
    }
    if (token) {
      // 헤더 설정
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const regainAccessToken = async (): Promise<string | void> => {
  try {
    const {
      // 리프레시 토큰은 쿠키로 담김
      data: { accessToken },
    } = await axios.get<{ accessToken: string;}>(
      REFRESH_URL,
    );

    localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (e) {
    localStorage.removeItem('accessToken');
  }
};

instance.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;

    // 일반에러 처리
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(err);
    }

    config.sent = true;
    const accessToken = await regainAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // 새로운 토큰으로 재요청
    return instance(config);
  },
);

