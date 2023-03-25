import { Return, Search } from "../../svg";
import { useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import { useEffect } from "react";


const SearchMenu = ({ color, setShowSearchMenu }) => {
  const [iconVisible, setIconVisibe] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search-wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search facebook"
            ref={input}
            onFocus={() => {
              setIconVisibe(false);
            }}
            onBlur={() => {
              setIconVisibe(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
};

export default SearchMenu;
