from pydantic import BaseModel


# ==========================================
# Create Event Schema
# ==========================================

class EventCreate(BaseModel):

    # Basic Information
    title: str
    category: str
    severity: str

    # Operational Information
    equipment: str
    department: str
    shift: str
    status: str

    # Date & Time
    date: str
    time: str

    # Reporter Information
    reported_by: str

    # Location
    location: str

    # Description
    description: str
    attachment: str | None = None
    created_at: str


# ==========================================
# Response Schema
# ==========================================

class EventResponse(BaseModel):

    id: int

    # Basic Information
    title: str
    category: str
    severity: str

    # Operational Information
    equipment: str
    department: str
    shift: str
    status: str

    # Date & Time
    date: str
    time: str

    # Reporter Information
    reported_by: str

    # Location
    location: str

    # Description
    description: str

    class Config:
        from_attributes = True