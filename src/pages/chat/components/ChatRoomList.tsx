import { Box, Typography, TextField, Skeleton } from "@mui/material"
import { grey } from "@mui/material/colors"
import { GetChatRoomsUserResponse } from "../../../requests/chat-room/getChatRoomsUser"
import { SidebarActions } from "./SidebarActions"

type ChatRoomListProps = {
  chatRooms: GetChatRoomsUserResponse,
  chatRoomId: string,
  isLoading: boolean,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  setChatRoomId: (chatRoomId: string) => void,
}

export const ChatRoomList = ({
  chatRooms,
  chatRoomId,
  isLoading,
  isOpen,
  setIsOpen,
  setChatRoomId,
}: ChatRoomListProps) => {
  return (
    <Box sx={{
      display: { xs: isOpen ? 'block' : 'none', lg: 'block' },
      height: '100%',
      padding: 2,
      borderRight: '1px solid #ccc',
      transition: 'width 0.3s ease-in-out',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SidebarActions />
      </Box>
      <TextField
        label="Nome da Sala"
        fullWidth
        margin="normal"
      />
      <Box sx={{ marginTop: 2 }}>
        {
          chatRooms.length > 0 && !isLoading ? chatRooms.map((chatRoom) => (
            <Box
              key={chatRoom.id}
              component="div"
              onClick={() => {
                setChatRoomId(chatRoom.id);
                setIsOpen(false);
              }}
              sx={{
                padding: 2,
                borderRadius: 4,
                backgroundColor: chatRoom.id === chatRoomId ? 'primary.main' : grey[100],
                color: chatRoom.id === chatRoomId ? '#fff' : '#000',
                marginBottom: 1,
                cursor: 'pointer',
                "&:hover": {
                  backgroundColor: 'primary.light',
                  color: '#fff'
                },
                "&:active": {
                  backgroundColor: 'primary.dark',
                  color: '#fff'
                },
                transition: 'background-color 0.1s'
              }}
            >
              <Typography variant="body1">{chatRoom.description}</Typography>
            </Box>
          )) : !isLoading ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1">Nenhuma sala encontrada</Typography>
            </Box>
          ) : (
            <Box sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <Skeleton variant="rounded" width="100%" height={50} />
              <Skeleton variant="rounded" width="100%" height={50} />
              <Skeleton variant="rounded" width="100%" height={50} />
            </Box>
          )
        }
      </Box>
    </Box>
  )
}
