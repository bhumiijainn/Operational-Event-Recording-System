# Operational-Event-Recording-System
An event management application developed using FastAPI, SQLite, SQLAlchemy, HTML, CSS, and JavaScript, enabling efficient event recording, categorization, and history tracking with CRUD functionality.

# Operational Event Recording System

A full-stack web application for recording, categorizing, prioritizing, and tracking operational events through a structured event management system.

The application provides a centralized interface for creating events, storing event information, viewing event history, and managing operational records.

## 🚀 Features

- Create and record operational events
- Categorize events by type
- Assign priority levels
- Track event status
- View complete event history
- View individual event details
- Edit and delete event records
- Persistent database storage
- RESTful backend APIs
- Interactive web interface
- Responsive frontend
- Structured data validation
- CRUD operations for event management

## 🛠️ Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Frontend
- HTML5
- CSS3
- JavaScript

### Development Tools
- Git
- GitHub
- VS Code
- Uvicorn

## 🏗️ System Architecture

The application follows a simple full-stack architecture:

```text
User
 │
 ▼
HTML / CSS / JavaScript Frontend
 │
 ▼
FastAPI Backend
 │
 ├── API Routes
 │
 ├── Pydantic Schemas
 │
 ▼
SQLAlchemy ORM
 │
 ▼
SQLite Database
