import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container, Pagination, Rating } from "@mui/material";
import { axiosData } from "../../util/api";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const columns = [
  { value: "id", minW: "20px" },
  { value: "はじめに", minW: "60px" },
  { value: "ブランド", minW: "60px" },
  { value: "サイズ", minW: "45px" },
  { value: "カスタマーレビュー", minW: "130px" },
  { value: "価格", minW: "30px" },
  { value: "購入日", minW: "50px" },
  { value: "販売者", minW: "60px" },
  { value: "購入された方", minW: "60px" },
  { value: "クーリングオフ", minW: "130px" },
];

function AdminSellTable() {
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    try {
      const result = await axiosData("/getSellInfo", {
        page: page,
        count: 10,
      });
      console.log(result)
      setDisplayData(result.result);
      setTotalPages(result.totalPage);
    } catch (err) {
      toast.error("サーバー接続時にエラーが発生しました。");
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
    getData();
  };

  return (
    <Container sx={{ paddingBottom: "50px" }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ borderBottom: "1px solid black" }}>
              <TableRow>
                {columns.map((element, idx) => (
                  <TableCell
                    sx={{
                      backgroundColor: "var(--gray)",
                      minWidth: element.minW,
                      textAlign: "center",
                    }}
                    key={idx}
                  >
                    {element.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayData.length ? (
                displayData.map((element, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {(page - 1) * 10 + idx + 1}
                    </TableCell>
                    <TableCell sx={{ width: "80px" }}>
                      <img
                        src={"/assets/img/products/" + element.img}
                        style={{ width: "80px" }}
                      ></img>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.brand}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.sellSize}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Rating
                        value={element.sellReview}
                        readOnly
                        precision={0.5}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.price}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.sellDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.sellUserName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.buyUserName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.coolingOff === 1 ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14}>資料がありません!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          sx={{
            width: "fit-content",
            marginInline: "auto",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />
      </Paper>
    </Container>
  );
}

export default AdminSellTable;
