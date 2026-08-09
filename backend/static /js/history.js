// =========================================
// history.js
// Event History
// =========================================

let allEvents = [];

// =========================================
// Load Events
// =========================================

async function loadEvents() {

    try {

        allEvents = await getEvents();

        renderEvents(allEvents);

    }

    catch (error) {

        alert(error.message);

    }

}

// =========================================
// Render Events
// =========================================

function renderEvents(events) {

    const tableBody = document.getElementById("eventBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (events.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="9" style="text-align:center">

                    No events found.

                </td>

            </tr>

        `;

        return;

    }

    events.forEach(event => {

        tableBody.innerHTML += `

            <tr>

                <td>${event.id}</td>

                <td>${event.title}</td>

                <td>${event.category}</td>

                <td>${event.severity}</td>

                <td>${event.department}</td>

                <td>${event.date}</td>
                td>${event.shift}</td>

                <td>${event.status}</td>

                <td>

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="viewEvent(${event.id})">

                        View

                    </button>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editEvent(${event.id})">

                        Edit

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="removeEvent(${event.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}

// =========================================
// Search
// =========================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const filtered = allEvents.filter(event =>

            event.title.toLowerCase().includes(keyword) ||

            event.category.toLowerCase().includes(keyword) ||

            event.department.toLowerCase().includes(keyword) ||

            event.status.toLowerCase().includes(keyword)

        );

        renderEvents(filtered);

    });

}

// =========================================
// View Event
// =========================================

function viewEvent(id) {

    window.location.href = `/event-details?id=${id}`;

}

// =========================================
// Edit Event
// =========================================

function editEvent(id) {

    window.location.href = `/edit-event?id=${id}`;

}

// =========================================
// Delete Event
// =========================================

async function removeEvent(id) {

    const confirmed = confirm(

        "Are you sure you want to delete this event?"

    );

    if (!confirmed) return;

    try {

        const result = await deleteEvent(id);

        alert(result.message);

        await loadEvents();

    }

    catch (error) {

        alert(error.message);

    }

}

// =========================================
// Refresh Button
// =========================================

const refreshBtn = document.getElementById("refreshBtn");

if (refreshBtn) {

    refreshBtn.addEventListener("click", loadEvents);

}

// =========================================
// Start
// =========================================

loadEvents();