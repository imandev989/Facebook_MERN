import { useEffect } from "react";

export default function useClickOutside(ref, fun) {
  // var a = 11011;
  useEffect(() => {
    // console.log("useEffect1");
    const listener = (e) => {
      if(!ref.current || ref.current.contains(e.target)){
        return;
      }
      fun();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  }, [ref]);
}
