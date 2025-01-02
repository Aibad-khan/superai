// const express = require("express");
// const multer = require("multer");
// const duckdb = require("duckdb");
// const path = require("path");

// const app = express();
// const port = 3001;

// // Set up multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save uploaded files in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
//   },
// });

// const upload = multer({ storage });

// // Initialize DuckDB in memory
// const db = new duckdb.Database(":memory:");

// // API endpoint to handle the query and CSV upload
// app.post("/api/query", upload.single("csvFile"), (req, res) => {
//   console.log("Received a request to /api/query"); // Log to confirm request is received
//   console.log("File:", req.file); // Log file details
//   console.log("Query:", req.body.query); // Log the query entered
  
//   const { query } = req.body;
//   const csvFilePath = req.file.path;

// //   db.all(
// //     `CREATE TABLE csv_sales_data AS SELECT * FROM read_csv_auto('${csvFilePath}');`,
// //     (err) => {
// //       if (err) {
// //         console.error("Error loading CSV into DuckDB:", err); // Log error if CSV loading fails
// //         return res.status(500).json({ error: "Error loading CSV into DuckDB" });
// //       }

// //       db.all(query, (err, rows) => {
// //         if (err) {
// //           console.error("Error executing query:", err); // Log error if query execution fails
// //           return res.status(500).json({ error: "Error executing query" });
// //         }

// //         console.log("Query results:", rows); // Log the query result
// //         const serializedRows = rows.map(row => {
// //             const newRow = {};
// //             for (const key in row) {
// //               newRow[key] = (typeof row[key] === 'bigint') ? row[key].toString() : row[key];
// //             }
// //             return newRow;
// //           });
// //         res.json(serializedRows); // Send result back to frontend
// //       });
// //     }
// //   );



// //if able already exists condition is handles
// // Check if the table already exists
// // db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='csv_sales_data';`, (err, result) => {
// //     if (err) {
// //       console.error("Error checking if table exists:", err);
// //       return res.status(500).json({ error: "Error checking table existence" });
// //     }
  
// //     if (result.length === 0) {
// //       // If table doesn't exist, create it from the CSV file
// //       db.all(
// //         `CREATE TABLE csv_sales_data AS SELECT * FROM read_csv_auto('${csvFilePath}');`,
// //         (err) => {
// //           if (err) {
// //             console.error("Error loading CSV into DuckDB:", err);
// //             return res.status(500).json({ error: "Error loading CSV into DuckDB" });
// //           }
  
// //           // After creating the table, run the query
// //           runQuery();
// //         }
// //       );
// //     } else {
// //       // If the table already exists, just run the query
// //       runQuery();
// //     }
// //   });
  
// //   // Function to run the query
// //   function runQuery() {
// //     db.all(query, (err, rows) => {
// //       if (err) {
// //         console.error("Error executing query:", err);
// //         return res.status(500).json({ error: "Error executing query" });
// //       }
  
// //       console.log("Query results:", rows);
// //       const serializedRows = rows.map(row => {
// //         const newRow = {};
// //         for (const key in row) {
// //           newRow[key] = (typeof row[key] === 'bigint') ? row[key].toString() : row[key];
// //         }
// //         return newRow;
// //       });
// //       res.json(serializedRows);
// //     });
// //   }



// // Extract table name from the CSV filename (without extension)


// // Get the original filename (without the extension)


// // Get the original filename (without the extension)
// //wrong code below
// const csvFileName = path.basename(req.file.originalname, path.extname(req.file.originalname)); // This will give 'sales_data' from 'sales_data.csv'

// // Check if the table exists
// db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='${csvFileName}';`, (err, result) => {
//   if (err) {
//     console.error("Error checking if table exists:", err);
//     return res.status(500).json({ error: "Error checking table existence" });
//   }

//   if (result.length === 0) {
//     // If table doesn't exist, create it from the CSV file
//     db.all(
//       `CREATE TABLE ${csvFileName} AS SELECT * FROM read_csv_auto('${req.file.path}');`,
//       (err) => {
//         if (err) {
//           console.error("Error loading CSV into DuckDB:", err);
//           return res.status(500).json({ error: "Error loading CSV into DuckDB" });
//         }

//         // After creating the table, run the query
//         runQuery(csvFileName);
//       }
//     );
//   } else {
//     // If the table already exists, just run the query
//     runQuery(csvFileName);
//   }
// });

// // Function to run the query
// function runQuery(tableName) {
//   db.all(`SELECT * FROM ${tableName};`, (err, rows) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json({ error: "Error executing query" });
//     }

//     console.log("Query results:", rows);
//     const serializedRows = rows.map(row => {
//       const newRow = {};
//       for (const key in row) {
//         newRow[key] = (typeof row[key] === 'bigint') ? row[key].toString() : row[key];
//       }
//       return newRow;
//     });
//     res.json(serializedRows);
//   });
// }



  
// });

// // Serve the app on the specified port
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });











// const express = require("express");
// const multer = require("multer");
// const duckdb = require("duckdb");
// const path = require("path");

// const app = express();
// const port = 3001;

// // Set up multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save uploaded files in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
//   },
// });

// const upload = multer({ storage });

// // Initialize DuckDB in memory
// const db = new duckdb.Database(":memory:");

// // API endpoint to handle the query and CSV upload
// app.post("/api/query", upload.single("csvFile"), (req, res) => {
//   console.log("Received a request to /api/query");
//   console.log("File:", req.file);
//   console.log("Query:", req.body.query);

//   const { query } = req.body;
//   const csvFilePath = req.file.path;

//   // Load CSV into DuckDB with the table name 'csv_sales_data'
//   db.all(
//     `CREATE TABLE csv_sales_data AS SELECT * FROM read_csv_auto('${csvFilePath}');`,
//     (err) => {
//       if (err) {
//         console.error("Error loading CSV into DuckDB:", err);
//         return res.status(500).json({ error: "Error loading CSV into DuckDB" });
//       }

//       // Execute the query
//       console.log('yes1');
      
//       db.all(query, (err, rows) => {
//         if (err) {
//           console.error("Error executing query:", err);
//           return res.status(500).json({ error: "Error executing query" });
//         }
      
//         console.log("Query result:", rows);
      
//         // Convert BigInt to Number or String
//         const serializedRows = rows.map(row => {
//           const newRow = {};
//           for (const key in row) {
//             newRow[key] = (typeof row[key] === 'bigint') ? row[key].toString() : row[key];
//           }
//           return newRow;
//         });
      
//         console.log("Serialized result:", serializedRows);
      
//         // Send the serialized response
//         return res.json(serializedRows); // Now the response is serializable
//       });
      
      
      
//       console.log('yes');
      
//     }
//   );
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });





//works only for sales_data.csv file name is imp
// const express = require("express");
// const multer = require("multer");
// const duckdb = require("duckdb");
// const path = require("path");

// const app = express();
// const port = 3001;

// // Set up multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save uploaded files in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
//   },
// });

// const upload = multer({ storage });

// // Initialize DuckDB in memory
// const db = new duckdb.Database(":memory:");

// // API endpoint to handle the query and CSV upload
// app.post("/api/query", upload.single("csvFile"), (req, res) => {
//   console.log("Received a request to /api/query"); // Log to confirm request is received
//   console.log("File:", req.file); // Log file details
//   console.log("Query:", req.body.query); // Log the query entered

//   const { query } = req.body;
//   const csvFilePath = req.file.path;
//   const csvFileName = path.basename(req.file.originalname, path.extname(req.file.originalname)); // Get the filename without the .csv extension

//   // Check if the table exists
//   db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='${csvFileName}';`, (err, result) => {
//     if (err) {
//       console.error("Error checking if table exists:", err);
//       return res.status(500).json({ error: "Error checking table existence" });
//     }

//     if (result.length === 0) {
//       // If table doesn't exist, create it from the CSV file
//       db.all(
//         `CREATE TABLE ${csvFileName} AS SELECT * FROM read_csv_auto('${csvFilePath}');`,
//         (err) => {
//           if (err) {
//             console.error("Error loading CSV into DuckDB:", err);
//             return res.status(500).json({ error: "Error loading CSV into DuckDB" });
//           }

//           // After creating the table, run the query
//           runQuery(csvFileName, query, res);
//         }
//       );
//     } else {
//       // If the table already exists, just run the query
//       runQuery(csvFileName, query, res);
//     }
//   });
// });

// // Function to run the query
// function runQuery(tableName, query, res) {
//   db.all(query.replace("csv_sales_data", tableName), (err, rows) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json({ error: "Error executing query" });
//     }

//     console.log("Query results:", rows);
//     const serializedRows = rows.map(row => {
//       const newRow = {};
//       for (const key in row) {
//         newRow[key] = (typeof row[key] === 'bigint') ? row[key].toString() : row[key];
//       }
//       return newRow;
//     });
//     res.json(serializedRows);
//   });
// }

// // Serve the app on the specified port
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


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
// app.use(cors());
const corsOptions = {
  origin: process.env.URL, // Replace with your front-end URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json())
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save uploaded files in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
//   },
// });

// const upload = multer({ storage });

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


  // try {
  //   const csvFilePath = req.file.path;
  //   const columnNames = await extractColumnNames(csvFilePath);
  //   console.log("Column names:", columnNames);

  //   // Proceed with further logic (e.g., creating DuckDB table and running queries)
  // } catch (error) {
  //   console.error("Error extracting column names:", error);
  //   return res.status(500).json({ error: "Error extracting column names" });
  // }

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

      // Call OpenAI API to convert the query to DuckDB SQL
      // const completion = await openai.chat.completions.create({
      //     model: "gpt-4o-mini",
      //     messages: [
      //         { role: "system", content: "You are a helpful assistant." },
      //         { role: "user", content: `Convert this natural language query to DuckDB SQL: ${query}` },
      //     ],
      // });
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

// const express = require("express");
// const multer = require("multer");
// const duckdb = require("duckdb");
// const path = require("path");

// const app = express();
// const port = 3001;

// // Set up multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save uploaded files in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
//   },
// });

// const upload = multer({ storage });

// // Initialize DuckDB in memory
// const db = new duckdb.Database(":memory:");

// // API endpoint to handle the query and CSV upload
// app.post("/api/query", upload.single("csvFile"), (req, res) => {
//   console.log("Received a request to /api/query");
//   console.log("File:", req.file);
//   console.log("Query:", req.body.query);

//   const { query } = req.body;
//   const csvFilePath = req.file.path;
//   const tableName = path.basename(req.file.originalname, path.extname(req.file.originalname)); // Extract filename without extension

//   // Check if the table already exists
//   db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`, (err, result) => {
//     if (err) {
//       console.error("Error checking if table exists:", err);
//       return res.status(500).json({ error: "Error checking table existence" });
//     }

//     if (result.length === 0) {
//       // If table doesn't exist, create it from the CSV file
//       db.all(`CREATE TABLE ${tableName} AS SELECT * FROM read_csv_auto('${csvFilePath}');`, (err) => {
//         if (err) {
//           console.error("Error loading CSV into DuckDB:", err);
//           return res.status(500).json({ error: "Error loading CSV into DuckDB" });
//         }

//         // After creating the table, run the query
//         runQuery(tableName, query, res);
//       });
//     } else {
//       // If the table already exists, run the query directly
//       runQuery(tableName, query, res);
//     }
//   });
// });

// // Function to run the query
// function runQuery(tableName, query, res) {
//   db.all(query, (err, rows) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json({ error: "Error executing query" });
//     }

//     console.log("Query results:", rows);
//     const serializedRows = rows.map(row => {
//       const newRow = {};
//       for (const key in row) {
//         newRow[key] = (typeof row[key] === 'bigint') ? row[key].toString() : row[key];
//       }
//       return newRow;
//     });
//     res.json(serializedRows);
//   });
// }

// // Serve the app on the specified port
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
