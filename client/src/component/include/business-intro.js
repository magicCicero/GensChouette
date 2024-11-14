import * as React from "react";
import { Box, Container, Divider, Typography } from "@mui/material";

const introTxt = {
  business: [
    "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
    "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
    "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
  ],
  product: [
    {
      title:
        "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
      content: [
        "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
        "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
        "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
      ],
    },
    {
      title:
        "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
      content: [
        "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
        "会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介",
      ],
    },
  ],
};

export default function BusinessIntro() {
  return (
    <Container
      sx={{
        paddingTop: "30px",
        paddingBottom: "50px",
      }}
    >
      <Typography
        sx={{
          fontFamily: `"Noto Sans JP", sans- serif !important`,
          fontSize: "25px",
          fontWeight: "bold",
          paddingInline: "5px",
        }}
      >
        企業紹介
      </Typography>
      <Divider />
      {introTxt.business.map((element, idx) => (
        <Typography
          sx={{
            fontFamily: `"Noto Sans JP", sans- serif !important`,
            fontSize: "15px",
            marginTop: "20px",
            paddingInline: "15px",
          }}
        >
          {element}
        </Typography>
      ))}
      <Typography
        sx={{
          fontFamily: `"Noto Sans JP", sans- serif !important`,
          fontSize: "25px",
          fontWeight: "bold",
          paddingInline: "5px",
          marginTop: "30px",
        }}
      >
        製品紹介
      </Typography>
      <Divider />
      {introTxt.product.map((element, idx) => (
        <Box sx={{ paddingInline: "30px" }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography
              sx={{
                fontFamily: `"Noto Sans JP", sans- serif !important`,
                fontSize: "15px",
                marginTop: "20px",
              }}
            >
              {idx + 1}.
            </Typography>
            <Typography
              sx={{
                fontFamily: `"Noto Sans JP", sans- serif !important`,
                fontSize: "15px",
                marginTop: "20px",
              }}
            >
              {element.title}
            </Typography>
          </Box>
          {element.content.map((ele, jdx) => (
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontFamily: `"Noto Sans JP", sans- serif !important`,
                  fontSize: "15px",
                  marginTop: "20px",
                  paddingLeft: "20px",
                  paddingRight: "15px",
                }}
              >
                {jdx + 1})
              </Typography>
              <Typography
                sx={{
                  fontFamily: `"Noto Sans JP", sans- serif !important`,
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介会社紹介
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Container>
  );
}
