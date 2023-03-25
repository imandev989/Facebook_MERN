import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { profileReducer } from "../../functions/reducer";
import axios from "axios";
import Header from "../../components/header/index";
import "./style.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPost from "./GridPost";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from '../../components/intro/index';

const Profile = ({ setVisible }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  // console.log(username);
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  // console.log(user.username);
  // console.log(user);
  var userName = username === undefined ? user.username : username;
  // console.log("username");
  // console.log(userName);

  // console.log(userName.name);
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);

  var visitor = userName === user.username ? false : true;
  console.log(visitor);
  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,

            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log("IMAGES:::::");
          console.log(images);
          console.log(images.data)
          setPhotos(images.data);
        } catch (error) {
          console.log("ERROR:::::");
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  // console.log(profile);

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} photos={photos}/>
          <ProfilePictureInfos profile={profile} visitor={visitor} photos={photos}/>
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">

                <Intro detailss={profile.details} visitor={visitor}/>                
                {/* <Photos user={user} token={user.token} photos={photos}/> */}
                {console.log("FRIENDS", profile.friends)}
                {profile.friends && <Friends friends={profile.friends} />}
                <div className="relative_fb_copyright">  
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    profile={profile}
                    setVisible={setVisible}
                  />
                )}
                <GridPost />
                <div className="posts">
                  {profile.posts &&
                    profile.posts.length &&
                    profile.posts?.map((post) => (
                      <Post
                        post={post}
                        user={user}
                        key={post._id}
                        profile={profile}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
