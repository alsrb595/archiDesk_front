"use client";

import BoardItem from "@/components/BoardItem";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface PostProps {
  postId: number;
  img: string;
  writer: string;
  job: string;
  user: { job: { userJob: string } };
}

const Boards = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumnail] = useState<File | null>(null);
  const [post, setPost] = useState<PostProps[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const onClickAddDesk = () => {
    setModal(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumnail(e.target.files[0]);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/boards`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Get 실패", error);
    }
  };

  const onClickModalSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", localStorage.getItem("userId") || "");
      formData.append("writer", localStorage.getItem("user") || "");
      formData.append("title", title);
      formData.append("content", content);
      if (thumbnail) {
        formData.append("file", thumbnail);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/boards/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPost((prevPosts) => [...prevPosts, response.data]);
      fetchAllPosts();
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
      setModal(false);
    } catch (error) {
      console.error("Post 실패", error);
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
    fetchAllPosts();
  }, []);

  const onClickPost = (id: number) => {
    router.push(`boards/${id}`);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleDeletePost = (postId: number) => {
    setPost(post.filter((p) => p.postId !== postId));
  };

  console.log(process.env.NEXT_PUBLIC_BACKEND_HOSTNAME);
  return (
    <BoardsWrapper>
      {modal && (
        <AddModal>
          <ModalHeader>ModalHeader</ModalHeader>
          <ModalBody>
            <DataBundle>
              <Subtext>Title</Subtext>
              <DataInput
                placeholder="Enter your title"
                onChange={handleTitleChange}
              />
            </DataBundle>
            <DataBundle>
              <Subtext>Content</Subtext>
              <DataTextarea
                placeholder="Enter your content"
                onChange={handleContentChange}
              />
            </DataBundle>
            <DataBundle>
              <Subtext>Image</Subtext>
              <ImageUploadInput
                type="file"
                accept="image/*"
                placeholder="Enter your image"
                onChange={handleThumbnailChange}
              />
              <ThumbnailPreview>
                {thumbnail && (
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="thumbnail Preview"
                  />
                )}
              </ThumbnailPreview>
            </DataBundle>
            <DataSubmit onClick={onClickModalSubmit}>Submit</DataSubmit>
          </ModalBody>
        </AddModal>
      )}
      <Header>
        <HeaderLeft>
          <Logo>Boards</Logo>
          <SubText>Show your desk</SubText>
        </HeaderLeft>
        <HeaderRight>
          <AddDesk onClick={onClickAddDesk}>Add Desk</AddDesk>
          <MenuButton onClick={toggleSidebar}>Menu</MenuButton>
        </HeaderRight>
      </Header>
      {openSidebar && (
        <SidebarOverlay onClick={toggleSidebar}>
          <Sidebar onClick={(e) => e.stopPropagation()}>
            <SidebarContent>
              <CloseButton onClick={toggleSidebar}>&times;</CloseButton>
              <SidebarLink href="/">Home</SidebarLink>
              <SidebarLink href="boards">Boards</SidebarLink>
              <SidebarLink href="desk">Desk</SidebarLink>
              <SidebarLink href="monitor">Monitor</SidebarLink>
              <SidebarLink href="keyboard">Keyboard</SidebarLink>
              <SidebarLink href="mouse">Mouse</SidebarLink>
            </SidebarContent>
          </Sidebar>
        </SidebarOverlay>
      )}
      <BoardItems>
        {post.map((post) => (
          <BoardItem
            key={post.postId}
            postId={post.postId}
            userImage={post.img}
            userName={post.writer}
            userJob={post.user?.job?.userJob || "Unknown"}
            onClickPost={() => onClickPost(post.postId)}
            onDelete={() => handleDeletePost(post.postId)}
          />
        ))}
      </BoardItems>
    </BoardsWrapper>
  );
};

export default Boards;

const BoardsWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f8f9;
  border-radius: 15px;
  padding: 30px 30px;
  color: #4b4b4a;
  overflow-y: auto;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const Logo = styled.div`
  font-size: 50px;
  color: #787878;
  cursor: pointer;
`;

const SubText = styled.div`
  font-size: 20px;
  color: #a6a39f;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AddDesk = styled.div`
  padding: 10px;
  font-size: 24px;
  font-weight: 700;
  background-color: #4b4b4a;
  border-radius: 10px;
  color: #f7f8f9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const BoardItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
`;

const AddModal = styled.div`
  width: 500px;
  background-color: #ccc;
  border-radius: 15px;
  position: absolute;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  right: 30px;
  top: 120px;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 45px;
  padding: 30px 20px;
  font-size: 24px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: #4c4c4c;
  color: #f7f8f9;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ModalBody = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const DataBundle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Subtext = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #4c4c4c;
`;

const DataInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #f7f8f9;
  border: none;
  border-radius: 10px;
  color: #4c4c4c;
`;

const DataTextarea = styled.input`
  width: 100%;
  padding: 10px;
  resize: none;
  background-color: #f7f8f9;
  border-radius: 10px;
  border: none;
  color: #4c4c4c;
`;

const ImageUploadInput = styled.input`
  font-size: 14px;
  color: #303033;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  transition: border 0.3s;
  background-color: #ccc;

  &:focus {
    border: 1px solid #ff812e;
  }
`;

const ThumbnailPreview = styled.div`
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e1e1e3;
    margin-bottom: 20px;
  }
  border: none;
`;

const DataSubmit = styled.div`
  width: fit-content;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  background-color: #4c4c4c;
  color: #f7f8f9;
  border-radius: 10px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
`;
