import { GiphyFetch } from "@giphy/js-fetch-api";
import { LOAD_GIFS, PAGE_INCREMENT, RESET, SET_SEARCH_PAGE, SET_TRENDING_PAGE, SET_TERM } from "../constants/constants";

const gf = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

export const loadTrendingGifs = (isDesktop) => (dispatch, getState) => {
  const { page, perPageGif } = getState();
  const fetchGifs = (offset) =>
    gf.trending({ offset, limit: page * perPageGif });
  dispatch({type: SET_TRENDING_PAGE});
  dispatch({ type: LOAD_GIFS.INIT });
  fetchGifs().then(({ data }) => {
    const gifs = data.map((gif) => {
      const fixed_width = isDesktop
        ? gif.images.fixed_width
        : gif.images.fixed_width_small;
      const ratio = fixed_width.width / fixed_width.height;
      return {
        id: gif.id,
        link: gif.url,
        ratio: ratio,
        ...fixed_width,
      };
    });
    dispatch({ type: LOAD_GIFS.SUCCESS, payload: gifs });
  });
};

export const search = (searchInput) => (dispatch, getState) => {
  const { page, perPageGif, term} = getState();
  if (!searchInput) searchInput = term;
  const searchGifs = (offset) =>
    gf.search(searchInput, { offset, limit: page * perPageGif });
  dispatch({type: SET_SEARCH_PAGE});
  dispatch({ type: LOAD_GIFS.INIT });
  searchGifs().then(({ data }) => {
    const gifs = data.map((gif) => {
      const fixed_width = gif.images.fixed_width;
      const ratio = fixed_width.width / fixed_width.height;
      return {
        id: gif.id,
        link: gif.url,
        ratio: ratio,
        ...fixed_width,
      };
    });
    dispatch({type: SET_TERM, payload: searchInput});
    dispatch({ type: LOAD_GIFS.SUCCESS, payload: gifs });
  });
};

export const loadMoreGifs = () => {
  return {
    type: PAGE_INCREMENT,
  };
};

export const resetGifsConfig = ()=>{
  return {
    type : RESET,
  }
}

export const debounce = (fun, delay) => {
  let timer;
  return function (term) {
    return (dispatch) => {
      clearTimeout(timer);
      let contex = this;
      timer = setTimeout(() => {
        dispatch(fun.call(contex, term));
      }, delay);
    };
  };
};
