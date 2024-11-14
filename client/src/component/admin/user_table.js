import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Pagination } from "@mui/material";
import { axiosData } from "../../util/api";

const columns = [
  { value: "id", minW: "20px" },
  { value: "フルネーム", minW: "60px" },
  { value: "メール", minW: "50px" },
  { value: "電話番号", minW: "60px" },
  { value: "パスワード", minW: "75px" },
  { value: "amazon", minW: "50px" },
  { value: "", minW: "50px" },
];

function UserTable() {
  const [page, setPage] = useState(1);
  const [proData, setProData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    try {
      const result = await axiosData("/getUser", {
        page: page,
        count: 10,
      });

      setProData(result.result);
      setTotalPages(result.totalPage);
    } catch (err) {}
  };

  const handleChange = (event, value) => {
    setPage(value);
    getData();
  };

  const removeProductHandler = async (id) => {
    await axiosData("/delUser", {
      id: id,
    });
    getData();
  };

  return (
    <Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
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
              {proData.length ? (
                proData.map((element, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {(page - 1) * 10 + idx + 1}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.email}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.phone}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.pwd}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {element.amazon}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <DeleteIcon
                        sx={{
                          color: "#d34444",
                          cursor: "pointer",
                          paddingInline: "5px",
                        }}
                        onClick={() => removeProductHandler(element.id)}
                      />
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

export default UserTable;
