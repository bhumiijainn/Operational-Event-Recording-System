// =========================================
// storage.js
// Digital Logbook System
// FastAPI + FormData API
// =========================================

const API_URL = "/events";

// =========================================
// Get All Events
// =========================================

async function getEvents() {

    const response = await fetch(API_URL);

    if (!response.ok) {

        throw new Error("Unable to load events.");

    }

    return await response.json();

}

// =========================================
// Get Single Event
// =========================================

async function getEventById(id) {

    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {

        throw new Error("Event not found.");

    }

    return await response.json();

}

// =========================================
// Create Event
// =========================================

async function addEvent(formData) {

    const response = await fetch(API_URL, {

        method: "POST",

        body: formData

    });

    const result = await response.json();

    if (!response.ok) {

        throw new Error(

            result.detail || result.message || "Unable to create event."

        );

    }

    return result;

}

// =========================================
// Update Event
// =========================================

async function updateEvent(id, formData) {

    const response = await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        body: formData

    });

    const result = await response.json();

    if (!response.ok) {

        throw new Error(

            result.detail || result.message || "Unable to update event."

        );

    }

    return result;

}

// =========================================
// Delete Event
// =========================================

async function deleteEvent(id) {

    const response = await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    const result = await response.json();

    if (!response.ok) {

        throw new Error(

            result.detail || result.message || "Unable to delete event."

        );

    }

    return result;

}

// =========================================
// Dashboard Statistics
// =========================================

async function getDashboardStats() {

    const response = await fetch("/dashboard");

    if (!response.ok) {

        throw new Error("Unable to load dashboard.");

    }

    return await response.json();

}