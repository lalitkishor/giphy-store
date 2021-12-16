import { LOAD_TRENDING_GIFS, PAGE_INCREMENT } from "../constants/constants";

const initialState = {
  hasMore: true,
  gifList: [],
  page: 1,
  perPageGif: 10,
  loading: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRENDING_GIFS.INIT:
      return { ...state, loading: true };
    case LOAD_TRENDING_GIFS.SUCCESS:
      let hasMore = state.hasMore;
      if (action.payload.length < initialState.perPageGif) {
        hasMore = false;
      }
      return { ...state, ...{ gifList: action.payload }, hasMore };
    case PAGE_INCREMENT:
      if(state.hasMore){
        const newPage = state.page + 1;
        return { ...state, ...{ page: newPage } };
      }
      return state;

    default:
      return state;
  }
}

export default rootReducer;
