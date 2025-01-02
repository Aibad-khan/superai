// import OpenAI from "openai";
// const openai = new OpenAI();
// const env=require('dotnev')

// const generation=async ()=>{
// const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//             role: "user",
//             content: "convert natural language to duckdb sql ",
//         },
//     ],
// });

// console.log(completion.choices[0].message);
// }

const OpenAI =require ("openai");
const  dotenv =require("dotenv");
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use the environment variable to get api key
});

const generation = async (query,columnNames) => {
    const columnNamesString = columnNames.join(", ");
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: ` The available columns in the table separated by comma are: ${columnNamesString}.Convert this natural language query to DuckDB SQL (give only the sql query and use table name as your_table_name and nothing else ,no explanation): ${query}` },
        ],
    });
    res=completion.choices[0].message.content;
    console.log(completion.choices[0].message.content);
    // console.log(res);
    const match=res.match(/```sql\n([\s\S]*?)\n```/);//regex whatever is between \n \n is taken as query
    let sql_query = '';
    if (match) {
        sql_query = match[1].trim(); // The captured SQL query is in match[1] trimming left and right spaces
    }
    
    
    sql_query = sql_query.replace('your_table_name', 'csv_table'); // Replace 'your_table_name' with 'csv_table'
    // ans = ans.replace(/your_table_name/g, 'csv_table'); // Replace 'your_table_name' with 'csv_table'
    // console.log(ans);
    
    console.log(sql_query); 
    return sql_query;
};

// export default generation;
module.exports = generation;

