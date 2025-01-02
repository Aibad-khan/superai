//new code for any table any time query changes new table is created
const express = require("express");
const multer = require("multer");
const duckdb = require("duckdb");
const path = require("path");
const dotenv=require('dotenv')
const  generation =require( "./openai.js");
const cors = require("cors");
const app = express();
const port = process.env.PORT||3001;
dotenv.config();
// Set up multer to handle file uploads
app.use(cors());
app.use(express.json())

//new code for deletion of files stacking up in uploads folder or temp folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempFolder = "temp/"; // Temporary folder
    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder); // Create folder if it doesn't exist
    }
    cb(null, tempFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }, 
});

const upload = multer({ storage });

// Function to delete expired files
// Initialize DuckDB in memory
const db = new duckdb.Database(":memory:");

// Registry to keep track of uploaded tables
const tableRegistry = {};


const fs = require("fs");
const csvParser = require("csv-parser");

function extractColumnNames(filePath) {
  return new Promise((resolve, reject) => {
    const columnNames = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("headers", (headers) => {
        resolve(headers); // Return column names
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
// API endpoint to handle the query and CSV upload
app.post("/api/query", upload.single("csvFile"), async(req, res) => {
  console.log("Received a request to /api/query");
  console.log("File:", req.file);
  console.log("Query:", req.body.query);

  const { query } = req.body;
  const csvFilePath = req.file.path;
  const tableName = `table_${Date.now()}`; // Generate a unique table name for each upload

  // Store the table in the registry
  tableRegistry[tableName] = csvFilePath;

console.log('here before creation of table');


  // Create the table in DuckDB
  db.all(`CREATE TABLE ${tableName} AS SELECT * FROM read_csv_auto('${csvFilePath}');`, (err) => {
    if (err) {
      console.error("Error loading CSV into DuckDB:", err);
      return res.status(500).json({ error: "Error loading CSV into DuckDB" });
    }

    // Replace the placeholder in the query with the table name and run the query
    runQuery(tableName, query, res);
  });
});

// Function to run the query
function runQuery(tableName, query, res) {
  console.log('inside runquery function');
  console.log(query);
  
  if (!query.includes("csv_table")) {
    return res.status(400).json({ error: "Query must include the placeholder 'csv_table'" });
  }

console.log('before query');
const replacedQuery = query.replace(/csv_table/g, tableName);
// const replacedQuery = query?.replace(/table/g, tableName);
console.log('hee');

  db.all(replacedQuery, (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Error executing query" });
    }
console.log('here i am');

    console.log("Query results:", rows);
    const serializedRows = rows.map(row => {
      const newRow = {};
      for (const key in row) {
        newRow[key] = (typeof row[key] === 'bigint') ? row[key].toString() : row[key];
      }
      return newRow;
    });
    res.json(serializedRows);
  });
}

// API endpoint to list uploaded tables
app.get("/api/tables", (req, res) => {
  res.json(Object.keys(tableRegistry));
});

app.get('/',(req,res)=>{
  res.send('hello world')
})
app.post("/api/convert-query", upload.single("file"), async (req, res) => {
  try {
      const { query } = req.body; // Get natural language query from request body

      if (!query) {
          return res.status(400).json({ error: "Query is required." });
      }

      let columnNames=null;
      try {
        const csvFilePath = req.file.path;
         columnNames = await extractColumnNames(csvFilePath);
        console.log("Column names:", columnNames);
    
        // Proceed with further logic (e.g., creating DuckDB table and running queries)
      } catch (error) {
        console.error("Error extracting column names:", error);
        return res.status(500).json({ error: "Error extracting column names" });
      }


      const duckdbQuery=await generation(query,columnNames);

      // const duckdbQuery = completion.choices[0].message.content;

      res.json({ duckdbQuery });
  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Failed to process the request." });
  }
});
// Serve the app on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
