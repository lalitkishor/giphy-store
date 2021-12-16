import { GiphyFetch } from "@giphy/js-fetch-api";
import {LOAD_TRENDING_GIFS,PAGE_INCREMENT} from "../constants/constants";

const gf = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");


export const loadTrendingGifs = (isDesktop)=>(dispatch, getState)=>{
    const {page, perPageGif} = getState();
    const fetchGifs = (offset) => gf.trending({ offset, limit: page * perPageGif });
    dispatch({type:LOAD_TRENDING_GIFS.INIT});
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
        dispatch({type : LOAD_TRENDING_GIFS.SUCCESS, payload : gifs});
    });
}

export const search = (term)=>(dispatch, getState)=>{
    const {page, perPageGif} = getState();
    const searchGifs = (offset) => gf.search(term, { offset, limit: page * perPageGif });
    searchGifs().then((result)=>{
        console.log("result", result);
    });
}
export const loadMoreGifs =()=> {
    return {
        type : PAGE_INCREMENT
    }
}