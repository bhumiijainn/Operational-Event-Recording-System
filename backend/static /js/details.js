// =========================================
// details.js
// Event Details
// =========================================

const params = new URLSearchParams(window.location.search);

const eventId = params.get("id");

// =========================================
// Load Event Details
// =========================================

async function loadEventDetails() {

    if (!eventId) {

        alert("Invalid Event ID");

        window.location.href = "/history";

        return;

    }

    try {

        const event = await getEventById(eventId);

        setText("eventId", event.id);
        setText("title", event.title);
        setText("category", event.category);
        setText("severity", event.severity);
        setText("department", event.department);
        setText("equipment", event.equipment);
        setText("location", event.location);
        setText("shift", event.shift);
        setText("status", event.status);
        setText("date", event.date);
        setText("time", event.time);
        setText("reportedBy", event.reported_by);
        setText("description", event.description);
        setText("createdAt", event.created_at);

        loadAttachment(event);

        const editBtn = document.getElementById("editBtn");

        if (editBtn) {

            editBtn.onclick = () => {

                window.location.href = `/edit-event?id=${event.id}`;

            };

        }

    }

    catch (error) {

        alert(error.message);

        window.location.href = "/history";

    }

}

// =========================================
// Set Text
// =========================================

function setText(id, value) {

    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = value || "-";

}

// =========================================
// Load Attachment
// =========================================

function loadAttachment(event) {

    const container = document.getElementById("attachment");

    if (!container) return;

    if (!event.attachment) {

        container.innerHTML = `
            <p>No attachment available.</p>
        `;

        return;

    }

    container.innerHTML = `

        <img
            src="/${event.attachment}"
            alt="Event Attachment"
            class="attachment-image"
            style="
                max-width:100%;
                max-height:400px;
                border-radius:10px;
                border:1px solid #ddd;
                cursor:pointer;
            "
        >

    `;

}

// =========================================
// Back Button
// =========================================

const backBtn = document.getElementById("backBtn");

if (backBtn) {

    backBtn.onclick = () => {

        window.location.href = "/history";

    };

}

// =========================================
// Start
// =========================================

loadEventDetails();