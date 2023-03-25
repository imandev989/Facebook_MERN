import "./style.css";
import { useRef, useState } from "react";
import UpdateProfilePicture from "./UploadProfilePicture";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector } from "react-redux";

const ProfilePicture = ({ username, setShow, pRef, photos }) => {
  const popup = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  // useClickOutside(popup, () => setShow(false));
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="postBox pictureBox" ref={popup}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={(prevstate) => setShow(!prevstate)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar" >
          <h4>Your Profile Pictures</h4>
          <div className="old_pictures">
            <div className="profile_card_contents">
              {photos.length &&
                photos.slice(0, 7).map((photo) =>
                  // console.log("photo");
                  // console.log(photo);
                  photo.images.map((image) => (
                    <div className="profile_card_content">
                      <img src={image} alt="" key={photo.id} onClick={()=>setImage(image)}></img>
                    </div>
                    // console.log("image")
                    // console.log(image);
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setError={setError}
          setShow={setShow}
          pRef={pRef}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
