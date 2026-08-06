# 🛡️ EndpointGuard

**EndpointGuard** is a full-stack operational monitoring dashboard that automates functional health checks for HTTP APIs. It simulates real-time operations management workflows by constantly pinging critical endpoints, logging response times to a database, and displaying the live status on a sleek frontend dashboard.

## ✨ Features
- **Automated Health Checks**: A background monitor script that autonomously pings external APIs on a set interval.
- **Data Persistence**: Uses SQLite to permanently log API status (`PASS`/`FAIL`) and response times.
- **RESTful API**: A custom Node.js/Express backend that securely serves the latest health data.
- **Dynamic Dashboard**: A responsive, dark-mode frontend that injects live data into the DOM using vanilla JavaScript and Flexbox.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Frontend:** HTML5, CSS3 (Flexbox), Vanilla JavaScript
- **Libraries:** CORS (Cross-Origin Resource Sharing)

---

## 📂 Project Structure

```text
EndpointGuard/
│
├── backend/
│   ├── server.js          # The Express API server that serves data to the frontend
│   ├── monitor.js         # The QA bot that pings external APIs and logs to the DB
│   ├── database.js        # Configures and connects to the SQLite database
│   ├── package.json       # Manages Node.js dependencies
│
└── frontend/
    ├── index.html         # The structure of the dashboard
    ├── style.css          # Dark-mode styling and Flexbox layout
    ├── app.js             # JavaScript that fetches backend data and updates the UI
```
## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

---

## ⚙ Installation & Setup

1. **Clone the repository and navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install the required dependencies:**
   ```bash
   npm install express sqlite3 cors
   ```
   > **Note:** `express` builds the server, `sqlite3` talks to the database, and `cors` allows the frontend to talk to the backend safely.

3. **Initialize the Database:**
   Run the database script to create the `.db` file and the `api_health` table:
   ```bash
   node database.js
   ```
   *Expected Output:*
   > ✅ Successfully connected to the SQLite database.  
   > ✅ Table 'api_health' is ready!

---

## 💻 Running the Application

To run the full stack, you will need to open **two** separate terminal windows.

**Terminal 1: Start the QA Monitor Bot**
Make sure you are in the `backend` folder, then run:
```bash
node monitor.js
```
*This will immediately test the target APIs, print the results to the terminal, and save them to your database. It will then run continuously in the background, checking every 15 seconds!*

**Terminal 2: Start the API Server**
Open a new terminal, navigate to the `backend` folder, and run:

```bash
node server.js
```
Note: This command will automatically generate a new health_data.db file in your backend folder and create the required api_health tables to store the test results.
*If it worked, you can visit `http://localhost:3000/api/status` in your browser to see a raw JSON text string containing the latest `PASS` status and response times.*
Note: If port 3000 is already in use, you may need to change the port in server.js or close the application using it.

**Step 3: View the Dashboard**
Open `frontend/index.html` in your browser or with Live Server. You will see the dynamic dashboard updating in real-time based on the database!