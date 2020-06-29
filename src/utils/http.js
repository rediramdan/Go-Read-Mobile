import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';

const BASE_URL = 'http://192.168.43.67:3001';

export const getAllBooks = props => {
  const {search, sort, asc, requestPage, limit} = props;
  const requestData = {
    search,
    sort,
    asc,
    requestPage,
    limit,
  };
  return axios.get(`${BASE_URL}/book?${qs.stringify(requestData)}`);
};

export const getNewBooks = props => {
  const {search} = props;
  const requestData = {
    search,
    sort: 'RAND()',
    asc: 'false',
    requestPage: 1,
    limit: 5,
  };
  return axios.get(`${BASE_URL}/book?${qs.stringify(requestData)}`);
};

export const getMyBooks = async props => {
  const API_T = await AsyncStorage.getItem('_token');
  const {search, requestPage} = props;
  const requestData = {
    search,
    sort: 'created_at',
    asc: false,
    requestPage,
    limit: 100,
  };
  return axios.get(`${BASE_URL}/book/mybooks?${qs.stringify(requestData)}`, {
    headers: {
      Authorization: `Bearer ${API_T}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const getHistory = async props => {
  const API_T = await AsyncStorage.getItem('_token');
  const {requestPage, limit} = props;
  const requestData = {
    requestPage,
    limit,
  };
  return axios.get(`${BASE_URL}/book/history?${qs.stringify(requestData)}`, {
    headers: {
      Authorization: `Bearer ${API_T}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const getBookById = bookId => {
  return axios.get(`${BASE_URL}/book/${bookId}`);
};

export const putBook = async (body, id) => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  const data = new FormData();
  data.append('title', body.title);
  data.append('description', body.description);
  if (body.image) {
    data.append('image', body.image);
  }
  data.append('id_author', body.id_author);
  data.append('id_genre', body.id_genre);
  return axios.put(`${BASE_URL}/book/${id}`, data, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'multipart/form-data',
      Type: 'formData',
    },
  });
};

export const deleteBook = async id => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.delete(`${BASE_URL}/book/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const deleteHistory = async id => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.delete(`${BASE_URL}/book/history/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const postBook = async body => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  const data = new FormData();
  data.append('title', body.title);
  data.append('description', body.description);
  if (body.image) {
    data.append('image', body.image);
  }
  data.append('id_author', body.id_author);
  data.append('id_genre', body.id_genre);
  return axios.post(`${BASE_URL}/book`, data, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'multipart/form-data',
      Type: 'formData',
    },
  });
};

export const transactionBook = async (body, id) => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.put(`${BASE_URL}/book/transaction/${id}`, qs.stringify(body), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const checkBook = async id => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.get(`${BASE_URL}/book/check/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const getAuthor = () => {
  return axios.get(`${BASE_URL}/author`);
};

export const putAuthor = async (body, id) => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.put(`${BASE_URL}/author/${id}`, qs.stringify(body), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const deleteAuthor = async id => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.delete(`${BASE_URL}/author/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const postAuthor = async body => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.post(`${BASE_URL}/author`, qs.stringify(body), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const getGenre = () => {
  return axios.get(`${BASE_URL}/genre`);
};

export const putGenre = async (body, id) => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.put(`${BASE_URL}/genre/${id}`, qs.stringify(body), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const deleteGenre = async id => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.delete(`${BASE_URL}/genre/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const postGenre = async body => {
  const API_TOKEN = await AsyncStorage.getItem('_token');
  return axios.post(`${BASE_URL}/genre`, qs.stringify(body), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const postLogin = body => {
  return axios.post(`${BASE_URL}/auth/login`, qs.stringify(body));
};

export const postRegister = body => {
  return axios.post(`${BASE_URL}/auth/register`, qs.stringify(body));
};

export const postLogout = body => {
  return axios.post(`${BASE_URL}/auth/logout`, qs.stringify(body));
};

export const refreshToken = body => {
  return axios.post(`${BASE_URL}/auth/token`, qs.stringify(body));
};
