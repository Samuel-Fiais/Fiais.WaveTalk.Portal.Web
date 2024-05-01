import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useCreateChatRoom } from "../../../hooks/services/message/useCreateChatRoom";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../redux/store";

type CreateChartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

type CreateChatRoomFields = {
  description: string;
  password: string;
};

export const CreateChatModal = ({
  isOpen,
  onClose,
  refetch,
}: CreateChartModalProps) => {
  const { execute, finish, loading } = useCreateChatRoom();
  const conn = useAppSelector((state) => state.connectionReducer.connection);

  const form = useForm<CreateChatRoomFields>();

  const onSubmit = (data: CreateChatRoomFields) => {
    execute({
      description: data.description,
      password: data.password,
    });
  };

  useEffect(() => {
    if (finish) {
      conn?.invoke("RefreshChatRooms");
      form.reset();
      refetch();
      onClose();
    }
  }, [finish]);

  useEffect(() => {
    if (!isOpen) {
      form.setValue("description", "");
      form.setValue("password", "");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Adicionar Sala</DialogTitle>
      <DialogContent>
        <Stack display="flex">
          <Stack width="100%">
            <TextField
              {...form.register("description", {
                required: "Nome da sala é obrigatório",
                minLength: {
                  value: 3,
                  message: "Nome da sala deve ter no mínimo 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Nome da sala deve ter no máximo 50 caracteres",
                },
              })}
              label="Nome da Sala"
              fullWidth
              margin="normal"
              required
              error={!!form.formState.errors.description}
              helperText={form.formState.errors.description?.message}
            />
          </Stack>
          <Stack width="100%">
            <TextField
              {...form.register("password")}
              label="Senha da Sala"
              helperText="Deixe em branco para salas públicas"
              type="password"
              fullWidth
              margin="normal"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={27} sx={{ color: "white" }} />
          ) : (
            "Adicionar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
