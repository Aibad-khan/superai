// QueryResultTable.jsx
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";

const QueryResultTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center", mt: 3 }}>
        No data available to display.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        mt: 3,
        overflow: "auto",
        maxHeight: "300px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((key, index) => (
              <TableCell key={index} sx={{ fontWeight: "bold" }}>
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <TableCell key={colIndex}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default QueryResultTable;
