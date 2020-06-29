import {
  getAllBooksType,
  getLoadBooksType,
  getNewBooksType,
  getMyBooksType,
  postBookType,
  getHistoryType,
  deleteHistoryType,
  addHistoryType,
  addMyBookType,
} from './actionType';
import {
  getAllBooks,
  getNewBooks,
  getMyBooks,
  postBook,
  getHistory,
  deleteHistory,
} from '../../utils/http';

export const getUserActionCreator = body => {
  return {
    type: getAllBooksType,
    payload: getAllBooks(body),
  };
};

export const getMyBooksActionCreator = body => {
  return {
    type: getMyBooksType,
    payload: getMyBooks(body),
  };
};

export const getLoadBooksActionCreator = body => {
  return {
    type: getLoadBooksType,
    payload: getAllBooks(body),
  };
};

export const getNewBooksActionCreator = body => {
  return {
    type: getNewBooksType,
    payload: getNewBooks(body),
  };
};

export const getHistoryActionCreator = body => {
  return {
    type: getHistoryType,
    payload: getHistory(body),
  };
};

export const postBookActionCreator = body => {
  return {
    type: postBookType,
    payload: postBook(body),
  };
};

export const deleteHistoryActionCreator = body => {
  return {
    type: deleteHistoryType,
    payload: deleteHistory(body),
  };
};

export const addHistoryActionCreator = value => {
  return {
    type: addHistoryType,
    value,
  };
};

export const addMyBookActionCreator = value => {
  return {
    type: addMyBookType,
    value,
  };
};
