import { Routes, Route } from "react-router-dom";
import CreatePostPopup from "./components/createPostPopup";
import Home from "./pages/home";
import Login from "./pages/login/index";
import Profile from "./pages/profile/index";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

// import Home from './svg/home';
import { useSelector } from "react-redux";
import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { postsReducer } from './functions/reducer';


const App = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Baerer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  // console.log(posts);
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile setVisible={setVisible}/>} exact />
          <Route path="/profile/:username" element={<Profile setVisible={setVisible}/>} exact />
          <Route path="/" element={<Home setVisible={setVisible} posts={posts}/>} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
