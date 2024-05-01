import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import { useGetChatRoomsUser } from "../../hooks/services/chat-room/useGetChatRoomsUser";
import {
  getMessagesByChatRoom,
  GetMessagesByChatRoomResponse,
} from "../../requests/message/getMessagesByChatRoom";
import { useAuthService } from "../../hooks/services/authenticate/useAuthService";
import { UserInfo } from "../../common/UserInfo";
import { ChatRoomList } from "./components/ChatRoomList";
import { ChatMessages } from "./components/ChatMessages";
import { useAppSelector } from "../../redux/store";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { Menu, Send } from "@mui/icons-material";
import { chatApi } from "../../config/api";
import { useDispatch } from "react-redux";
import { setConnection } from "../../redux/connection/slice";

export const ChatPage = () => {
  const { data: chatRooms, isLoading } = useGetChatRoomsUser();
  const [chatRoomId, setChatRoomId] = useState("");
  const [messages, setMessages] = useState([] as GetMessagesByChatRoomResponse);
  const [groupedMessages, setGroupedMessages] = useState<
    Record<string, GetMessagesByChatRoomResponse>
  >({});
  const [newMessage, setNewMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [scrollMode, setScrollMode] = useState<"smooth" | "instant">("instant");
  const [isOpen, setIsOpen] = useState(false);

  const conn = useAppSelector((state) => state.connectionReducer.connection);
  const dispatch = useDispatch();

  const { getInfoToken } = useAuthService();

  const handleSendMessage = () => {
    const send = async () => {
      if (conn?.state == HubConnectionState.Disconnected) await conn?.start();
      await conn?.invoke("SendMessage", newMessage, chatRoomId);
      setNewMessage("");
    };

    send();
  };

  const groupMessagesByDate = (
    messagesParam?: GetMessagesByChatRoomResponse | null
  ) => {
    const groupedMessages: Record<string, GetMessagesByChatRoomResponse> = {};
    (messagesParam ?? messages).forEach((message) => {
      const dateKey = new Date(message.createdAt).toLocaleDateString("pt-BR");
      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }
      groupedMessages[dateKey].push(message);
    });
    setIsLoadingMessages(false);
    return groupedMessages;
  };

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setScrollMode("smooth");
    const fetch = async () => {
      if (chatRoomId) {
        setIsLoadingMessages(true);
        const response = await getMessagesByChatRoom(chatRoomId);
        setMessages(response);
        setGroupedMessages(groupMessagesByDate(response));
        setIsLoadingMessages(false);
      }
    };

    fetch();
  }, [chatRoomId]);

  useEffect(() => {
    const fetch = async () => {
      const info = getInfoToken();
      setUserInfo(info);

      let _conn = null;
      if (conn === null) {
        _conn = new HubConnectionBuilder().withUrl(chatApi).build();

        dispatch(setConnection(_conn));
      }

      const connUse = conn ?? _conn;

      if (connUse?.state == HubConnectionState.Disconnected)
        await connUse?.start();

      const user = getInfoToken();
      await connUse?.invoke("JoinChat", user?.id);

      connUse?.on(
        "ReceiveMessage",
        (message: {
          id: string;
          userId: string;
          username: string;
          content: string;
          createdAt: string;
        }) => {
          setScrollMode("smooth");
          message.username =
            chatRooms
              ?.find((chatRoom) => chatRoom.id === chatRoomId)
              ?.users.find((user) => user.id === message.userId)?.name || "";
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      );
    };

    fetch();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setChatRoomId("");
      setMessages([]);
    }
  }, [isLoading]);

  useEffect(() => {
    setGroupedMessages(groupMessagesByDate());
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSendMessage();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <Box
        display="flex"
        sx={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <ChatRoomList
          chatRooms={chatRooms}
          chatRoomId={chatRoomId}
          isLoading={isLoading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setChatRoomId={setChatRoomId}
        />
        <Box
          sx={{
            width: "100%",
            display: { xs: isOpen ? "none" : "block", lg: "block" },
          }}
        >
          {isLoadingMessages || isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", height: "100%" }}
            >
              <CircularProgress />
            </Box>
          ) : messages.length === 0 && chatRoomId == "" ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", height: "100%" }}
            >
              <Typography variant="h6" color={grey[500]}>
                Selecione um chat para começar
              </Typography>
            </Box>
          ) : messages.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%", height: "100%" }}
            >
              <Typography variant="h6" color={grey[500]}>
                Nenhuma mensagem encontrada
              </Typography>
            </Box>
          ) : (
            <ChatMessages
              groupMessagesByDate={groupedMessages}
              userInfo={userInfo}
              scrollMode={scrollMode}
            />
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "sticky",
              bottom: 0,
              padding: 2,
              width: "100%",
              backgroundColor: "#fff",
              WebkitBoxShadow: "0px -4px 3px rgba(50, 50, 50, 0.75)",
              MozBoxShadow: "0px -4px 3px rgba(50, 50, 50, 0.75)",
              boxShadow: "5px 0px 15px rgba(50, 50, 50, 0.3);",
            }}
          >
            <TextField
              placeholder="Digite sua mensagem"
              type="text"
              value={newMessage}
              fullWidth
              onChange={(e) => setNewMessage(e.target.value)}
              variant="outlined"
              size="medium"
              disabled={!chatRoomId}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSendMessage();
              }}
              startIcon={<Send />}
              sx={{
                marginLeft: 2,
                height: 55,
                display: { xs: "none", lg: "flex" },
              }}
              disabled={!newMessage || !chatRoomId}
            >
              Enviar
            </Button>
            <IconButton
              color="primary"
              onClick={() => {
                handleSendMessage();
              }}
              sx={{ display: { xs: "block", lg: "none" }, marginLeft: 2 }}
              disabled={!newMessage || !chatRoomId}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          position: "fixed",
          top: 17,
          right: 10,
        }}
        onClick={toggleBox}
      >
        <IconButton
          sx={{
            backgroundColor: "whitesmoke",
            color: "primary",
            "&:hover": {
              backgroundColor: "whitesmoke",
              color: "primary",
            },
          }}
        >
          <Menu />
        </IconButton>
      </Box>
    </>
  );
};
