import {
  getAllBooksType,
  getLoadBooksType,
  getMyBooksType,
  getNewBooksType,
  getHistoryType,
  deleteHistoryType,
  addHistoryType,
  addMyBookType,
  pending,
  rejected,
  fulfilled,
} from '../actions/actionType';

const initialValue = {
  responseAPI: [],
  discoverNew: [],
  myBooks: [],
  bookHistory: [],
  pagination: {},
  nextPage: '',
  isEnd: false,
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const book = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAllBooksType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllBooksType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        responseAPI: [],
      };
    case getAllBooksType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        responseAPI: action.payload.data.data,
        pagination: action.payload.data.pagination,
      };
    case getMyBooksType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getMyBooksType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        myBooks: 401,
      };
    case getMyBooksType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        myBooks: action.payload.data.data,
      };
    case getLoadBooksType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getLoadBooksType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        responseAPI: [],
      };
    case getLoadBooksType + fulfilled:
      if (action.payload.data.data.length !== 0) {
        action.payload.data.data.forEach(response => {
          prevState.responseAPI.push(response);
        });
        isEnd = false;
      }
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        responseAPI: prevState.responseAPI,
        pagination: action.payload.data.pagination,
      };
    case getNewBooksType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getNewBooksType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        discoverNew: [],
      };
    case getNewBooksType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        discoverNew: action.payload.data.data,
      };
    case getHistoryType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getHistoryType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        bookHistory: [],
      };
    case getHistoryType + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        isEnd: true,
        bookHistory: action.payload.data.data,
        nextPage: action.payload.data.pagination.nextPage,
      };
    case addHistoryType:
      const newData = [action.value];
      Array.prototype.push.apply(newData, prevState.bookHistory);
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        bookHistory: newData,
      };
    case addMyBookType:
      let newMyBook = [];
      if (action.value.status === 1) {
        newMyBook = prevState.myBooks.filter(
          response => response.id !== parseInt(action.value.id),
        );
      } else {
        newMyBook = [action.value];
        Array.prototype.push.apply(newMyBook, prevState.myBooks);
      }
      const discoverNewAfterEdit = prevState.discoverNew.map(response => {
        if (response.id === parseInt(action.value.id)) {
          return action.value;
        }
        return response;
      });
      const responseAPIAfterEdit = prevState.responseAPI.map(response => {
        if (response.id === parseInt(action.value.id)) {
          return action.value;
        }
        return response;
      });
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        myBooks: newMyBook,
        discoverNew: discoverNewAfterEdit,
        responseAPI: responseAPIAfterEdit,
      };
    case deleteHistoryType + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case deleteHistoryType + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case deleteHistoryType + fulfilled:
      const dataAfterDelete = prevState.bookHistory.filter(
        response => response.id !== parseInt(action.payload.data.data.id),
      );
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        bookHistory: dataAfterDelete,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default book;
