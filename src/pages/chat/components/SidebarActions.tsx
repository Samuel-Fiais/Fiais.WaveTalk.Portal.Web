import { Add, Update, ExitToApp, Search } from "@mui/icons-material"
import { Box, Tooltip, IconButton } from "@mui/material"
import { useAuthService } from "../../../hooks/services/authenticate/useAuthService";
import { useGetChatRoomsUser } from "../../../hooks/services/chat-room/useGetChatRoomsUser";
import { useState } from "react";
import { CreateChatModal } from "./CreateChatModal";

export const SidebarActions = () => {
  const { logout } = useAuthService();
  const { refetch, isLoading } = useGetChatRoomsUser();
  const [isOpenAddChatModal, setIsOpenAddChatModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Tooltip title="Criar Sala" arrow>
          <IconButton color="success" size="small" onClick={() => setIsOpenAddChatModal(true)}>
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="Pesquisar Sala" arrow>
          <IconButton color="primary">
            <Search />
          </IconButton>
        </Tooltip>
        <Tooltip title="Atualizar Salas" arrow>
          <span>
            <IconButton
              color="secondary"
              onClick={() => refetch()}
              disabled={isLoading}
            >

              <Update />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Sair" arrow>
          <IconButton color="error" onClick={logout}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </Box>
      <CreateChatModal
        isOpen={isOpenAddChatModal}
        onClose={() => setIsOpenAddChatModal(false)}
        refetch={refetch}
      />
    </>
  )
}