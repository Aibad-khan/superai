import  { useState } from "react";
import { Switch, TextField, Button, Typography, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
// import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import "./Homepage2.css"; // Custom CSS for styling
// import CsvQueryComponent from "./Homepage";
import axios from "axios";
import Papa from "papaparse";
import QueryResultTable from "./QueryResultTable";
import CsvQueryComponent from "./Homepage";
// import DuckDBQueryInterface from "./Homepage";

function Homepage2() {
  const [isDuckDB, setIsDuckDB] = useState(true);
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [queryResult, setQueryResult] = useState(null);
  const [showData, setShowData] = useState(false);
  
  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    // setFile(acceptedFiles[0]);
  

  Papa.parse(uploadedFile, {
    header: true, // First row treated as headers
    skipEmptyLines: true,
    complete: (result) => {
      setCsvData(result.data);
    },
  });
};

const handleToggle = () => {
    setShowData((prev) => !prev);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Predefined Queries
  const predefinedQueries = [
    "Show me the top 5 customers by quantity sold in descending order  ",
    "Calculate total quantities",
    "List all details above quantity 20",
  ];

  const handleQueryClick = (queryText) => {
    setQuery(queryText);
    
  };

  const handleSubmit = async() => {
    console.log("Query:", query);
    console.log("File:", file);
    
    try {
        // Prepare FormData to send both query and file
        let formData = new FormData();
        formData.append("query", query);  // Add the query
        if (file) {
          formData.append("file", file); // Add the file if selected
        }
    
        // Send the POST request to the backend
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/convert-query`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",  // Important for file uploads
          },
        });
    
        // Handle the response (duckdbQuery returned from the backend)
        const { duckdbQuery } = response.data;
        console.log("DuckDB Queryy:", duckdbQuery);

        const newformData = new FormData();
        newformData.append("query", duckdbQuery);  // Add the query
        if (file) {
          newformData.append("csvFile", file); // Add the file if selected
        }

        // console.log("FormData Content:");
        // for (let [key, value] of newformData.entries()) {
        // console.log(`${key}:`, value);
        // }

        const response2=await axios.post(`${import.meta.env.VITE_API_URL}/api/query`,newformData, {
            headers: {
              "Content-Type": "multipart/form-data",  // Important for file uploads
            },});

        setQueryResult(response2.data);

        console.log(response2.data);
            

      } catch (error) {
        console.error("Error during submit:", error.message);
      }

      //post request for actual execution of query on duckdb database

    
  };

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     minHeight: "100vh",
    //     backgroundColor: "#f9f9f9",
    //     padding: "20px",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       maxWidth: 700,
    //       width: "100%",
    //       background: "#ffffff",
    //       boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    //       borderRadius: "12px",
    //       padding: "30px",
    //     }}
    //   >
    //     {/* Header */}
    //     <Box
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       sx={{ mb: 3 }}
    //     >
    //       <Typography variant="h6" sx={{ fontWeight: "bold" }}>
    //         DuckDB
    //       </Typography>
    //       <Switch
    //         checked={isDuckDB}
    //         onChange={() => setIsDuckDB((prev) => !prev)}
    //       />
    //     </Box>

    //     {isDuckDB ? (
    //       <>
    //         {/* Title */}
    //         <Typography
    //           variant="h4"
    //           sx={{
    //             textAlign: "center",
    //             fontWeight: "bold",
    //             color: "#333",
    //             mb: 1,
    //           }}
    //         >
    //           DuckDB Query Interface
    //         </Typography>
    //         <Typography
    //           variant="body1"
    //           sx={{
    //             textAlign: "center",
    //             color: "#666",
    //             mb: 3,
    //           }}
    //         >
    //           Analyze your data using natural language queries
    //         </Typography>

    //         {/* Predefined Query Buttons */}
    //         <Box
    //           sx={{
    //             display: "flex",
    //             flexWrap: "wrap",
    //             justifyContent: "center",
    //             gap: "10px",
    //             mb: 3,
    //           }}
    //         >
    //           {predefinedQueries.map((queryText, index) => (
    //             <Button
    //               key={index}
    //               variant="outlined"
    //               onClick={() => handleQueryClick(queryText)}
    //               sx={{
    //                 textTransform: "none",
    //                 color: "#333",
    //                 borderColor: "#ccc",
    //               }}
    //             >
    //               {queryText}
    //             </Button>
    //           ))}
    //         </Box>

    //         {/* Query Input */}
    //         <TextField
    //           fullWidth
    //           variant="outlined"
    //           placeholder="Enter your natural language query..."
    //           value={query}
    //           onChange={(e) => setQuery(e.target.value)}
    //           sx={{
    //             mb: 3,
    //             "& .MuiOutlinedInput-root": {
    //               borderRadius: "8px",
    //             },
    //           }}
    //         />

    //         {/* File Upload Section */}
    //         <Box
    //           {...getRootProps()}
    //           sx={{
    //             border: "2px dashed #ccc",
    //             borderRadius: "8px",
    //             padding: "20px",
    //             textAlign: "center",
    //             mb: 3,
    //             cursor: "pointer",
    //             "&:hover": {
    //               backgroundColor: "#f5f5f5",
    //             },
    //           }}
    //         >
    //           <input {...getInputProps()} />
    //           {file ? (
    //             <Typography>{file.name}</Typography>
    //           ) : (
    //             <Typography color="#666">
    //               Click or drag a file to upload
    //             </Typography>
    //           )}
    //         </Box>

    //         {/* Submit Button */}
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           fullWidth
    //           onClick={handleSubmit}
    //           sx={{
    //             textTransform: "none",
    //             padding: "10px 0",
    //             backgroundColor: "#007bff",
    //             "&:hover": {
    //               backgroundColor: "#0056b3",
    //             },
    //           }}
    //         >
    //           Submit Query
    //         </Button>
    //       </>
    //     ) : (
    //       <>
    //         {/* Alternative Component When Switch Is Toggled */}
    //         <Typography
    //           variant="h4"
    //           sx={{
    //             textAlign: "center",
    //             fontWeight: "bold",
    //             color: "#333",
    //             mb: 3,
    //           }}
    //         >
    //           Alternate Component
    //         </Typography>
    //         <Typography
    //           variant="body1"
    //           sx={{ textAlign: "center", color: "#666", mb: 3 }}
    //         >
    //           <CsvQueryComponent/>
    //         </Typography>
    //       </>
    //     )}
    //   </Box>
    // </Box>
    <Box
      sx={{
        display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",minHeight: "100vh",backgroundColor: "#f9f9f9",padding: "20px",
      }}
    >
      <Box
        sx={{
          maxWidth: 700,width: "100%",background: "#ffffff",boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",borderRadius: "12px",padding: "30px",
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            DuckDB
          </Typography>
          <Switch checked={isDuckDB} onChange={() => setIsDuckDB((prev) => !prev)} />
        </Box>

        {isDuckDB ? (
          <>
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#333", mb: 1 }}>
              Natural language Query Interface
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", color: "#666", mb: 3 }}>
              Analyze your data using natural language queries
            </Typography>

            {/* Predefined Query Buttons */}
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", mb: 3 }}>
              {predefinedQueries.map(
                (queryText, index) => (
                  <Button key={index} variant="outlined" onClick={() => handleQueryClick(queryText)} sx={{ textTransform: "none", color: "#333", borderColor: "#ccc" }}>
                    {queryText}
                  </Button>
                )
              )}
            </Box>

            {/* Query Input */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your natural language query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />

            {/* File Upload Section */}
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                mb: 3,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <input {...getInputProps()} />
              {file ? (
                <Typography>{file.name}</Typography>
              ) : (
                <Typography color="#666">Click or drag a file to upload</Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          Show Data
        </Typography>
        <Switch checked={showData} onChange={handleToggle} />
      </Box>
            {/* Display CSV Data */}
            {showData && csvData.length > 0 && (
              <Box
                sx={{
                  overflow: "auto",
                  maxHeight: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(csvData[0]).map((key, index) => (
                        <TableCell key={index} sx={{ fontWeight: "bold" }}>
                          {key}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {csvData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                          <TableCell key={colIndex}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                padding: "10px 0",
                backgroundColor: "#007bff",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              Submit Query
            </Button>
            {queryResult!=null?
            <div>
                <p >Result</p>
                <QueryResultTable data={queryResult} /> 
            </div>
            :null}
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#333", mb: 3 }}>
              
              <CsvQueryComponent/>  
              {/* <DuckDBQueryInterface/> */}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Homepage2;
