// 1. We wrap everything in an async function, so we can use "await"
async function fetchAndDisplayData() {

    // 2. Grab the empty container ehich have class="dashboard" from our html
    const dashboardContainer = document.getElementById('dashboard-container');

    try {

        // 3. We make a request to the backend,To Fetch the JSON data from OUR backend server
        // We need to Make sure our node server.js is running in the terminal
        const response = await fetch('http://localhost:3000/api/status');
        //converting the response to json and storing in to data
        const data = await response.json();

        // 4. Clear the loading text, which is "Loading API Status"
        dashboardContainer.innerHTML = '';

        // 5. Loop through each API result and create a visual card
        for (let api of data) {
            // JavaScript shortcut for an if/else statement. It's called as Ternary Operator.
            // The ? means: If YES, do the first thing. 
            // The : means: If NO (else), do the second thing. 
            const statusClass = api.status === 'PASS' ? 'Status:pass' : 'Status:fail';
            const statusIcon = api.status === 'PASS' ? '✅' : '❌';

            const cardHTML = `
            <div class="api-card">
                <h2>${api.api_name}</h2>
                <div class="status-badge ${statusClass}">
                    ${statusIcon} ${api.status}
                </div>
                <p class="time">Response Time: ${api.response_time_ms} ms</p>
                <p class="time" style="margin-top: 10px; font-size: 12px;">
                    Last Checked: ${api.timestamp}
                </p>
            </div>`;

            //adding the created card to our dashboard container
            dashboardContainer.innerHTML += cardHTML;
        }
    }
    catch (error) {
        console.error("Error fetching data:", error);
        dashboardContainer.innerHTML = `
        <p style = "color: #ff7b72; font-size: 18px;">
        Failed to connect to the API server.<br>
        Make sure the file 'server.js' is running in your terminal!
        </p>`;
    }

}

fetchAndDisplayData();

setInterval(fetchAndDisplayData, 5000);