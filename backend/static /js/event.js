// =========================================
// event.js
// Create Event
// =========================================

const form = document.getElementById("eventForm");

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

            const attachment =
                document.getElementById("attachment").files[0];

            if (attachment) {

                formData.append(
                    "attachment",
                    attachment
                );

            }

            const result = await addEvent(formData);

            alert(result.message);

            form.reset();

            const preview =
                document.getElementById("imagePreview");

            if (preview) {

                preview.style.display = "none";
                preview.src = "";

            }

            window.location.href = "/history";

        }

        catch (error) {

            alert(error.message);

        }

    });

}

// =========================================
// Reset Button
// =========================================

const resetBtn = document.getElementById("resetBtn");

if (resetBtn) {

    resetBtn.addEventListener("click", () => {

        form.reset();

        const preview =
            document.getElementById("imagePreview");

        if (preview) {

            preview.style.display = "none";
            preview.src = "";

        }

    });

}

// =========================================
// Image Preview
// =========================================

function previewImage(event) {

    const file = event.target.files[0];

    const preview =
        document.getElementById("imagePreview");

    if (!preview) return;

    if (!file) {

        preview.style.display = "none";
        preview.src = "";

        return;

    }

    preview.src = URL.createObjectURL(file);

    preview.style.display = "block";

}