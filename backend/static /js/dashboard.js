// =======================================
// dashboard.js
// Digital Logbook System
// =======================================

let typeChart = null;
let priorityChart = null;

window.addEventListener("DOMContentLoaded", loadDashboard);

// =======================================
// Load Dashboard
// =======================================

async function loadDashboard() {

    try {

        const events = await getEvents();

        updateCards(events);

        loadRecentEvents(events);

        createCharts(events);

    }

    catch (error) {

        console.error(error);

        alert(error.message || "Unable to load dashboard.");

    }

}

// =======================================
// Dashboard Cards
// =======================================

function updateCards(events) {

    document.getElementById("totalEvents").textContent =
        events.length;

    document.getElementById("emergencyCount").textContent =
        events.filter(e => e.category === "Emergency").length;

    document.getElementById("maintenanceCount").textContent =
        events.filter(e => e.category === "Maintenance").length;

    document.getElementById("routineCount").textContent =
        events.filter(e => e.category === "Routine").length;

}

// =======================================
// Recent Events
// =======================================

function loadRecentEvents(events) {

    const tableBody = document.getElementById("recentEvents");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const latestEvents = [...events]

        .sort((a, b) => b.id - a.id)

        .slice(0, 5);

    if (latestEvents.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="5">

                    No Events Available

                </td>

            </tr>

        `;

        return;

    }

    latestEvents.forEach(event => {

        tableBody.innerHTML += `

            <tr>

                <td>${event.id}</td>

                <td>${event.title}</td>

                <td>${event.category}</td>

                <td>${event.severity}</td>

                <td>${event.status}</td>

            </tr>

        `;

    });

}

// =======================================
// Charts
// =======================================

function createCharts(events) {

    const emergency =
        events.filter(e => e.category === "Emergency").length;

    const maintenance =
        events.filter(e => e.category === "Maintenance").length;

    const routine =
        events.filter(e => e.category === "Routine").length;

    const critical =
        events.filter(e => e.severity === "Critical").length;

    const high =
        events.filter(e => e.severity === "High").length;

    const medium =
        events.filter(e => e.severity === "Medium").length;

    const low =
        events.filter(e => e.severity === "Low").length;

    // Destroy old charts

    if (typeChart) {

        typeChart.destroy();

    }

    if (priorityChart) {

        priorityChart.destroy();

    }

    // ===================================
    // Type Chart
    // ===================================

    const typeCanvas = document.getElementById("typeChart");

    if (typeCanvas) {

        typeChart = new Chart(typeCanvas, {

            type: "doughnut",

            data: {

                labels: [

                    "Emergency",

                    "Maintenance",

                    "Routine"

                ],

                datasets: [{

                    data: [

                        emergency,

                        maintenance,

                        routine

                    ]

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

    }

    // ===================================
    // Priority Chart
    // ===================================

    const priorityCanvas =
        document.getElementById("priorityChart");

    if (priorityCanvas) {

        priorityChart = new Chart(priorityCanvas, {

            type: "bar",

            data: {

                labels: [

                    "Critical",

                    "High",

                    "Medium",

                    "Low"

                ],

                datasets: [{

                    label: "Events",

                    data: [

                        critical,

                        high,

                        medium,

                        low

                    ]

                }]

            },

            options: {

                responsive: true,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            precision: 0

                        }

                    }

                }

            }

        });

    }

}