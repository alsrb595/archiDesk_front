"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [job, setJob] = useState("");
  const [desk, setDesk] = useState("");
  const [monitor, setMonitor] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [mouse, setMouse] = useState("");

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedName = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    if (storedName && storedUserId) {
      setDisplayName(storedName);
      setUserId(storedUserId);
    }

    if (searchParams) {
      const name = searchParams.get("displayName");
      const userId = searchParams.get("userId");

      if (name && userId) {
        setDisplayName(name);
        setUserId(userId);
        localStorage.setItem("user", name);
        localStorage.setItem("userId", userId);
        router.replace("/");
      }
    }
  }, [searchParams, router]);

  const onClickLogin = () => {
    window.location.href = "http://localhost:3001/auth/google/callback";
  };

  const onClickWelcome = () => {
    setOpenModal((prev) => !prev);
  };

  const onClickSubmit = async () => {
    localStorage.setItem("job", job);
    localStorage.setItem("desk", desk);
    localStorage.setItem("monitor", monitor);
    localStorage.setItem("keyboard", keyboard);
    localStorage.setItem("mouse", mouse);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/job`,
      {
        userId: userId,
        userJob: job,
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

    setOpenModal(false);
  };

  const onChangeJob = (e: any) => {
    setJob(e.target.value);
  };

  const onChangeDesk = (e: any) => {
    setDesk(e.target.value);
  };

  const onChangeMonitor = (e: any) => {
    setMonitor(e.target.value);
  };

  const onChangeMouse = (e: any) => {
    setMouse(e.target.value);
  };

  const onChangeKeyboard = (e: any) => {
    setKeyboard(e.target.value);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <InnerCard>
      <Header>
        <Logo>archiDesk</Logo>
        {displayName ? (
          <WelcomeMessage onClick={onClickWelcome}>
            {localStorage.getItem("job")
              ? `${localStorage.getItem("job")}, ${displayName}`
              : `Welcome, ${displayName}`}
          </WelcomeMessage>
        ) : (
          <Login onClick={onClickLogin}>Google Login</Login>
        )}
      </Header>
      {openSidebar && (
        <SidebarOverlay onClick={toggleSidebar}>
          <Sidebar onClick={(e) => e.stopPropagation()}>
            <SidebarContent>
              <CloseButton onClick={toggleSidebar}>&times;</CloseButton>
              <SidebarLink href="">Home</SidebarLink>
              <SidebarLink href="boards">Boards</SidebarLink>
              <SidebarLink href="recommend">Recommend</SidebarLink>
            </SidebarContent>
          </Sidebar>
        </SidebarOverlay>
      )}
      {openModal && (
        <Modal>
          <ModalBundle>
            <ModalTitle>Enter your job</ModalTitle>
            <ModalInput placeholder="Enter your job" onChange={onChangeJob} />
          </ModalBundle>
          <ModalBundle>
            <ModalTitle>Enter your Desk</ModalTitle>
            <ModalInput placeholder="Enter your desk" onChange={onChangeDesk} />
          </ModalBundle>
          <ModalBundle>
            <ModalTitle>Enter your Monitor</ModalTitle>
            <ModalInput
              placeholder="Enter your monitor"
              onChange={onChangeMonitor}
            />
          </ModalBundle>
          <ModalBundle>
            <ModalTitle>Enter your Keyboard</ModalTitle>
            <ModalInput
              placeholder="Enter your keyboard"
              onChange={onChangeKeyboard}
            />
          </ModalBundle>
          <ModalBundle>
            <ModalTitle>Enter your Mouse</ModalTitle>
            <ModalInput
              placeholder="Enter your mouse"
              onChange={onChangeMouse}
            />
          </ModalBundle>
          <ModalButton onClick={onClickSubmit}>Submit</ModalButton>
        </Modal>
      )}
      <MenuButton onClick={toggleSidebar}>Menu</MenuButton>
      <Gallery>
        <Photo src="/assets/main1.png" alt="main1" />
        <Photo src="/assets/main2.png" alt="main2" />
        <Photo src="/assets/main3.png" alt="main3" />
        <Photo src="/assets/main4.png" alt="main4" />
        <Photo src="/assets/main5.png" alt="main5" />
        <Photo src="/assets/main6.png" alt="main6" />
        <Photo src="/assets/main7.png" alt="main7" />
        <Photo src="/assets/main8.png" alt="main8" />
        <Photo src="/assets/main9.png" alt="main9" />
        <Photo src="/assets/main10.png" alt="main10" />
        <Photo src="/assets/main11.png" alt="main11" />
        <Photo src="/assets/main12.png" alt="main12" />
        <Photo src="/assets/main13.png" alt="main13" />
        <Photo src="/assets/main14.png" alt="main14" />
        <Photo src="/assets/main15.png" alt="main15" />
        <Photo src="/assets/main16.png" alt="main16" />
        <Photo src="/assets/main17.png" alt="main17" />
        <Photo src="/assets/main18.png" alt="main18" />
        <Photo src="/assets/main19.png" alt="main19" />
        <Photo src="/assets/main20.png" alt="main20" />
      </Gallery>
    </InnerCard>
  );
};

export default Home;

const Header = styled.div`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.div`
  font-size: 1.5em;
  color: #b4c8bb;
  cursor: pointer;
  position: absolute;
  right: 30px;
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

const InnerCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f8f9;
  border-radius: 15px;
  padding: 30px 30px;
  position: relative;
  overflow-y: auto;
`;

const Logo = styled.div`
  font-size: 50px;
  color: #787878;
  cursor: pointer;
`;

const Login = styled.div`
  font-size: 1.5em;
  color: #787878;
  position: absolute;
  right: 30px;
  cursor: pointer;
`;

const WelcomeMessage = styled.div`
  position: absolute;
  right: 30px;
  font-size: 30px;
  color: #787878;
  cursor: pointer;
`;

const Modal = styled.div`
  position: absolute;
  right: 30px;
  top: 80px;
  width: 400px;
  background-color: #e3e2e1;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1000;
  margin-top: 10px;
`;

const ModalBundle = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #787878;
  margin-bottom: 15px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 700;
  color: #787878;
  background-color: #f7f8f9;
  border: none;
  border-radius: 10px;

  &::placeholder {
    font-size: 18px;
    font-weight: 700;
    color: #787878;
  }
`;

const ModalButton = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  color: #f7f8f9;
  background-color: #4a4a4a;
  margin-top: 15px;
  border-radius: 10px;
  border: none;
  padding: 10px 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  padding: 30px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 10px;
  width: 100%;
`;

const Photo = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border: 5px solid #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;
