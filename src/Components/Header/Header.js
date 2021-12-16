import "./header.css";
import ThemeContext from "../../themeContext";
import { useContext } from "react";


function Header(){
    const {type, themeToggle} =  useContext(ThemeContext);

    const handleGifChange = (e)=>{
        const input = e.currentTarget.value;
        console.log(input);
    }
    return <div className={`header header-${type}`}>
        <div>
            <h3 className={"logo" + " "+`logo-${type}`}>Gifhy Store</h3>
        </div>
        <input className="input" onChange={handleGifChange} placeholder="search gifs ..."/>
        <label className="switch">
            <input type="checkbox" onChange={themeToggle} checked={type=='dark'? true:false}/>
            <span className="slider round"></span>
        </label>
    </div>
}

export default Header;
