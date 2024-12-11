import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function ReviewTable(product) {
    console.log("product >>>>>>>>> ", product)
    const rows = [{...product.product}];
    console.log("rows >>>>>>>>> ", rows)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>製品</TableCell>
            <TableCell>製品名</TableCell>
            <TableCell align="right">単価</TableCell>
            <TableCell align="right">量</TableCell>
            <TableCell align="right">小計</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                  <img src={`/assets/img/products/${row.img}`} alt="Product Image" style={{width:"100%", height:"auto"}} />
              </TableCell>
              <TableCell>{row.intro}</TableCell>
              <TableCell align="right">{Number(row.price)}</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">{ccyFormat(Number(row.price))}</TableCell>
            </TableRow>
           ))}
          <TableRow>
            <TableCell align="right" colSpan={4}>合計</TableCell>
            <TableCell align="right">{ccyFormat(Number(rows[0].price))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
