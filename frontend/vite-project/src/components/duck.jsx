import React, { useEffect, useState } from 'react';
import { DuckDBProvider, useDuckDB } from '@duckdb/react-duckdb';

function DatabaseComponent() {
  const { db, loading, error } = useDuckDB();
  const [data, setData] = useState([]);

  useEffect(() => {
    const executeQueries = async () => {
      if (db) {
        try {
          // Create a connection and execute SQL queries
          const conn = await db.connect();
          await conn.query(`CREATE TABLE users (id INTEGER, name TEXT);`);
          await conn.query(`INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob');`);
          
          const result = await conn.query(`SELECT * FROM users;`);
          setData(result.toArray());
          conn.close();
        } catch (err) {
          console.error('Query Execution Error:', err);
        }
      }
    };

    if (!loading && !error) {
      executeQueries();
    }
  }, [db, loading, error]);

  if (loading) return <p>Loading DuckDB...</p>;
  if (error) return <p>Error initializing DuckDB: {error.message}</p>;

  return (
    <div>
      <h1>DuckDB Data</h1>
      <ul>
        {data.map((row, idx) => (
          <li key={idx}>
            {row.id}: {row.name}
          </li>
        ))}
      </ul>
    </div>
  );
}



export default DatabaseComponent;
