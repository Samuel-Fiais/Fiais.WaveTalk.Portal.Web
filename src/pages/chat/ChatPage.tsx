import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { Add, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import { useGetChatRoomsUser } from "../../hooks/services/chat-room/useGetChatRoomsUser";
import { getMessagesByChatRoom, GetMessagesByChatRoomResponse } from "../../requests/message/getMessagesByChatRoom";
import { useAuthService } from "../../hooks/services/authenticate/useAuthService";
import { UserInfo } from "../../common/UserInfo";
import { ChatRoomList } from "./components/ChatRoomList";

// const messagesMock = [
//   {
//     id: 1,
//     text: 'Olá, tudo bem?',
//     date: new Date("2021-10-10T10:00:00"),
//     user: {
//       id: 1,
//       name: 'João'
//     }
//   },
//   {
//     id: 2,
//     text: 'Tudo ótimo e você?',
//     date: new Date("2021-10-10T10:01:00"),
//     user: {
//       id: 2,
//       name: 'Maria'
//     }
//   },
//   {
//     id: 3,
//     text: 'Tudo ótimo e você?',
//     date: new Date("2021-10-11T19:01:00"),
//     user: {
//       id: 2,
//       name: 'Maria'
//     }
//   }
// ]

// const userInfo?.id = 1

export const ChatPage = () => {
  const {
    data: chatRooms,
    isLoading,
    refetch
  } = useGetChatRoomsUser();
  const [chatRoomId, setChatRoomId] = useState('');
  const [messages, setMessages] = useState([] as GetMessagesByChatRoomResponse);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const { getInfoToken } = useAuthService();

  useEffect(() => {
    const fetch = async () => {
      if (chatRoomId) {
        const response = await getMessagesByChatRoom(chatRoomId);
        setMessages(response);
      }
    }

    fetch();
  }, [chatRoomId]);

  useEffect(() => {
    const info = getInfoToken();
    setUserInfo(info);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        handleSendMessage();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleSendMessage = () => {
    setMessages([
      ...messages,
      {
        id: Math.random().toString(),
        content: newMessage,
        userId: userInfo?.id || '',
        username: userInfo?.name || '',
        createdAt: new Date().toISOString()
      }
    ]);
    setNewMessage('');
  };

  const groupMessagesByDate = () => {
    const groupedMessages: Record<string, GetMessagesByChatRoomResponse> = {};
    messages.forEach((message) => {
      const dateKey = new Date(message.createdAt).toLocaleDateString('pt-BR');
      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }
      groupedMessages[dateKey].push(message);
    });
    return groupedMessages;
  };

  return (
    <Box display="flex" sx={{ height: '100vh' }}>
      <ChatRoomList
        chatRooms={chatRooms}
        chatRoomId={chatRoomId}
        setChatRoomId={setChatRoomId}
      />
      <Box
        sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        padding={2}
      >
        <Box
          sx={{ width: '100%', height: '100%', overflowY: 'auto' }}
        >
          {Object.entries(groupMessagesByDate()).map(([date, messagesByDate]) => (
            <div key={date}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}>
                <Box sx={{
                  marginBottom: 2,
                  backgroundColor: grey[200],
                  padding: 1,
                  borderRadius: 4,
                }}>
                  <Typography variant="caption">{date}</Typography>
                </Box>
              </Box>
              {
                messagesByDate.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.userId === userInfo?.id ? 'flex-end' : 'flex-start',
                      marginBottom: 1,
                      height: 'fit-content'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        marginLeft: userInfo?.id === message.userId ? 0 : 1,
                        marginRight: userInfo?.id === message.userId ? 1 : 0,
                      }}
                    >
                      {userInfo?.id === message.userId ? 'Você' : message.username}
                    </Typography>
                    <Box
                      sx={{
                        borderRadius: 4,
                        padding: 2,
                        backgroundColor: message.userId === userInfo?.id ? 'primary.main' : grey[200],
                        color: message.userId === userInfo?.id ? '#fff' : '#000',
                        maxWidth: '70%',
                      }}
                    >
                      <Typography variant="body1">{message.content}</Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        marginTop: 1,
                        marginLeft: userInfo?.id === message.userId ? 0 : 1,
                        marginRight: userInfo?.id === message.userId ? 1 : 0,
                        color: grey[600]
                      }}>
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                ))
              }
            </div>
          ))}
        </Box>
        <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center', position: 'sticky', bottom: 0 }}>
          <TextField
            placeholder="Digite sua mensagem"
            helperText="Pressione Ctrl + Enter para enviar"
            type="text"
            multiline
            maxRows={4}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            fullWidth
            variant="outlined"
            size="medium"
          />
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            startIcon={<Send />}
            sx={{ marginLeft: 2, height: 0 }}
          >
            Enviar
          </Button> */}
        </Box>
      </Box>
    </Box >
  )
}
