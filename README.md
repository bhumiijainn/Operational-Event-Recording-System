<h1 align="center">⚙️ Operational Event Recording System</h1>

<p align="center">
  <strong>Digital Logbook • Event Management • CRUD • Dashboard Analytics</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/SQLAlchemy-ORM-D71F00?style=for-the-badge" alt="SQLAlchemy">
  <img src="https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-Frontend-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License">
</p>

---

## 📌 Overview

**Operational Event Recording System** is a web-based digital logbook designed to record, organize, monitor, and manage operational events.

The application combines a **FastAPI backend**, **SQLite database**, **SQLAlchemy ORM**, and a browser-based **HTML/CSS/JavaScript frontend**.

It provides a structured way to record operational events along with important information such as event category, severity, department, shift, date, time, equipment, location, status, description, and attachments.

The system also provides event history and CRUD functionality for managing recorded events.

---

## 🎯 Objectives

- 📝 Digitize operational event recording
- 🗂️ Categorize operational events
- 🚨 Track event severity and priority
- 🏢 Record department and equipment information
- 🕐 Maintain shift, date, and time details
- 📍 Record event location
- 👤 Record the person reporting an event
- 🖼️ Support event attachments
- 📚 Maintain event history
- ✏️ Edit existing events
- 🗑️ Delete events
- 📊 Display event information through a dashboard

---

## ✨ Key Features

### 📝 Event Recording

Create structured operational events containing:

- Event title
- Event category
- Department
- Shift
- Date
- Time
- Reported by
- Description
- Severity
- Equipment
- Status
- Location
- Attachment

### 🗂️ Event Classification

Events can be organized into categories such as:

- 🔴 Emergency
- 🟠 Maintenance
- 🟢 Routine

### 🚨 Severity / Priority Tracking

The system supports severity levels for identifying the importance of operational events.

### 📚 Event History

View previously recorded events in a structured history table.

### 🔎 Event Search

Search event records using relevant event information.

### 👁️ Event Details

Open individual events to view their complete information.

### ✏️ Edit Events

Update previously recorded event information.

### 🗑️ Delete Events

Remove unwanted event records from the system.

### 📊 Dashboard

The dashboard provides an overview of recorded operational events and event categories.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| 🐍 Python | Backend programming |
| ⚡ FastAPI | Web framework and REST API |
| 🗄️ SQLite | Database |
| 🔗 SQLAlchemy | ORM and database interaction |
| 🌐 HTML5 | Frontend structure |
| 🎨 CSS3 | Frontend styling |
| ⚡ JavaScript | Frontend functionality |
| 🚀 Uvicorn | ASGI development server |
| 📄 Jinja2 | HTML template rendering |

---

## 🏗️ System Architecture

```text
                    Operational Event Recording System
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Web Browser   │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │ HTML / CSS / JavaScript  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │    FastAPI    │
                         │    Backend    │
                         └───────┬───────┘
                                 │
                 ┌───────────────┼───────────────┐
                 ▼               ▼               ▼
          Event Operations   Validation      File Handling
                 │
                 ▼
          ┌───────────────┐
          │  SQLAlchemy   │
          │     ORM       │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │    SQLite     │
          │   Database    │
          └───────────────┘
```

---

## 🔄 Application Workflow

```text
Open Application
       │
       ▼
    Dashboard
       │
       ├──────────────► Create Event
       │                    │
       │                    ▼
       │              Enter Event Data
       │                    │
       │                    ▼
       │              Validate Details
       │                    │
       │                    ▼
       │              Store in Database
       │
       ▼
 Event History
       │
       ├──────────────► View Event
       │
       ├──────────────► Edit Event
       │
       └──────────────► Delete Event
```

---

## 📊 Event Data

Each operational event can contain structured information including:

| Field | Purpose |
|---|---|
| 🆔 ID | Unique event identifier |
| 📝 Title | Event name/title |
| 🗂️ Category | Routine, Maintenance, Emergency |
| 🏢 Department | Department associated with the event |
| 🕐 Shift | Operational shift |
| 📅 Date | Event date |
| ⏰ Time | Event time |
| 👤 Reported By | Person reporting the event |
| 📄 Description | Detailed event information |
| 🚨 Severity | Event severity / priority |
| ⚙️ Equipment | Related equipment |
| 📌 Status | Current event status |
| 📍 Location | Event location |
| 🖼️ Attachment | Associated event attachment |
| 🕒 Created At | Event creation timestamp |

---

## 🔌 API

The FastAPI backend provides API functionality for working with event records.

### Core Operations

```text
GET     → Retrieve events
GET     → Retrieve an individual event
POST    → Create an event
PUT     → Update an event
DELETE  → Delete an event
```

### API Documentation

FastAPI automatically provides interactive API documentation when the application is running.

**Swagger UI:**

```text
http://127.0.0.1:8000/docs
```

**ReDoc:**

```text
http://127.0.0.1:8000/redoc
```

---

## 📁 Repository Structure

```text
Operational-Event-Recording-System/
│
├── 📂 backend/
│   │
│   ├── 📂 static/
│   │   ├── 📂 css/
│   │   └── 📂 js/
│   │
│   ├── 📂 templates/
│   │   ├── 📄 index.html
│   │   ├── 📄 create-event.html
│   │   ├── 📄 history.html
│   │   └── 📄 event-details.html
│   │
│   ├── 🐍 main.py
│   ├── 🗄️ database.py
│   ├── 📋 schemas.py
│   └── 📄 requirements.txt
│
├── 📄 LICENSE
└── 📄 README.md
```

---

## ▶️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bhumiijainn/Operational-Event-Recording-System.git
```

### 2. Navigate to the Project

```bash
cd Operational-Event-Recording-System
```

### 3. Navigate to the Backend

```bash
cd backend
```

### 4. Create a Virtual Environment

#### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the FastAPI Server

```bash
python -m uvicorn main:app --reload
```

You should see:

```text
Uvicorn running on http://127.0.0.1:8000
```

### 7. Open the Application

Open your browser and visit:

```text
http://127.0.0.1:8000/
```

---

## 📖 API Documentation

After starting the server:

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

These interfaces allow you to inspect and interact with the FastAPI endpoints.

---

## 🗄️ Database

The application uses **SQLite** for local database storage and **SQLAlchemy** for database interaction.

```text
Application
     │
     ▼
FastAPI
     │
     ▼
SQLAlchemy
     │
     ▼
SQLite
```

This approach keeps the project lightweight and easy to run locally without requiring a separate database server.

---

## 🖥️ Frontend

The frontend is built using:

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Chart.js

The browser interface provides pages for:

- Dashboard
- Create Event
- Event History
- Event Details

---

## 📊 Dashboard

The dashboard provides a centralized view of operational events.

It can display:

- Total events
- Emergency events
- Maintenance events
- Routine events
- Event distribution
- Priority/severity distribution
- Recent events

---

## 📝 Event Management Flow

```text
Create Event
     │
     ▼
Enter Operational Details
     │
     ▼
Select Category
     │
     ▼
Set Severity / Priority
     │
     ▼
Add Department / Shift / Location
     │
     ▼
Add Description / Attachment
     │
     ▼
Save Event
     │
     ▼
Database
     │
     ▼
Event History
```

---
## 📸 Application Screenshots

### 📊 Dashboard

![Operational Event Recording Dashboard](screenshots/dashboard.png)

---

### 📝 Create Event

![Create Operational Event](screenshots/create-event.png)

---

### 📚 Event History

![Event History](screenshots/event-history.png)

---



## 🔐 Data Management

The application provides complete basic CRUD functionality:

| Operation | Description |
|---|---|
| ➕ Create | Add a new operational event |
| 👁️ Read | View stored event information |
| ✏️ Update | Edit an existing event |
| 🗑️ Delete | Remove an event |

---

## 🚀 Future Improvements

- 🔐 Add user authentication and role-based access
- 🗄️ Add PostgreSQL support
- 🔎 Add advanced search and filtering
- 📄 Export event reports to CSV/PDF
- 📊 Add advanced dashboard analytics
- 📝 Add audit logs
- 🧪 Add automated unit and API tests
- 🐳 Add Docker support
- ☁️ Deploy the application to the cloud
- 📱 Improve responsive design
- 🔔 Add event notifications and alerts

---

## 📌 Project Highlights

- ⚡ FastAPI-based backend
- 🗄️ SQLite database
- 🔗 SQLAlchemy ORM
- 🌐 HTML/CSS/JavaScript frontend
- 📝 Structured operational event recording
- 🗂️ Event categorization
- 🚨 Severity / priority tracking
- 🕐 Shift and date tracking
- 📚 Event history
- ✏️ CRUD functionality
- 📊 Dashboard analytics
- 📖 Interactive API documentation

---

## 👩‍💻 Author

### Bhumi Jain

<p>
  <a href="https://github.com/bhumiijainn">
    <img src="https://img.shields.io/badge/GitHub-bhumiijainn-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/bhumi-jainn/">
    <img src="https://img.shields.io/badge/LinkedIn-Bhumi%20Jain-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

---

⭐ **If you find this project useful, consider starring the repository.**
