import { photosReducer } from "../../functions/reducer";
import { useEffect, useReducer } from "react";
import axios from "axios";

const Photos = ({ user, token, photos }) => {
  // console.log("IMAN");
  // console.log(user);
  // console.log(user.username);

  // const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
  //   loading: false,
  //   photos: {},
  //   error: "",
  // });
  // useEffect(() => {
  //   getPhotos();
  // }, [user]);

  // const getPhotos = async () => {
  //   // console.log(typeof user.id);
  //   try {
  //     dispatch({
  //       type: "PHOTOS_REQUEST",
  //     });
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/listImages`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     dispatch({
  //       type: "PHOTOS_SUCCESS",
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "PHOTOS_ERROR",
  //       payload: error.response.data.message,
  //     });
  //   }
  // };
  // console.log(photos);
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
        {/* <p>{photos[15].images[2]}</p> */}
      </div>
      <div className="profile_card_count">
        {photos.length === 0
          ? ""
          : photos.length === 1
          ? "1 photos"
          : `${photos.length} photos`}
      </div>
      <div className="profile_card_grid"></div>
      {/* <div className="profile_card_contents"> */}
        <div className="profile_card_contents">
          {photos.length &&
            photos.slice(0, 7).map((photo) =>
              // console.log("photo");
              // console.log(photo);
              photo.images.map((image) => (
                <div className="profile_card_content">
                  <img src={image} alt=""></img>
                </div>
                // console.log("image")
                // console.log(image);
              ))
            )}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Photos;
