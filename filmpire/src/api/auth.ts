import axios from 'axios';
/**
 * TMDB APIとSessionを貼る
 * 1. axiosで一時的なTokenを取得し、ローカルに保存
 * 2. ユーザーの認証を受けたら、session id を発行
 */
export const moviesApi = axios.create({
  method: 'get',
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGUyNDk5NzNkZDY0ZDY4NThhNWFjMzQ2NDk0Y2JjMSIsInN1YiI6IjY1MTEyYjAwNmY5NzQ2MDEwMzVkZmE1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-a4O5bVDt_KFZ1FexnH0vOJCLoNA1StPig5XNgqi9c',
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('authentication/token/new');
    const token = data.request_token;
    if (data.success) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Sorry, your token could not be created.');
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');
  console.log('first',token);
  if (token) {
    try {
      const {
        data: { session_id },
      } = await moviesApi.post('authentication/session/new', { request_token: token });
      localStorage.setItem('session_id', session_id);
      console.log('second',token);
      console.log('sid:aaa',session_id);
      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
};
