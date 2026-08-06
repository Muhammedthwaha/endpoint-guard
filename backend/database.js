// 1. This imports the SQLite library we installed
const sqlite3 = require('sqlite3').verbose();

// 2. Create a new database connection
// This will automatically create a file called "health_data.db" in our folder
// "err" means error
const db = new sqlite3.Database('./health_data.db', (err)=>{
    if (err) {
        console.log('Error connecting to the database: ', err.message);
    } else {
        console.log('Successfully connected to the SQLite database.');
    }
});

// 3. Create a table to store our test results
// 'serialize' means we will run our database commands one at a time, in order.
db.serialize(() => {
    // We are creating a table called 'api_health', if it doesn't already exist.
    db.run(`
        CREATE TABLE IF NOT EXISTS api_health (
            id integer primary key autoincrement,
            api_name text not null,
            status text not null,
            response_time_ms integer,
            timestamp datetime default current_timestamp
        )`,
    // Checking if the table creation is succesfull or not.
    (err) => {
        if (err) {
            console.log('Error creating table: ', err.message);
        } else {
            console.log('Table `api_health` is created successfully.');
        }
    });
});

// Exporting this database, so other files can use it.
module.exports = db;