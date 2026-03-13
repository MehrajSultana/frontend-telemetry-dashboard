const refreshBtn = document.getElementById("refreshBtn");
const exportBtn = document.getElementById("exportBtn");
const eventBody = document.getElementById("eventBody");
const filterButtons = document.querySelectorAll(".filter-btn");

let events = [
  { time: "09:02 AM", event: "Dashboard Loaded", page: "/home", segment: "All Users", severity: "Info" },
  { time: "09:10 AM", event: "Feature Toggle Clicked", page: "/settings", segment: "Beta Users", severity: "Info" },
  { time: "09:18 AM", event: "API Response Delay", page: "/reports", segment: "Enterprise", severity: "Warning" },
  { time: "09:24 AM", event: "JavaScript Error", page: "/checkout", segment: "All Users", severity: "Error" },
  { time: "09:31 AM", event: "Button Interaction Spike", page: "/pricing", segment: "New Users", severity: "Info" },
  { time: "09:40 AM", event: "Failed Component Render", page: "/dashboard", segment: "Enterprise", severity: "Error" },
  { time: "09:48 AM", event: "Slow Initial Paint", page: "/home", segment: "Mobile Users", severity: "Warning" }
];

function getBadgeClass(severity) {
  if (severity === "Info") return "info";
  if (severity === "Warning") return "warning";
  return "error";
}

function renderEvents(filter = "all") {
  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((item) => item.severity === filter);

  eventBody.innerHTML = filteredEvents
    .map(
      (item) => `
      <tr>
        <td>${item.time}</td>
        <td>${item.event}</td>
        <td>${item.page}</td>
        <td>${item.segment}</td>
        <td><span class="badge ${getBadgeClass(item.severity)}">${item.severity}</span></td>
      </tr>
    `
    )
    .join("");
}

refreshBtn.addEventListener("click", () => {
  const activeUsers = document.getElementById("activeUsers");
  const pageViews = document.getElementById("pageViews");
  const errorRate = document.getElementById("errorRate");
  const loadTime = document.getElementById("loadTime");
  const featureAdoption = document.getElementById("featureAdoption");
  const apiLatency = document.getElementById("apiLatency");

  const activeUsersValue = 1100 + Math.floor(Math.random() * 400);
  const pageViewsValue = 8200 + Math.floor(Math.random() * 1200);
  const errorRateValue = (1 + Math.random() * 2).toFixed(1);
  const loadTimeValue = (0.9 + Math.random() * 0.8).toFixed(1);
  const featureAdoptionValue = 60 + Math.floor(Math.random() * 20);
  const apiLatencyValue = 250 + Math.floor(Math.random() * 180);

  activeUsers.textContent = activeUsersValue.toLocaleString();
  pageViews.textContent = pageViewsValue.toLocaleString();
  errorRate.textContent = `${errorRateValue}%`;
  loadTime.textContent = `${loadTimeValue}s`;
  featureAdoption.textContent = `${featureAdoptionValue}%`;
  apiLatency.textContent = `${apiLatencyValue}ms`;

  alert("Telemetry metrics refreshed.");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderEvents(button.dataset.filter);
  });
});

exportBtn.addEventListener("click", () => {
  const headers = ["Time,Event,Page,User Segment,Severity"];
  const rows = events.map(
    (item) =>
      `${item.time},${item.event},${item.page},${item.segment},${item.severity}`
  );

  const csvContent = [...headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "telemetry-events.csv";
  link.click();

  URL.revokeObjectURL(url);
});

renderEvents();
