import React, { useState } from "react";
import {
  Container,
  Button,
  Collapse,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Faq() {
  const handleToggle = (idx) => {
    var _openArr = [false, false, false, false, false, false, false, false];
    _openArr[idx] = true;
    setOpenArr([..._openArr]);
  };

  const [openArr, setOpenArr] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <Container
      sx={{
        paddingTop: "30px",
        paddingBottom: "50px",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        FAQ
      </Typography>
      {openArr.map((element, idx) => (
        <Box sx={{ paddingInline: "30px" }}>
          <Box
            variant="contained"
            color="info"
            onClick={() => handleToggle(idx)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: `"Noto Sans JP", sans- serif !important`,
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              製品の写真サイズはどのように設定するのが良いですか？
            </Typography>
            {element ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          <Divider />
          <Collapse in={element}>
            <Typography
              sx={{
                fontFamily: `"Noto Sans JP", sans- serif !important`,
                fontSize: "15px",
                marginTop: "20px",
                paddingInline: "20px",
              }}
            >
              会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介
            </Typography>
          </Collapse>
          <Typography
            sx={{
              fontFamily: `"Noto Sans JP", sans- serif !important`,
              fontSize: "15px",
              marginTop: "20px",
              paddingInline: "15px",
            }}
          ></Typography>
        </Box>
      ))}
    </Container>
  );
}

export default Faq;
