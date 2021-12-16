import "./header.css";
import ThemeContext from "../../themeContext";
import { useContext } from "react";
import {search, debounce , loadTrendingGifs, resetGifsConfig} from "../../actions/action";
import { useDispatch } from "react-redux";

function Header(){
    const {type, themeToggle} =  useContext(ThemeContext);
    const dispatch = useDispatch();
    const optimizeSearch = debounce(search, 300);

    const handleGifChange = (e)=>{
        console.log("running")
        const input = e.currentTarget.value;
        dispatch(resetGifsConfig());
        if(input){ dispatch(optimizeSearch(input));}
        else { dispatch(loadTrendingGifs());}
    }

    return <div className={`header header-${type}`}>
        <div>
            <h3 className={"logo" + " "+`logo-${type}`}>Gifhy Store</h3>
        </div>
        <input className="input" onChange={handleGifChange} placeholder="search gifs ..."/>
        <label className="switch">
            <input type="checkbox" onChange={(e)=>console.log(e)||themeToggle()} checked={type=='dark'? true:false}/>
            <span className="slider round"></span>
        </label>
    </div>
}

export default Header;
