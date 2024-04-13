import { Add, Search } from "@mui/icons-material"
import { Box, Typography, Tooltip, IconButton, TextField } from "@mui/material"
import { grey } from "@mui/material/colors"
import { GetChatRoomsUserResponse } from "../../../requests/chat-room/getChatRoomsUser"

type ChatRoomListProps = {
  chatRooms: GetChatRoomsUserResponse,
  chatRoomId: string,
  setChatRoomId: (chatRoomId: string) => void
}

export const ChatRoomList = ({
  chatRooms,
  chatRoomId,
  setChatRoomId
}: ChatRoomListProps) => {
  return (
    <Box sx={{
      width: '20%',
      display: { xs: 'none', md: 'block' },
      padding: 2,
      borderRight: '1px solid #ccc'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Salas de Chat
        </Typography>
        <Box>
          <Tooltip title="Criar Sala" arrow>
            <IconButton color="success">
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pesquisar Sala" arrow>
            <IconButton color="primary">
              <Search />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <TextField
        label="Nome da Sala"
        fullWidth
        margin="normal"
      />
      <Box sx={{ marginTop: 2 }}>
        {
          chatRooms?.map((chatRoom) => (
            <Box
              key={chatRoom.id}
              component="div"
              onClick={() => setChatRoomId(chatRoom.id)}
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
          ))
        }
      </Box>
    </Box>
  )
}