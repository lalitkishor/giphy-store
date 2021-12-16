import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import Card from "../Components/Card";
import useDevice from "../Hooks/useDevice";
import useDeviceWidth from "../Hooks/useDeviceWidth";
import "./tredning.css";
import ThemeContext from "../themeContext";
import { useDispatch, useSelector } from "react-redux";
import {loadTrendingGifs, loadMoreGifs, search} from"../actions/action";

function TrendingPage() {
  
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [layoutColumn, setLayoutColumn] = useState(1);
  const [loaderHeight, setLoaderHeight] = useState(0);
  const { isMobile, isDesktop, isTab } = useDevice();
  const windowWidth = useDeviceWidth();

  const loading = useSelector((state)=>state.loading);
  const page = useSelector((state)=>state.page);
  const gifList = useSelector((state)=>state.gifList);
  const isSearchPage = useSelector((state)=>state.isSearchPage);

  const {theme} = useContext(ThemeContext);
  const dispatch = useDispatch();
  const loader = useRef(null);

  useEffect(() => {
      isSearchPage ? dispatch(search()):
      dispatch(loadTrendingGifs(isDesktop));
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
      dispatch(loadMoreGifs());
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
      <div className="wrapper" style={theme}>
        <div
          className="giphyContainer"
          style={isDesktop ? { marginLeft: 150 } : { marginLeft: 25 }}
        >
          {gifList.map(( gifObj, index) => (
            <Card
              key={gifObj.id}
              index={index}
              gifList={gifList}
              gifObj={gifObj}
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
