import { useSelector } from "react-redux";
import { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";
const OldCovers = ({ photos, setCoverPicture, setShow }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("PHOTOS");
  console.log(photos);

  const Ref = useRef(null);
  useClickOutside(Ref, () => setShow(false));
  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={Ref}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Your Profile Pictures</h4>
          <div className="old_pictures">
            <div className="profile_card_contents">
              {photos.length &&
                photos.slice(0, 7).map((photo) =>
                  // console.log("photo");
                  // console.log(photo);
                  photo.images.map((image) => (
                    <div className="profile_card_content">
                      <img
                        src={image}
                        alt=""
                        key={photo.id}
                        onClick={() => {
                          setCoverPicture(image);
                          setShow(false);
                        }}
                      ></img>
                    </div>
                    // console.log("image")
                    // console.log(image);
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCovers;
