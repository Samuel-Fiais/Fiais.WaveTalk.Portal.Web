import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  GetChatRoomByCodeResponse,
  getChatRoomByCode,
} from "../../../requests/chat-room/getChatRoomByCode";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useEnterChatRoom } from "../../../hooks/services/user/useEnterChatRoom";
import { useAppSelector } from "../../../redux/store";

type SearchChatRoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

type SearchChatRoomFields = {
  code: string;
  password: string;
};

export const SearchChatRoomModal = ({
  isOpen,
  onClose,
  refetch,
}: SearchChatRoomModalProps) => {
  const form = useForm<SearchChatRoomFields>();
  const conn = useAppSelector((state) => state.connectionReducer.connection);
  const [isLoading, setIsLoading] = useState(false);
  const [chatRoom, setChatRoom] = useState(
    null as GetChatRoomByCodeResponse | null
  );
  const { execute, finish, loading } = useEnterChatRoom();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await getChatRoomByCode(form.getValues("code"));
      setChatRoom(data);
    } catch (error) {
      enqueueSnackbar("Sala não encontrada", { variant: "error" });
      setChatRoom(null);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    execute({
      chatRoomId: chatRoom?.id ?? "",
      password: form.getValues("password"),
    });
  };

  useEffect(() => {
    if (!isOpen) {
      form.setValue("code", "");
      form.setValue("password", "");
      setChatRoom(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (finish) {
      conn?.invoke("RefreshChatRooms");
      form.reset();
      refetch();
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finish]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Pesquisar Sala</DialogTitle>
      <DialogContent>
        <Stack display="flex">
          <Stack width="100%">
            <TextField
              {...form.register("code", {
                required: "Código da sala é obrigatório",
              })}
              label="Código da Sala"
              fullWidth
              margin="normal"
              required
              error={!!form.formState.errors.code}
              helperText={form.formState.errors.code?.message}
            />
          </Stack>
          {chatRoom && (
            <Stack width="100%">
              <TextField
                label="Nome da Sala"
                value={chatRoom.description}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Dono da Sala"
                value={chatRoom.ownerName}
                fullWidth
                margin="normal"
                disabled
              />
              {chatRoom.isPrivate && (
                <TextField
                  {...form.register("password", {
                    required: "Senha da sala é obrigatória",
                  })}
                  label="Senha da Sala"
                  helperText="Sala privada *"
                  type="password"
                  fullWidth
                  margin="normal"
                />
              )}
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          paddingX: 3,
          paddingBottom: 3,
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="end"
          width="100%"
          gap={1}
        >
          <Button onClick={onClose} color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => form.handleSubmit(handleSearch)()}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={27} sx={{ color: "white" }} />
            ) : (
              "Pesquisar"
            )}
          </Button>
          {chatRoom && (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              color="success"
              variant="contained"
              disabled={loading}
            >
              Entrar na Sala
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};
