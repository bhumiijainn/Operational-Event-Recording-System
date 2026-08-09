// =========================================
// edit.js
// Edit Existing Event
// =========================================

const params = new URLSearchParams(window.location.search);

const eventId = params.get("id");

const form = document.getElementById("eventForm");

// =========================================
// Load Event
// =========================================

async function loadEvent() {

    if (!eventId) {

        alert("Invalid Event ID");

        window.location.href = "/history";

        return;

    }

    try {

        const event = await getEventById(eventId);

        document.getElementById("title").value = event.title;

        document.getElementById("eventType").value = event.category;

        document.getElementById("priority").value = event.severity;

        document.getElementById("equipment").value = event.equipment;

        document.getElementById("department").value = event.department;

        document.getElementById("location").value = event.location;

        document.getElementById("shift").value = event.shift;

        document.getElementById("status").value = event.status;

        document.getElementById("date").value = event.date;

        document.getElementById("time").value = event.time;

        document.getElementById("reportedBy").value = event.reported_by;

        document.getElementById("description").value = event.description;

        const preview = document.getElementById("imagePreview");

        if (preview && event.attachment) {

            preview.src = "/" + event.attachment;

            preview.style.display = "block";

        }

    }

    catch (error) {

        alert(error.message);

        window.location.href = "/history";

    }

}

// =========================================
// Update Event
// =========================================

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append(
                "title",
                document.getElementById("title").value.trim()
            );

            formData.append(
                "category",
                document.getElementById("eventType").value
            );

            formData.append(
                "severity",
                document.getElementById("priority").value
            );

            formData.append(
                "equipment",
                document.getElementById("equipment").value.trim()
            );

            formData.append(
                "department",
                document.getElementById("department").value
            );

            formData.append(
                "location",
                document.getElementById("location").value.trim()
            );

            formData.append(
                "shift",
                document.getElementById("shift").value
            );

            formData.append(
                "status",
                document.getElementById("status").value
            );

            formData.append(
                "date",
                document.getElementById("date").value
            );

            formData.append(
                "time",
                document.getElementById("time").value
            );

            formData.append(
                "reported_by",
                document.getElementById("reportedBy").value.trim()
            );

            formData.append(
                "description",
                document.getElementById("description").value.trim()
            );

            const attachment = document.getElementById("attachment").files[0];

            if (attachment) {

                formData.append(
                    "attachment",
                    attachment
                );

            }

            const result = await updateEvent(

                eventId,

                formData

            );

            alert(result.message);

            window.location.href = "/history";

        }

        catch (error) {

            alert(error.message);

        }

    });

}

// =========================================
// Image Preview
// =========================================

function previewImage(event) {

    const file = event.target.files[0];

    const preview = document.getElementById("imagePreview");

    if (!preview) return;

    if (!file) {

        return;

    }

    preview.src = URL.createObjectURL(file);

    preview.style.display = "block";

}

// =========================================
// Start
// =========================================

loadEvent();