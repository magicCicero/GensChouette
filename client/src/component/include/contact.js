import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const sendMsg = () => {
    if (email === "") {
      toast.error("メールアドレスを入力してください。");
    } else if (subject === "") {
      toast.error("タイトルを入力してください。");
    } else if (content === "") {
      toast.error("内容を入力してください。");
    } else {
      console.log(email, subject, content)
    }
  };

  return (
    <Container
      sx={{
        paddingTop: "30px",
        paddingBottom: "50px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Typography
        sx={{
          fontFamily: `"Noto Sans JP", sans- serif !important`,
          fontSize: "40px",
        }}
      >
        連絡先
      </Typography>
      <Box>
        <TextField
          label="メールアドレス"
          multiline
          maxRows={4}
          variant="standard"
          sx={{
            width: "100%",
            maxWidth: "600px",
          }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Box>
      <Box>
        <TextField
          label="タイトル"
          multiline
          maxRows={4}
          variant="standard"
          sx={{
            width: "100%",
            maxWidth: "600px",
          }}
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
      </Box>
      <Box>
        <TextField
          label="内容を入力してください。"
          multiline
          rows={6}
          sx={{
            width: "100%",
            maxWidth: "600px",
            marginTop: "20px",
          }}
          variant="filled"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--primary)",
          marginTop: "30px",
          width: "300px",
          marginInline: "auto",
          letterSpacing: "8px",
        }}
        size="large"
        onClick={sendMsg}
      >
        送信する
      </Button>
    </Container>
  );
}
