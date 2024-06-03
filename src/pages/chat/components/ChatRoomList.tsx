import { Box, Typography, TextField, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { GetChatRoomsUserResponse } from "../../../requests/chat-room/getChatRoomsUser";
import { SidebarActions } from "./SidebarActions";
import { Lock } from "@mui/icons-material";
import { useEffect, useState } from "react";

type ChatRoomListProps = {
  chatRooms: GetChatRoomsUserResponse;
  chatRoomId: string;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setChatRoomId: (chatRoomId: string) => void;
};

export const ChatRoomList = ({
  chatRooms,
  chatRoomId,
  isLoading,
  isOpen,
  setIsOpen,
  setChatRoomId,
}: ChatRoomListProps) => {
  const [search, setSearch] = useState("");
  const [chatRoomView, setChatRoomView] = useState<GetChatRoomsUserResponse>(
    []
  );

  useEffect(() => {
    if (search) {
      const filteredChatRooms = chatRooms.filter((chatRoom) =>
        chatRoom.description.toLowerCase().includes(search.toLowerCase())
      );
      setChatRoomView(filteredChatRooms);
    } else {
      setChatRoomView(chatRooms);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (chatRooms) {
      setChatRoomView(chatRooms);
    }
  }, [chatRooms]);

  return (
    <Box
      sx={{
        display: { xs: isOpen ? "block" : "none", lg: "block" },
        width: 300,
        height: "100%",
        overflow: "auto",
        padding: 2,
        borderRight: "1px solid #ccc",
        transition: "width 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SidebarActions />
      </Box>
      <TextField
        label="Nome da Sala"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
      />
      <Box sx={{ marginTop: 2 }}>
        {chatRoomView.length > 0 && !isLoading ? (
          chatRoomView.map((chatRoom) => (
            <Box
              key={chatRoom.id}
              component="div"
              onClick={() => {
                setChatRoomId(chatRoom.id);
                setIsOpen(false);
                localStorage.setItem("chatRoomId", chatRoom.id);
              }}
              sx={{
                padding: 2,
                borderRadius: 4,
                backgroundColor:
                  chatRoom.id === chatRoomId ? "primary.main" : grey[100],
                color: chatRoom.id === chatRoomId ? "#fff" : grey[600],
                marginBottom: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "#fff",
                },
                "&:active": {
                  backgroundColor: "primary.dark",
                  color: "#fff",
                },
                transition: "background-color 0.1s",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">{chatRoom.description}</Typography>
                {chatRoom.isPrivate && <Lock sx={{ height: 20 }} />}
              </Box>
              <Typography variant="caption">{chatRoom.alternateId}</Typography>
            </Box>
          ))
        ) : !isLoading ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body1">Nenhuma sala encontrada</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Skeleton variant="rounded" width="100%" height={75} />
            <Skeleton variant="rounded" width="100%" height={75} />
            <Skeleton variant="rounded" width="100%" height={75} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
