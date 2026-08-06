// 1. Import our libraries
const express  = require('express'); // The web server framewrok
const cors = require('cors');   // Security feature to allow frontend connections
const db = require('./database.js'); // Our SQLite database

// 2. the app and port 
const app = express();
const PORT = 3000;

// 3. setup middleware
app.use(cors()); // Allows our frontend (which will run on a different port) to talk to us

// 4. Create our API Endpoint
// When someone visits http://localhost:3000/api/status, this function runs
app.get('/api/status', (req, res) => {

    // We only want the most RECENT test result for each API to show on the dashboard.
    // This SQL query finds the highest ID (newest) for each unique API name.
    // WHERE id IN (...), we are telling the database to filter out everything else and only hand us the exact rows whose IDs match.
    const query = `Select api_name, status, response_time_ms, timestamp from api_health
    where id in (select max(id) from api_health group by api_name)`;

    // 5. db.all() grabs MULTIPLE rows of data
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error ("Databse error:", err.message);
            res.status(500).json({error: "Something went wrong" });
        } else {
            // Success! Send the database rows to the browser as JSON data
            // res stands for Response.
            res.json(rows);
        }
    });
});

// app.listen(PORT) tells the server to actually unlock Port 3000 and stay awake forever waiting for visitors
app.listen(PORT, () => {
    console.log(`API Server is running at http://localhost:${PORT}/api/status`);
});