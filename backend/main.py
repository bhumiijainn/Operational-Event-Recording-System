# ==========================================================
# main.py
# Digital Logbook System
# FastAPI + SQLAlchemy + SQLite + Image Upload
# ==========================================================

import os
import uuid
import shutil

from pathlib import Path
from datetime import datetime

from fastapi import (
    FastAPI,
    Request,
    HTTPException,
    UploadFile,
    File,
    Form,
    Depends
)

from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from sqlalchemy.orm import Session

from database import SessionLocal, engine
import models
from models import Event

# ==========================================================
# Create Database
# ==========================================================

models.Base.metadata.create_all(bind=engine)

# ==========================================================
# FastAPI App
# ==========================================================

app = FastAPI(

    title="Digital Logbook API",

    version="1.0.0"

)

# ==========================================================
# Static Folder
# ==========================================================

app.mount(

    "/static",

    StaticFiles(directory="static"),

    name="static"

)

# ==========================================================
# Upload Folder
# ==========================================================

UPLOAD_FOLDER = Path("uploads")

UPLOAD_FOLDER.mkdir(

    parents=True,

    exist_ok=True

)

app.mount(

    "/uploads",

    StaticFiles(directory=str(UPLOAD_FOLDER)),

    name="uploads"

)

# ==========================================================
# Templates
# ==========================================================

templates = Jinja2Templates(directory="templates")

# ==========================================================
# Database Dependency
# ==========================================================

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

# ==========================================================
# Allowed Extensions
# ==========================================================

ALLOWED_EXTENSIONS = {

    ".jpg",

    ".jpeg",

    ".png",

    ".webp"

}

# ==========================================================
# Save Uploaded Image
# ==========================================================

def save_uploaded_image(file: UploadFile):

    if not file or not file.filename:

        return ""

    extension = Path(

        file.filename

    ).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(

            status_code=400,

            detail="Only JPG, JPEG, PNG and WEBP images are allowed."

        )

    today = datetime.now().strftime(

        "%Y/%m/%d"

    )

    upload_path = UPLOAD_FOLDER / today

    upload_path.mkdir(

        parents=True,

        exist_ok=True

    )

    filename = f"{uuid.uuid4().hex}{extension}"

    filepath = upload_path / filename

    with open(filepath, "wb") as buffer:

        shutil.copyfileobj(

            file.file,

            buffer

        )

    return filepath.as_posix()

# ==========================================================
# Delete Uploaded Image
# ==========================================================

def delete_uploaded_image(path: str):

    if not path:

        return

    file_path = Path(path)

    if file_path.exists():

        file_path.unlink()
# ==========================================================
# HTML ROUTES
# ==========================================================

@app.get("/", response_class=HTMLResponse)
async def dashboard(request: Request):

    return templates.TemplateResponse(

        request=request,

        name="index.html"

    )


@app.get("/create", response_class=HTMLResponse)
async def create_page(request: Request):

    return templates.TemplateResponse(

        request=request,

        name="create-event.html"

    )


@app.get("/history", response_class=HTMLResponse)
async def history_page(request: Request):

    return templates.TemplateResponse(

        request=request,

        name="history.html"

    )


@app.get("/edit-event", response_class=HTMLResponse)
async def edit_page(request: Request):

    return templates.TemplateResponse(

        request=request,

        name="edit-event.html"

    )


@app.get("/event-details", response_class=HTMLResponse)
async def details_page(request: Request):

    return templates.TemplateResponse(

        request=request,

        name="event-details.html"

    )


# ==========================================================
# API HOME
# ==========================================================

@app.get("/api")
async def api_home():

    return {

        "success": True,

        "message": "Digital Logbook API Running Successfully",

        "version": "1.0.0"

    }


# ==========================================================
# GET ALL EVENTS
# ==========================================================

@app.get("/events")
async def get_events(

    db: Session = Depends(get_db)

):

    events = (

        db.query(Event)

        .order_by(Event.id.desc())

        .all()

    )

    return events


# ==========================================================
# GET SINGLE EVENT
# ==========================================================

@app.get("/events/{event_id}")
async def get_event(

    event_id: int,

    db: Session = Depends(get_db)

):

    event = (

        db.query(Event)

        .filter(Event.id == event_id)

        .first()

    )

    if event is None:

        raise HTTPException(

            status_code=404,

            detail="Event not found."

        )

    return event


# ==========================================================
# DASHBOARD ANALYTICS
# ==========================================================

@app.get("/dashboard")
async def dashboard_statistics(

    db: Session = Depends(get_db)

):

    events = db.query(Event).all()

    return {

        "total_events": len(events),

        "emergency": len(

            [

                e

                for e in events

                if e.category == "Emergency"

            ]

        ),

        "maintenance": len(

            [

                e

                for e in events

                if e.category == "Maintenance"

            ]

        ),

        "routine": len(

            [

                e

                for e in events

                if e.category == "Routine"

            ]

        ),

        "critical": len(

            [

                e

                for e in events

                if e.severity == "Critical"

            ]

        ),

        "high": len(

            [

                e

                for e in events

                if e.severity == "High"

            ]

        ),

        "medium": len(

            [

                e

                for e in events

                if e.severity == "Medium"

            ]

        ),

        "low": len(

            [

                e

                for e in events

                if e.severity == "Low"

            ]

        ),

        "recent_events": (

            db.query(Event)

            .order_by(Event.id.desc())

            .limit(5)

            .all()

        )

    }
# ==========================================================
# CREATE EVENT
# ==========================================================

@app.post("/events")
async def create_event(

    title: str = Form(...),
    category: str = Form(...),
    severity: str = Form(...),
    equipment: str = Form(...),
    department: str = Form(...),
    location: str = Form(...),
    shift: str = Form(...),
    status: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    reported_by: str = Form(...),
    description: str = Form(...),

    attachment: UploadFile = File(None),

    db: Session = Depends(get_db)

):

    try:

        image_path = ""

        if attachment and attachment.filename:

            image_path = save_uploaded_image(

                attachment

            )

        event = Event(

            title=title,

            category=category,

            severity=severity,

            equipment=equipment,

            department=department,

            location=location,

            shift=shift,

            status=status,

            date=date,

            time=time,

            reported_by=reported_by,

            description=description,

            attachment=image_path,

            created_at=datetime.now().strftime(

                "%d-%m-%Y %I:%M %p"

            )

        )

        db.add(

            event

        )

        db.commit()

        db.refresh(

            event

        )

        return {

            "success": True,

            "message": "Event created successfully.",

            "event": event

        }

    except HTTPException:

        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )        
# ==========================================================
# UPDATE EVENT
# ==========================================================

@app.put("/events/{event_id}")
async def update_event(

    event_id: int,

    title: str = Form(...),
    category: str = Form(...),
    severity: str = Form(...),
    equipment: str = Form(...),
    department: str = Form(...),
    location: str = Form(...),
    shift: str = Form(...),
    status: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    reported_by: str = Form(...),
    description: str = Form(...),

    attachment: UploadFile = File(None),

    db: Session = Depends(get_db)

):

    try:

        event = (

            db.query(Event)

            .filter(Event.id == event_id)

            .first()

        )

        if event is None:

            raise HTTPException(

                status_code=404,

                detail="Event not found."

            )

        # ------------------------------------------
        # Replace Image (if new image uploaded)
        # ------------------------------------------

        if attachment and attachment.filename:

            delete_uploaded_image(

                event.attachment

            )

            event.attachment = save_uploaded_image(

                attachment

            )

        # ------------------------------------------
        # Update Event Details
        # ------------------------------------------

        event.title = title

        event.category = category

        event.severity = severity

        event.equipment = equipment

        event.department = department

        event.location = location

        event.shift = shift

        event.status = status

        event.date = date

        event.time = time

        event.reported_by = reported_by

        event.description = description

        db.commit()

        db.refresh(

            event

        )

        return {

            "success": True,

            "message": "Event updated successfully.",

            "event": event

        }

    except HTTPException:

        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )    
# ==========================================================
# DELETE EVENT
# ==========================================================

@app.delete("/events/{event_id}")
async def delete_event(

    event_id: int,

    db: Session = Depends(get_db)

):

    try:

        event = (

            db.query(Event)

            .filter(Event.id == event_id)

            .first()

        )

        if event is None:

            raise HTTPException(

                status_code=404,

                detail="Event not found."

            )

        # ------------------------------------------
        # Delete Uploaded Image
        # ------------------------------------------

        delete_uploaded_image(

            event.attachment

        )

        # ------------------------------------------
        # Delete Database Record
        # ------------------------------------------

        db.delete(

            event

        )

        db.commit()

        return {

            "success": True,

            "message": "Event deleted successfully."

        }

    except HTTPException:

        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )


# ==========================================================
# HEALTH CHECK
# ==========================================================

@app.get("/health")
async def health():

    return {

        "status": "online",

        "application": "Digital Logbook System",

        "framework": "FastAPI",

        "database": "SQLite",

        "version": "1.0.0",

        "server_time": datetime.now().strftime(

            "%d-%m-%Y %I:%M:%S %p"

        )

    }


# ==========================================================
# API INFORMATION
# ==========================================================

@app.get("/api/info")
async def api_information():

    return {

        "name": "Digital Logbook API",

        "version": "1.0.0",

        "developer": "Digital Logbook System",

        "features": [

            "Dashboard",

            "Operational Event Recording",

            "Event History",

            "Event Details",

            "Edit Event",

            "Delete Event",

            "Dashboard Analytics",

            "Image Upload",

            "SQLite Database",

            "FastAPI Backend"

        ],

        "available_routes": {

            "Dashboard": "/",

            "Create Event": "/create",

            "History": "/history",

            "Event Details": "/event-details?id=<id>",

            "Edit Event": "/edit-event?id=<id>",

            "Get Events": "/events",

            "Dashboard Analytics": "/dashboard",

            "Health": "/health",

            "Swagger UI": "/docs",

            "ReDoc": "/redoc"

        }

    }    