import React, { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface BoardItemProps {
  postId: number;
  userImage: string;
  userName: string;
  userJob: string;
  onClickPost: (id: number) => void;
  onDelete: () => void;
}

const BoardItem: React.FC<BoardItemProps> = ({
  postId,
  userImage,
  userName,
  userJob,
  onClickPost,
  onDelete,
}) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const longPressTimeout = useRef<number | null>(null);

  const handleMouseDown = () => {
    longPressTimeout.current = window.setTimeout(() => {
      setIsLongPress(true);
      handleLongPress();
    }, 800); // 800ms를 길게 누른 것으로 간주
  };

  const handleMouseUp = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const handleLongPress = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#484848",
      cancelButtonColor: "#D6D1CB",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/boards/${postId}`
          );
          onDelete();
          MySwal.fire("Deleted!", "Your post has been deleted.", "success");
        } catch (error) {
          MySwal.fire(
            "Error!",
            "There was an error deleting your post.",
            "error"
          );
        }
      }
    });
  };

  return (
    <ItemWrapper
      onClick={() => onClickPost(postId)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()} // 우클릭 메뉴를 막음
    >
      <DeskImage src="/assets/deskSetup.png" alt="Desk" />
      <UserImageWrapper>
        <UserImage src={userImage} alt={userName} />
      </UserImageWrapper>
      <UserInfo>
        <UserName>{userName}</UserName>
        <UserJob>{userJob}</UserJob>
      </UserInfo>
    </ItemWrapper>
  );
};

export default BoardItem;

const ItemWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 350px;
  margin: 10px;
`;

const DeskImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const UserImageWrapper = styled.div`
  position: absolute;
  top: 53px;
  left: 120px;
  width: 163px;
  height: 99px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const UserInfo = styled.div`
  position: absolute;
  top: 250px;
  left: 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #484848;
`;

const UserJob = styled.div`
  font-size: 16px;
  color: #83807e;
`;
