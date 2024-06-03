import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { UserInfo } from "../../../common/UserInfo";
import { GetMessagesByChatRoomResponse } from "../../../requests/message/getMessagesByChatRoom";
import { useEffect, useRef } from "react";

type ChatMessagesProps = {
  groupMessagesByDate: Record<string, GetMessagesByChatRoomResponse>;
  userInfo: UserInfo | null;
  scrollMode: "smooth" | "instant";
};

export const ChatMessages = ({
  groupMessagesByDate,
  userInfo,
  scrollMode,
}: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBottom = (mode: "smooth" | "instant") => {
    if (scrollRef.current) {
      const scrollHeight = scrollRef.current.scrollHeight;
      const clientHeight = scrollRef.current.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      scrollRef.current.scrollTo({
        top: maxScrollTop,
        behavior: mode,
      });
    }
  };

  useEffect(() => {
    scrollBottom(scrollMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollBottom(scrollMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupMessagesByDate]);

  return (
    <Box
      ref={scrollRef}
      sx={{ width: "100%", height: "92%", overflowY: "auto" }}
    >
      <Box paddingY={2} paddingX={{ xs: 2, lg: 4 }}>
        {Object.entries(groupMessagesByDate).map(([date, messagesByDate]) => (
          <div key={date}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  marginBottom: 2,
                  backgroundColor: grey[200],
                  padding: 1,
                  borderRadius: 4,
                }}
              >
                <Typography variant="caption">{date}</Typography>
              </Box>
            </Box>
            {messagesByDate.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.userId === userInfo?.id ? "flex-end" : "flex-start",
                  marginBottom: 3,
                  height: "fit-content",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    marginLeft: userInfo?.id === message.userId ? 0 : 1,
                    marginRight: userInfo?.id === message.userId ? 1 : 0,
                  }}
                >
                  {userInfo?.id === message.userId ? "Você" : message.username}
                </Typography>
                <Box
                  sx={{
                    borderRadius: 4,
                    padding: 2,
                    backgroundColor:
                      message.userId === userInfo?.id
                        ? "primary.main"
                        : grey[200],
                    color: message.userId === userInfo?.id ? "#fff" : "#000",
                    maxWidth: "70%",
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
                    color: grey[600],
                  }}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            ))}
          </div>
        ))}
      </Box>
    </Box>
  );
};
