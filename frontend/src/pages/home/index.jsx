import React, { useRef, useState, useEffect } from "react";

import Header from "../../components/header/index";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import Post from "../../components/post";

const Home = ({ setVisible, posts }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);
  return (
    <div className="home" style={{ height: `${height}px` }}>
      <Header  page="home"/>
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {/* {user.verified === false && <SendVerification user={user} />} */}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user}/>
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
