import { useState, useRef } from 'react';

import ProfilePicture from "../../components/profilePicture";

const ProfilePictureInfos = ({ profile, visitor, photos }) => {
  const pRef = useRef(null);
  const [show, setShow] = useState(false);
  return (

    <div className="profile_img_wrap">
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos}/>}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div className="profile_circle hover1" onClick={() => setShow(true)}>
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            <div className="othername">(Other names)</div>
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {visitor ? (
        ""
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit Profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInfos;
