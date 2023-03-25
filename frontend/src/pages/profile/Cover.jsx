import { useCallback, useRef, useState, useEffect } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { uploadImages } from "../../functions/uploadImages";
import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import OldCovers from './OldCovers';

const Cover = ({ cover, visitor, photos}) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const [error, setError] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const menuRef = useRef(null);
  const refInput = useRef(null);
  const cRef = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useClickOutside(menuRef, () => setShowCoverMenu(false));
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
      setCoverPicture(event.target.result);
    };
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          console.log("IMAN");
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          // console.log("PICCCCC");
          // console.log(img);
          setCoverPicture(img);
          console.log("just show");
        } else {
          // console.log("not show");
          // console.log(img);
          return img; //???????
        }
        return img;
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const coverRef = useRef(null);
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [Window.innerWidth]);

  const updateCoverPicture = async () => {
    try {
      console.log("clicke");
      setLoading(true);
      let img = await getCroppedImage();
      console.log("Blob backed fromgetCroppedImage");
      console.log(img);
      let blob = await fetch(img).then((b) => b.blob());
      console.log(blob);
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      // formData.append("file", img);

      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      // console.log("RESPONSE");
      // console.log(res);
      // console.log(res[0]);
      // console.log(res[0].url);
      const updated_picture = await updateCover(res[0], user.token);

      // console.log("updated_picture");
      // console.log(updated_picture);
      if (updated_picture === "ok") {
        // console.log("INTERN");
        console.log(res[0].url);
        const new_post = await createPost(
          "coverPicture",
          null,
          null,
          res,
          user.id,
          user.token
        );
        console.log(new_post);
        if (new_post === "ok") {
          setLoading(false);
          setCoverPicture("");
          // coverRef.current.src = `url(${res[0]})`;
          console.log("Blob of my CUREENT URL COVER");
          console.log(res[0]);
          console.log(res[0].url);
          // coverRef.current.src = `${res[0].url}`;
          // cRef.current.src = `url(${res[0]})`;
          cRef.current.src = `data:image/png;base64,.base64_encode(${res[0]}).`;
//اینجا مشکلش رو باید حل کنم

          // Cookies.set("user",{
          //   ...user,
          //   picture: res[0],
          // });

          setShow(false);
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_picture);
      }
      console.log("INJA");
      // console.log(blob);
      console.log(img);
     
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            <button className="blue_btn " onClick={() => updateCoverPicture()}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        hidden
        ref={refInput}
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            // cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} className="cover" alt="" ref={cRef} />
      )}
      {!visitor && (
        <div className="udpate_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div className="open_cover_menu_item hover1" onClick={() => setShow(true)}>
                <i className="photo_icon" ></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => refInput.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {
        
        show && <OldCovers photos={photos} setCoverPicture={setCoverPicture} setShow={setShow}/>
      }
    </div>
  );
};

export default Cover;
