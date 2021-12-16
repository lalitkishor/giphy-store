import {
  LOAD_GIFS,
  PAGE_INCREMENT,
  RESET,
  SET_TERM,
  SET_TRENDING_PAGE,
  SET_SEARCH_PAGE,
} from "../constants/constants";

const initialState = {
  hasMore: true,
  gifList: [],
  page: 1,
  perPageGif: 10,
  loading: false,
  isSearchPage: false,
  term: "",
};

function rootReducer(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case LOAD_GIFS.INIT:
      return { ...state, loading: true };

    case LOAD_GIFS.SUCCESS:
      let hasMore = state.hasMore;
      if (action.payload.length < initialState.perPageGif) {
        hasMore = false;
      }
      return { ...state, ...{ gifList: action.payload }, hasMore };

    case PAGE_INCREMENT:
      if (state.hasMore) {
        const newPage = state.page + 1;
        return { ...state, ...{ page: newPage } };
      }
      return state;
    case SET_SEARCH_PAGE:
      return { ...state, isSearchPage: true };
    case SET_TRENDING_PAGE:
      return { ...state, isSearchPage: false };
    case SET_TERM:
      return { ...state, term: action.payload };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
}

export default rootReducer;
