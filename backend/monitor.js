// 1. Import our database so we can results
const db = require('./database.js');

// 2. A list of free, public APIs that we want to monitor
const endpointsToTest = [
    {name: "Pokemon API", url: "https://pokeapi.co/api/v2/pokemon/ditto"},
    {name: "Dog Image API", url: "https://dog.ceo/api/breeds/image/random"}
];

// 3. The main testing function
async function runHealthChecks() {
    console.log("-----------------------------------");
    console.log("Running API Health Checks...");
    
    // Loop over the list of endpoints to test
    for (let endpoint of endpointsToTest){
        // Starting a timer with JS Date.now
        const startTime = Date.now();
        // assume the status is fail, util proven otherwise 
        let status = "FAIL";

        try {
            // Ping the API
            const response = await fetch(endpoint.url);

            // If the status code is from 200 to 299, it's a pass!
            if (response.ok) {
                status = "PASS";
            }
        } catch (error) {
            console.error(`Error reaching ${endpoint.name}:`, error.message);
        }

        // 4. Calculate how long it took in milliseconds
        const responseTime = Date.now() - startTime;

        // 5. save the results into our SQLite database
        /* VALUES (?, ?, ?): These question marks are placeholders. It is a security best practice
        nstead of putting our variables directly into the text (which can cause crashes or security hacks called SQL Injection), we put ?, and tell the database to fill them in safely in the next step.*/
        const query = `INSERT INTO api_health (api_name, status, response_time_ms)
        VALUES (?, ?, ?)`;

        //db.run(...): This is a command provided by the sqlite3 library we installed. It tells the database to actually execute the SQL command we just wrote.
        // (query): The SQL string we created above.
        // ([endpoint.name, status, responseTime]): This is an array of the actual data. The database will take endpoint.name and replace the first ?. It will take status and replace the second ?, and so on
        // ((err) => { ... }): This is a callback function
        db.run(query, [endpoint.name, status, responseTime], (err) => {
            if (err) {
                console.log("Error saving to DB:", err.message);
            } else {
                console.log(`[${status}] ${endpoint.name} responded in ${responseTime}ms`);
            }
        });
    }
}
// Run the check immediately when the file starts
runHealthChecks();

// Automatically run the check every 15 seconds (10000 milliseconds)
setInterval(runHealthChecks, 15000);