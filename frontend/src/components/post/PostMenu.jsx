import MenuItem from "./MenuItem";
import { useState, useRef } from "react";

import clickOutside from "../../helpers/clickOutside";

const PostMenu = ({ postUserId, userId, imagesLength, setShowMenu }) => {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  clickOutside(menu, () => setShowMenu(false));
  return (
    <ul className="post_menu" ref={menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your save items."
      />
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notification for this post"
        />
      )}
      {imagesLength && <MenuItem icon="download_icon" title="Download" />}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off notifications" />}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
};

export default PostMenu;
