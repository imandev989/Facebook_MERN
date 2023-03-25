import { useEffect, useRef, useState } from "react";
import "./style.css";
import Picker from "emoji-picker-react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";

import PulseLoader from "react-spinners/ClipLoader";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";

export default function CreatePostPopup({ user, setVisible }) {
  const popup = useRef(null);
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  useClickOutside(popup, () => {
    setVisible(false);
  });
  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response === "ok") {
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);

      ///////******///// */

      const postImages = images.map((img) => {
        //console.log(img);
        // return dataURItoBlob(img);
        return img.file
      });
      // const postImages = images.map((img) => {
      //   console.log(img);
      //   return img;
      // });

      console.log(images);
      console.log(postImages);
      // console.log(user.id);
      // console.log(user.token);
      const path = `${user.username}/uploadImages`;
      // const path = `${process.env.REACT_APP_BACKEND_URL}/uploadImages`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      // console.log("1");
      // console.log(formData);
      // images.map((image) => {
      //   formData.append("file", image);
      // });
      // console.log(formData);
      // console.log("2");
      // console.log(formData);
      // console.log(path);
      // console.log(user.token);
      const response = await uploadImages(formData, path, user.token);
      console.log(response);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      console.log(res);
      setLoading(false);
      if (res === "ok") {
        setText("");
        setImages("");
        setVisible(false);
      } else {
        setError(res);
      }
      // console.log(response);
    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response === "ok") {
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={15} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
