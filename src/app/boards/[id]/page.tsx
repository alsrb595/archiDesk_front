"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const BoardDetail = () => {
  const postId = useParams();
  const router = useRouter();
  const [postData, setPostData] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const MySwal = withReactContent(Swal);

  const fetchBoardData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/boards/${postId.id}`
      );
      console.log("??", response);
      setPostData(response.data);
      setCommentList(response.data.comments);
    } catch (error) {
      console.error("에러", error);
    }
  };

  const onClickBackImg = () => {
    setModal((prev) => !prev);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const onChangeCommnet = (e: any) => {
    setComment(e.target.value);
  };

  const onClickCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/boards/comment/upload`,
        {
          postId: Number(postId.id),
          writer: localStorage.getItem("user"),
          content: comment,
        }
      );
      MySwal.fire({
        icon: "success",
        title: "Complete!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "swal-custom-popup",
          title: "swal-custom-title",
          htmlContainer: "swal-custom-html-container",
        },
      });
    } catch (error) {
      console.error("comment 등록 실패", error);
      MySwal.fire({
        icon: "error",
        title: "Fail!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "swal-custom-popup",
          title: "swal-custom-title",
          htmlContainer: "swal-custom-html-container",
        },
      });
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [onClickCommentSubmit]);

  return (
    <BoardDetailWrapper>
      <Header>
        <HeaderTitle>{`${localStorage.getItem("user")}'s Desk`}</HeaderTitle>
        <MenuButton onClick={toggleSidebar}>Menu</MenuButton>
      </Header>
      {openSidebar && (
        <SidebarOverlay onClick={toggleSidebar}>
          <Sidebar onClick={(e) => e.stopPropagation()}>
            <SidebarContent>
              <CloseButton onClick={toggleSidebar}>&times;</CloseButton>
              <SidebarLink href="/">Home</SidebarLink>
              <SidebarLink href="/boards">Boards</SidebarLink>
              <SidebarLink href="/recommend">Recommend</SidebarLink>
            </SidebarContent>
          </Sidebar>
        </SidebarOverlay>
      )}
      <DetailBody>
        <LeftWrapper>
          {modal && (
            <Modal>
              <ModalHeader>Information</ModalHeader>
              <ModalBody>
                <Bundle>
                  <Subtext>Desk</Subtext>
                  <Infotext>{localStorage.getItem("desk")}</Infotext>
                </Bundle>
                <Bundle>
                  <Subtext>Monitor</Subtext>
                  <Infotext>{localStorage.getItem("monitor")}</Infotext>
                </Bundle>
                <Bundle>
                  <Subtext>Keyboard</Subtext>
                  <Infotext>{localStorage.getItem("keyboard")}</Infotext>
                </Bundle>
                <Bundle>
                  <Subtext>Mouse</Subtext>
                  <Infotext>{localStorage.getItem("mouse")}</Infotext>
                </Bundle>
              </ModalBody>
            </Modal>
          )}
          <DeskImage src="/assets/deskSetup.png" />
          <BackImage src={postData.img} onClick={onClickBackImg} />
        </LeftWrapper>
        <RightWrapper>
          <RightTop>
            <RightTopHeader>Title</RightTopHeader>
            <RightTopBody>Body</RightTopBody>
          </RightTop>
          <RightBottom>
            <RightBottomHeader>Comment List</RightBottomHeader>
            <RightBottomBody>
              <CommentList>
                {commentList.map((comment, index) => (
                  <ShowComments key={index}>{comment}</ShowComments>
                ))}
              </CommentList>
            </RightBottomBody>
            <RightBottomFooter>
              <CommentInputWrapper>
                <CommentInput
                  placeholder="Enter comment"
                  onChange={onChangeCommnet}
                />
                <CommentSubmit
                  src="/assets/send.png"
                  onClick={onClickCommentSubmit}
                />
              </CommentInputWrapper>
            </RightBottomFooter>
          </RightBottom>
        </RightWrapper>
      </DetailBody>
    </BoardDetailWrapper>
  );
};

export default BoardDetail;

const BoardDetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f8f9;
  border-radius: 15px;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  font-size: 30px;
  color: #4b4b4a;
`;

const MenuButton = styled.div`
  font-size: 1.5em;
  color: #b4c8bb;
  cursor: pointer;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Sidebar = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 250px;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: slideIn 0.3s forwards;

  @keyframes slideIn {
    from {
      right: -250px;
    }
    to {
      right: 0;
    }
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CloseButton = styled.div`
  font-size: 2em;
  align-self: flex-end;
  cursor: pointer;
`;

const SidebarLink = styled.a`
  font-size: 1.2em;
  margin: 10px 0;
  text-decoration: none;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #b4c8bb;
  }
`;

const DetailBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  height: 100%;
`;

const LeftWrapper = styled.div`
  width: 100%;
  height: 90%;
  left: 0px;
  border-radius: 10px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const DeskImage = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BackImage = styled.img`
  width: 340px;
  height: 245px;
  left: 268px;
  top: 140px;
  border-radius: 10px;
  border: none;
  position: absolute;
  cursor: pointer;
`;

const Modal = styled.div`
  width: fit-content;
  right: 70px;
  top: 0px;
  background-color: #d6d1cc;
  position: absolute;
  z-index: 1000;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4c4c4b;
  color: #f7f8f9;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const ModalBody = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Bundle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtext = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #4c4c4b;
`;

const Infotext = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #817f7c;
`;

const RightWrapper = styled.div`
  width: 100%;
  height: 90%;
  right: 0px;
  border-radius: 15px;
  background-color: #d7d1cc;
  display: flex;
  flex-direction: column;
`;

const RightTop = styled.div`
  width: 100%;
  height: 50%;
`;

const RightTopHeader = styled.div`
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #4c4c4b;
  color: #f7f8f9;
  font-size: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const RightTopBody = styled.div`
  width: 100%;
  height: 100%;
  color: #4c4c4b;
  font-size: 18px;
  padding: 30px;
  box-sizing: border-box;
`;

const RightBottom = styled.div`
  width: 100%;
  height: 50%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const RightBottomHeader = styled.div`
  width: 100%;
  height: 20%;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #4c4c4b;
  color: #f7f8f9;
  font-size: 20px;
`;

const RightBottomBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  font-size: 18px;
`;

const CommentList = styled.div`
  width: 100%;
  height: 100%;
  color: #4c4c4b;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ShowComments = styled.div`
  color: #4c4c4b;
`;

const RightBottomFooter = styled.div`
  width: 100%;
  height: 20%;
`;

const CommentInputWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #b4c8bb;
  padding-right: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const CommentInput = styled.input`
  width: 100%;
  border: none;
  color: #4c4c4b;
  font-size: 18px;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: #b4c8bb;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  &::placeholder {
    font-size: 18px;
    color: #4c4c4b;
  }
`;

const CommentSubmit = styled.img`
  width: 30px;
  height: 30px;
`;
