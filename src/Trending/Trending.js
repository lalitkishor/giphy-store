import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import Card from "../Components/Card";
import useDevice from "../Hooks/useDevice";
import useDeviceWidth from "../Hooks/useDeviceWidth";
import "./tredning.css";

const gf = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

const perPageGif = 10;

function TrendingPage() {
  const { isMobile, isDesktop, isTab } = useDevice();
  const [gifList, setGifList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loaderHeight, setLoaderHeight] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [layoutColumn, setLayoutColumn] = useState(1);
  const windowWidth = useDeviceWidth();
  const loader = useRef(null);

  useEffect(() => {
    setLoading(true);
    const fetchGifs = (offset) =>
      gf.trending({ offset, limit: page * perPageGif });
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
      setGifList(gifs);
      setLoading(false);
    });
  }, [page, isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      const cardWidth = (windowWidth - 300) / 3;
      setLayoutWidth(cardWidth);
      setLayoutColumn(3);
    }
    if (isTab) {
      const cardWidth = (windowWidth - 50) / 2;
      setLayoutWidth(cardWidth);
      setLayoutColumn(2);
    }
    if (isMobile) {
      setLayoutWidth(windowWidth - 50);
      setLayoutColumn(1);
    }
  }, [windowWidth, isDesktop, isTab, isMobile]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    loader.current && observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div style={{ height: `${loaderHeight + 500}px`, width: `${windowWidth}px` }}>
      <div className="wrapper" >
        <div
          className="giphyContainer"
          style={isDesktop ? { marginLeft: 150 } : { marginLeft: 25 }}
        >
          {gifList.map(({ url, id, link, ratio }, index) => (
            <Card
              key={id}
              url={url}
              index={index}
              link={link}
              gifList={gifList}
              ratio={ratio}
              setLoaderHeight={setLoaderHeight}
              layoutWidth={layoutWidth}
              layoutColumn={layoutColumn}
            />
          ))}
          {loading && (
            <h3
              className="loader"
              style={{
                transform: `translate3d(${layoutWidth + (isDesktop ? 150 : 25)}px,${loaderHeight}px,0px)`,
              }}
            >
              Loading....
            </h3>
          )}
          <div
            ref={loader}
            className="loaderRef"
            style={{ transform: `translate3d(0px,${loaderHeight}px,0px)` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default TrendingPage;
