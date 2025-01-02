// import { useState } from "react";
// import axios from "axios";

// function CsvQueryComponent() {
//   const [csvFile, setCsvFile] = useState(null);
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setCsvFile(e.target.files[0]);
//   };

//   const handleQueryChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSubmit = async () => {
//     if (!csvFile || !query) {
//       alert("Please upload a CSV file and enter a query.");
//       return;
//     }

//     setLoading(true);
//     setResult(null); // Clear previous results

//     const formData = new FormData();
//     formData.append("csvFile", csvFile);
//     formData.append("query", query);

//     try {
//       const response = await axios.post("/api/query", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResult(response.data);
//       console.log(response.data);
      
//     } catch (error) {
//       console.error("Error executing query:", error);
//       setResult({ error: "Error executing query." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to render table headers dynamically based on the result data
//   const renderTableHeader = () => {
//     if (!result || result.error) return null;
//     const headers = Object.keys(result[0]);
//     return (
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th key={index}>{header}</th>
//           ))}
//         </tr>
//       </thead>
//     );
//   };

//   // Function to render table rows based on the result data
//   const renderTableRows = () => {
//     if (!result || result.error) return null;
//     return result.map((row, rowIndex) => (
//       <tr key={rowIndex}>
//         {Object.values(row).map((value, colIndex) => (
//           <td key={colIndex}>{value}</td>
//         ))}
//       </tr>
//     ));
//   };

//   return (
//     <div>
//       <input 
//         type="file" 
//         onChange={handleFileChange} 
//         disabled={loading} 
//       />
//       <textarea
//         value={query}
//         onChange={handleQueryChange}
//         placeholder="Enter DuckDB query"
//         disabled={loading}
//       />
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Running Query..." : "Run Query"}
//       </button>

//       {result && !result.error && (
//         <div>
//           <h3>Query Results:</h3>
//           <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
//             {renderTableHeader()}
//             <tbody>{renderTableRows()}</tbody>
//           </table>
//         </div>
//       )}

//       {result && result.error && (
//         <div>
//           <h3>Error:</h3>
//           <p>{result.error}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CsvQueryComponent;

import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

function CsvQueryComponent() {
  const [csvFile, setCsvFile] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    if (!csvFile || !query) {
      alert("Please upload a CSV file and enter a query.");
      return;
    }

    setLoading(true);
    setResult(null); // Clear previous results

    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("query", query);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/query`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error executing query:", error);
      setResult({ error: "Error executing query." });
    } finally {
      setLoading(false);
    }
  };

  const renderTableHeader = () => {
    if (!result || result.error) return null;
    const headers = Object.keys(result[0]);
    return (
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableCell key={index} sx={{ fontWeight: "bold", textAlign: "center" }}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderTableRows = () => {
    if (!result || result.error) return null;
    return result.map((row, rowIndex) => (
      <TableRow key={rowIndex}>
        {Object.values(row).map((value, colIndex) => (
          <TableCell key={colIndex} sx={{ textAlign: "center" }}>
            {value}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          DuckDB sql Query Interface
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            component="label"
            sx={{ marginRight: 2 }}
            disabled={loading}
          >
            Upload CSV File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Typography variant="body1">
            {csvFile ? `Selected file: ${csvFile.name}` : "No file selected"}
          </Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter Sql DuckDB query"
          disabled={loading}
          sx={{ marginBottom: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
          sx={{ marginBottom: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : "Run Query"}
        </Button>
        {result && !result.error && (
          <TableContainer
            component={Paper}
            sx={{
              marginTop: 4,
              maxHeight: 400,
              overflow: "auto",
              borderRadius: 2,
            }}
          >
            <Table stickyHeader>
              {renderTableHeader()}
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
          </TableContainer>
        )}
        {result && result.error && (
          <Typography
            variant="body1"
            color="error"
            sx={{ marginTop: 3, textAlign: "center" }}
          >
            {result.error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default CsvQueryComponent;
