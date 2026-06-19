import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
    from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";


 import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "AIzaSyCdRCV9BF_UsLxqRzCE2VOPHmP_ox2yGqI",
    authDomain: "freelancehub-v2.firebaseapp.com",
    projectId: "freelancehub-v2",
    storageBucket: "freelancehub-v2.firebasestorage.app",
    messagingSenderId: "600241815817",
    appId: "1:600241815817:web:a0e5710e59c44914b413d8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


 async function loadProjectsFromFirestore() {
const q = query(
    collection(db, "projects"),
    where(
        "userId",
        "==",
        auth.currentUser.uid
    )
);

const querySnapshot =
    await getDocs(q);

    projects = [];

    querySnapshot.forEach((doc) => {

        projects.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderProjects();
    updateDashboard();
    updateFinance();

}

async function loadTasksFromFirestore() {

   const q = query(
    collection(db, "tasks"),
    where(
        "userId",
        "==",
        auth.currentUser.uid
    )
);

const querySnapshot =
    await getDocs(q);
    tasks = [];

    querySnapshot.forEach((doc) => {

        tasks.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderTasks();

}


async function loadClientsFromFirestore() {

   const q = query(
    collection(db, "clients"),
    where(
        "userId",
        "==",
        auth.currentUser.uid
    )
);

const querySnapshot =
    await getDocs(q);

    clients = [];

   querySnapshot.forEach((doc) => {

    clients.push({
        id: doc.id,
        ...doc.data()
    });

});
    renderClients();
    loadClientsIntoProjects();
}
const openModalBtn =
    document.getElementById("openModalBtn");
const exportBackupBtn =
    document.getElementById("exportBackupBtn");

const importBackupBtn =
    document.getElementById("importBackupBtn");

const importBackupFile =
    document.getElementById("importBackupFile");
const closeModalBtn =
    document.getElementById("closeModalBtn");
const projectsCount =
    document.getElementById("projectsCount");
const exportBtn =
    document.getElementById("exportBtn");
const pdfBtn =
    document.getElementById("pdfBtn");
console.log(exportBtn);
const revenueCount =
    document.getElementById("revenueCount");
const settingsBtn =
    document.getElementById("settingsBtn");
const completedCount =
    document.getElementById("completedCount");
const clientModal =
    document.getElementById("clientModal");
console.log("VERSION 999");
const authSection =
    document.getElementById("authSection");
const container =
    document.querySelector(".container");
const registerBtn =
    document.getElementById("registerBtn");

const loginBtn =
    document.getElementById("loginBtn");

const authEmail =
    document.getElementById("authEmail");

const authPassword =
    document.getElementById("authPassword");
onAuthStateChanged(auth, async (user) => {

    if (user) {

        authSection.style.display = "none";
        container.style.display = "flex";

        await loadClientsFromFirestore();
        await loadProjectsFromFirestore();
        await loadTasksFromFirestore();

    } else {

        authSection.style.display = "flex";
        container.style.display = "none";

    }

});
registerBtn.addEventListener("click", async () => {

    const email = authEmail.value;
    const password = authPassword.value;

    try {

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Account created successfully");

    }
    catch (error) {

        alert(error.message);

    }

});
loginBtn.addEventListener("click", async () => {

    const email = authEmail.value;
    const password = authPassword.value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        authSection.style.display = "none";

        container.style.display = "flex";

        alert("Login successful");

    }
    catch (error) {

        alert(error.message);

    }

});
const addClientBtn =
    document.getElementById("addClientBtn");

const clientName =
    document.getElementById("clientName");

const clientEmail =
    document.getElementById("clientEmail");

const clientPhone =
    document.getElementById("clientPhone");

const clientsList =
    document.getElementById("clientsList");

const clientsCount =
    document.getElementById("clientsCount");
const searchInput =
    document.getElementById("searchInput");
const openProjectModalBtn =
    document.getElementById("openProjectModalBtn");
const analyticsBtn =
    document.getElementById("analyticsBtn");

const analyticsSection =
    document.getElementById("analyticsSection");
analyticsBtn.addEventListener("click", () => {

    setActiveMenu(analyticsBtn);

    dashboardSection.style.display = "none";

    clientsSection.style.display = "none";

    projectsSection.style.display = "none";

    tasksSection.style.display = "none";

    financeSection.style.display = "none";

    analyticsSection.style.display = "block";

    updateAnalytics();



});
const closeProjectModalBtn =
    document.getElementById("closeProjectModalBtn");
const addTaskBtn =
    document.getElementById("addTaskBtn");
const darkModeBtn =
    document.getElementById("darkModeBtn");

const logoutBtn =
    document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        authSection.style.display = "flex";

        container.style.display = "none";

        alert("Logged out");

    }
    catch (error) {

        alert(error.message);

    }

});
const tasksList =
    document.getElementById("tasksList");
const financeSection =
    document.getElementById("financeSection");
const projectModal =
    document.getElementById("projectModal");

const addProjectBtn =
    document.getElementById("addProjectBtn");

const projectName =
    document.getElementById("projectName");

const projectBudget =
    document.getElementById("projectBudget");
const projectPaid =
    document.getElementById("projectPaid");
const projectDeadline =
    document.getElementById("projectDeadline");
const projectStatus =
    document.getElementById("projectStatus");
const projectClient =
    document.getElementById("projectClient");

const projectsList =
    document.getElementById("projectsList");
const statusFilter =
    document.getElementById("statusFilter");
statusFilter.addEventListener("change", () => {

    renderProjects();

});
let editIndex = -1;
let clients =
    JSON.parse(
        localStorage.getItem("clients")
    ) || [];

let projects =
    JSON.parse(
        localStorage.getItem("projects")
    ) || [];
let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];
openModalBtn.addEventListener("click", () => {

    clientModal.style.display = "flex";

});

closeModalBtn.addEventListener("click", () => {

    console.log("وصلت هنا");
    clientModal.style.display = "none";

});

function renderClients() {

    clientsList.innerHTML = "";

    let filteredClients = clients;

    if (searchInput.value !== "") {

        filteredClients = clients.filter(client =>

            client.name
                .toLowerCase()
                .includes(
                    searchInput.value.toLowerCase()
                )

        );

    }

    filteredClients.slice(-5).reverse().forEach((client, index) => {

        clientsList.innerHTML += `
<div class="client-row">

<div class="client">

<h4>${client.name}</h4>

<p>📧 ${client.email}</p>

<p>📞 ${client.phone}</p>

</div>

<button
class="edit-btn"
onclick="editClient(${clients.indexOf(client)})">
✏️
</button>

<button
class="delete-btn"
onclick="deleteClient(${clients.indexOf(client)})">
❌
</button>

</div>
`;

    });

    clientsCount.textContent =
        clients.length;

}
addClientBtn.addEventListener("click", async () => {

    if (clientName.value.trim() === "") {
        alert("Client Name is required");
        return;
    }

    if (clientEmail.value.trim() === "") {
        alert("Email is required");
        return;
    }

    const clientExists = clients.some(client =>

        client.name.toLowerCase() ===
        clientName.value.toLowerCase()

        && editIndex === -1

    );

    if (clientExists) {
        alert("Client already exists");
        return;
    }
const newClient = {

    name: clientName.value,
    email: clientEmail.value,
    phone: clientPhone.value,
    userId: auth.currentUser.uid

};
if (editIndex === -1) {

    await addDoc(
        collection(db, "clients"),
        newClient
    );

    await loadClientsFromFirestore();

} 
else {

    await updateDoc(
        doc(
            db,
            "clients",
            clients[editIndex].id
        ),
        newClient
    );

    await loadClientsFromFirestore();

    editIndex = -1;

}

    renderClients();
    showToast("✅ Client saved successfully!");
    loadClientsIntoProjects();
    clientName.value = "";
    clientEmail.value = "";
    clientPhone.value = "";

    clientModal.style.display = "none";

});

window.deleteClient = async function (index) {

    if (!confirm("Delete this client?")) return;

    await deleteDoc(
        doc(
            db,
            "clients",
            clients[index].id
        )
    );

    await loadClientsFromFirestore();

}
window.editClient = function (index) {

    editIndex = index;

    clientName.value =
        clients[index].name;

    clientEmail.value =
        clients[index].email;

    clientPhone.value =
        clients[index].phone;

    clientModal.style.display = "flex";

}
searchInput.addEventListener("input", () => {

    renderClients();

    renderProjects();

});
renderClients();

renderProjects();
const pendingDashboard =
    document.getElementById("pendingDashboard");

const progressDashboard =
    document.getElementById("progressDashboard");

const completedDashboard =
    document.getElementById("completedDashboard");
const overdueDashboard =
    document.getElementById("overdueDashboard");
const dueSoonDashboard =
    document.getElementById("dueSoonDashboard");
function updateDashboard() {

    projectsCount.textContent =
        projects.length;

    let revenue = 0;

    let completed = 0;

    projects.forEach(project => {

        revenue += Number(project.paid || 0);

        if (project.status === "Completed") {

            completed++;

        }

    });

    revenueCount.textContent =
        "$" + revenue;

    completedCount.textContent =
        completed;
    const pendingCount =
        projects.filter(project =>
            project.status === "Pending"
        ).length;

    const progressCount =
        projects.filter(project =>
            project.status === "In Progress"
        ).length;

    const completedCountProjects =
        projects.filter(project =>
            project.status === "Completed"
        ).length;
    const today = new Date();

    const overdueCount =
        projects.filter(project =>

            project.deadline &&

            new Date(project.deadline) < today &&

            project.status !== "Completed"

        ).length;
    const nextWeek = new Date();

    nextWeek.setDate(
        today.getDate() + 7
    );

    const dueSoonCount =
        projects.filter(project =>

            project.deadline &&

            new Date(project.deadline) >= today &&

            new Date(project.deadline) <= nextWeek &&

            project.status !== "Completed"

        ).length;
    pendingDashboard.textContent =
        pendingCount;

    progressDashboard.textContent =
        progressCount;

    completedDashboard.textContent =
        completedCountProjects;

    overdueDashboard.textContent =
        overdueCount;
    dueSoonDashboard.textContent =
        dueSoonCount;
}
openProjectModalBtn.addEventListener("click", () => {

    document.getElementById(
        "projectModalTitle"
    ).textContent = "Add Project";
    addProjectBtn.textContent = "Add Project";
    projectModal.style.display = "flex";

});

closeProjectModalBtn.addEventListener("click", () => {

    projectModal.style.display = "none";

});

function renderProjects() {

    projectsList.innerHTML = "";

    let filteredProjects = projects;
    if (searchInput.value !== "") {

        filteredProjects = filteredProjects.filter(project =>

            project.name
                .toLowerCase()
                .includes(
                    searchInput.value.toLowerCase()
                )

        );

    }

    if (statusFilter.value !== "All") {

        filteredProjects = filteredProjects.filter(project =>
            project.status === statusFilter.value
        );

    }

    filteredProjects.forEach((project, index) => {
        const isOverdue =
            project.deadline &&
            new Date(project.deadline) < new Date() &&
            project.status !== "Completed";
        projectsList.innerHTML += `

<div class="project-row">

<div class="project ${isOverdue ? 'overdue-project' : ''}">
<h4>${project.name}</h4>

<p>👤 ${project.client || "No Client"}</p>

<p>💰 Budget: $${project.budget}</p>
<p>✅ Paid: $${project.paid || 0}</p>

<p>💵 Remaining: $${(project.budget || 0) - (project.paid || 0)}</p>
<div class="progress-bar">

<div
class="progress-fill"
style="
width:${((project.paid || 0) / (project.budget || 1)) * 100}%;

background:
${((project.paid || 0) / (project.budget || 1)) * 100 < 30
                ? "#ef4444"
                : ((project.paid || 0) / (project.budget || 1)) * 100 < 70
                    ? "#facc15"
                    : "#22c55e"};
">
</div>

</div>

<p>
${Math.round(
                        ((project.paid || 0) / (project.budget || 1)) * 100
                    )}%
Completed
</p>
<p class="status ${isOverdue ? 'Overdue' : project.status.replace(' ', '-')}">
${isOverdue ? '⚠️ Overdue' : '📌 ' + project.status}
</p>
<p>📅 Deadline: ${project.deadline || "Not Set"}</p>
</div>

<button
class="edit-btn"
onclick="editProject(${index})">
✏️
</button>

<button
class="delete-btn"
onclick="deleteProject(${index})">
❌
</button>

</div>

`;

    });

}
let projectEditIndex = -1;

addProjectBtn.addEventListener("click", async () => {
    console.log("ADD CLICKED");
    if (projectName.value.trim() === "") {
        alert("Project Name is required");
        return;
    }

    if (projectBudget.value === "") {
        alert("Budget is required");
        return;
    }

    if (Number(projectBudget.value) <= 0) {
        alert("Budget must be greater than 0");
        return;
    }

    if (Number(projectPaid.value) < 0) {
        alert("Paid Amount cannot be negative");
        return;
    }
    if (
        Number(projectPaid.value) >
        Number(projectBudget.value)
    ) {
        alert("Paid Amount cannot exceed Budget");

        return;

    }
    if (projectBudget.value === "") return;
  const newProject = {

    name: projectName.value,
    budget: projectBudget.value,
    paid: projectPaid.value,
    client: projectClient.value,
    deadline: projectDeadline.value,
    status: projectStatus.value,
    userId: auth.currentUser.uid

};
if (projectEditIndex === -1) {

    await addDoc(
        collection(db, "projects"),
        newProject
    );

}
else {

    await updateDoc(
        doc(
            db,
            "projects",
            projects[projectEditIndex].id
        ),
        newProject
    );

    projectEditIndex = -1;

}

await loadProjectsFromFirestore();
    renderProjects();
    showToast("✅ Project saved successfully!");
    updateDashboard();
    updateFinance();

    projectName.value = "";
    projectBudget.value = "";
    projectPaid.value = "";
    projectDeadline.value = "";
    projectStatus.value = "Pending";

    projectModal.style.display = "none";
    projectModal.classList.remove("active");
});
window.editProject = function (index) {

    projectEditIndex = index;
    document.getElementById(
        "projectModalTitle"
    ).textContent = "Edit Project";
    addProjectBtn.textContent = "Save Changes";
    projectName.value =
        projects[index].name;

    projectBudget.value =
        projects[index].budget;
    projectPaid.value =
        projects[index].paid || 0;
    projectStatus.value =
        projects[index].status;
    projectClient.value =
        projects[index].client || "";

    projectDeadline.value =
        projects[index].deadline || "";

    projectModal.style.display = "flex";

}



window.deleteProject = async function (index) {

  

    if (!confirm("Delete this project?")) return;
    console.log(projects[index]);

    await deleteDoc(
        doc(
            db,
            "projects",
            projects[index].id
        )
    );

    await loadProjectsFromFirestore();

    showToast("🗑️ Project deleted!");

}
function loadClientsIntoProjects() {

    projectClient.innerHTML = "";

    clients.forEach(client => {

        projectClient.innerHTML += `
<option value="${client.name}">
${client.name}
</option>
`;

    });

}

function renderTasks() {

    tasksList.innerHTML = "";

    tasks.forEach((task, index) => {

        tasksList.innerHTML += `
<div class="task-row">

<span onclick="toggleTask(${index})">
${task.completed ? "☑" : "☐"}
${task.name}
</span>

<button
class="delete-btn"
onclick="deleteTask(${index})">
❌
</button>

</div>
`;

    });

}
addTaskBtn.addEventListener("click", async () => {
    const taskName = prompt("Enter Task Name");

    if (taskName === null || taskName === "")
        return;
await addDoc(
    collection(db, "tasks"),
    {
        name: taskName,
        completed: false,
        userId: auth.currentUser.uid
    }
);

await loadTasksFromFirestore();

});
window.toggleTask = async function (index) {

    await updateDoc(
        doc(
            db,
            "tasks",
            tasks[index].id
        ),
        {
            completed:
                !tasks[index].completed
        }
    );

    await loadTasksFromFirestore();

}
window.deleteTask = async function (index) {

    if (!confirm("Delete this task?")) return;

    await deleteDoc(
        doc(
            db,
            "tasks",
            tasks[index].id
        )
    );

    await loadTasksFromFirestore();

}

loadClientsIntoProjects();

// loadClientsFromFirestore();

// loadProjectsFromFirestore();

// loadTasksFromFirestore();
const dashboardBtn =
    document.getElementById("dashboardBtn");

const clientsBtn =
    document.getElementById("clientsBtn");

const projectsBtn =
    document.getElementById("projectsBtn");

const dashboardSection =
    document.getElementById("dashboardSection");

const clientsSection =
    document.getElementById("clientsSection");

const projectsSection =
    document.getElementById("projectsSection");

const tasksSection =
    document.getElementById("tasksSection");
dashboardBtn.addEventListener("click", () => {

    setActiveMenu(dashboardBtn);

    dashboardSection.style.display = "block";
    clientsSection.style.display = "block";
    projectsSection.style.display = "block";
    tasksSection.style.display = "block";

    financeSection.style.display = "none";
    analyticsSection.style.display = "none";
    settingsSection.style.display = "none";

});
clientsBtn.addEventListener("click", () => {

    setActiveMenu(clientsBtn);

    dashboardSection.style.display = "none";
    clientsSection.style.display = "block";
    projectsSection.style.display = "none";
    tasksSection.style.display = "none";
    financeSection.style.display = "none";
    analyticsSection.style.display = "none";
    settingsSection.style.display = "none";

});

projectsBtn.addEventListener("click", () => {

    setActiveMenu(projectsBtn);

    dashboardSection.style.display = "none";
    clientsSection.style.display = "none";
    projectsSection.style.display = "block";
    tasksSection.style.display = "none";
    financeSection.style.display = "none";
    analyticsSection.style.display = "none";
    settingsSection.style.display = "none";

});

tasksBtn.addEventListener("click", () => {

    setActiveMenu(tasksBtn);

    dashboardSection.style.display = "none";
    clientsSection.style.display = "none";
    projectsSection.style.display = "none";
    tasksSection.style.display = "block";
    financeSection.style.display = "none";
    analyticsSection.style.display = "none";
    settingsSection.style.display = "none";

});
const menuItems =
    document.querySelectorAll(".sidebar li");

function setActiveMenu(button) {

    menuItems.forEach(item => {

        item.classList.remove("active-menu");

    });

    button.classList.add("active-menu");

}
setActiveMenu(dashboardBtn);
const financeBtn =
    document.getElementById("financeBtn");

const settingsSection =
    document.getElementById("settingsSection");

financeBtn.addEventListener("click", () => {

    setActiveMenu(financeBtn);

    dashboardSection.style.display = "none";

    clientsSection.style.display = "none";

    projectsSection.style.display = "none";

    tasksSection.style.display = "none";

    financeSection.style.display = "block";
    settingsSection.style.display = "none";
    analyticsSection.style.display = "none";
    updateFinance();

});

settingsBtn.addEventListener("click", () => {

    setActiveMenu(settingsBtn);

    dashboardSection.style.display = "none";
    clientsSection.style.display = "none";
    projectsSection.style.display = "none";
    tasksSection.style.display = "none";
    financeSection.style.display = "none";
    analyticsSection.style.display = "none";

    settingsSection.style.display = "block";

    document.getElementById("savedClients").textContent =
        clients.length;

    document.getElementById("savedProjects").textContent =
        projects.length;

});
function updateFinance() {

    let totalBudget = 0;
    let totalPaid = 0;

    projects.forEach(project => {

        totalBudget += Number(project.budget || 0);

        totalPaid += Number(project.paid || 0);

    });

    document.getElementById("totalBudget").textContent =
        "$" + totalBudget;

    document.getElementById("totalPaid").textContent =
        "$" + totalPaid;

    document.getElementById("totalRemaining").textContent =
        "$" + (totalBudget - totalPaid);


    const financeProjects =
        document.getElementById("financeProjects");

    financeProjects.innerHTML = "";

    projects.forEach(project => {

        financeProjects.innerHTML += `

<div class="finance-project-card">

<h4>${project.name}</h4>

<p>💰 Budget: $${project.budget}</p>

<p>✅ Paid: $${project.paid || 0}</p>

<p>📊 Remaining: $
${(project.budget || 0) - (project.paid || 0)}
</p>

<p>📌 ${project.status}</p>

</div>

`;

    });

}
function updateAnalytics() {

    let pending = 0;
    let progress = 0;
    let completed = 0;
    let totalBudget = 0;
    let totalPaid = 0;
    let totalRemaining = 0;
    projects.forEach(project => {

        totalBudget += Number(project.budget || 0);
        totalPaid += Number(project.paid || 0);
        totalRemaining +=
            Number(project.budget || 0) -
            Number(project.paid || 0);
        if (project.status === "Pending") {
            pending++;
        }

        if (project.status === "In Progress") {
            progress++;
        }

        if (project.status === "Completed") {
            completed++;
        }

    });

    document.getElementById("pendingProjects").textContent =
        pending;

    document.getElementById("progressProjects").textContent =
        progress;

    document.getElementById("completedProjectsAnalytics").textContent =
        completed;
    document.getElementById("totalBudgetAnalytics").textContent =
        "$" + totalBudget;

    document.getElementById("totalPaidAnalytics").textContent =
        "$" + totalPaid;

    const rate =
        totalBudget > 0
            ? Math.round((totalPaid / totalBudget) * 100)
            : 0;

    document.getElementById("collectionRateAnalytics").textContent =
        rate + "%";
    const ctx = document.getElementById("projectsChart");

    if (window.projectsChartInstance) {
        window.projectsChartInstance.destroy();
    }

    window.projectsChartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Pending", "In Progress", "Completed"],
            datasets: [{
                data: [pending, progress, completed]
            }]
        }
    });


    const revenueCtx =
        document.getElementById("revenueChart");

    if (window.revenueChartInstance) {
        window.revenueChartInstance.destroy();
    }

    window.revenueChartInstance =
        new Chart(revenueCtx, {
            type: "bar",
            data: {
                labels: [
                    "Budget",
                    "Paid",
                    "Remaining"
                ],
                datasets: [{
                    data: [
                        totalBudget,
                        totalPaid,
                        totalRemaining
                    ]
                }]
            }
        });

}




darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );

});

if (
    localStorage.getItem("darkMode")
    === "true"
) {

    document.body.classList.add("dark-mode");

}

exportBtn.addEventListener("click", () => {

    let csv =
        "Name,Budget,Paid,Status\n";

    projects.forEach(project => {

        csv +=
            `${project.name},${project.budget},${project.paid},${project.status}\n`;

    });

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "projects.csv";

    link.click();

});
pdfBtn.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("FreelanceHub Report", 20, 20);

    doc.setFontSize(14);

    doc.text(
        `Total Clients: ${clients.length}`,
        20,
        40
    );

    doc.text(
        `Total Projects: ${projects.length}`,
        20,
        50
    );

    let revenue = 0;

    projects.forEach(project => {

        revenue += Number(project.paid || 0);

    });

    doc.text(
        `Revenue: $${revenue}`,
        20,
        60
    );

    let y = 80;

    doc.text(
        "Projects List:",
        20,
        y
    );

    y += 10;

    projects.forEach(project => {

        doc.text(
            `${project.name} - ${project.status}`,
            20,
            y
        );

        y += 10;

    });

    doc.save(
        "FreelanceHub-Report.pdf"
    );

});
function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.opacity = "1";

    setTimeout(() => {

        toast.style.opacity = "0";

    }, 3000);

}
exportBackupBtn.addEventListener("click", () => {

    const backupData = {

        clients,
        projects,
        tasks

    };

    const blob = new Blob(
        [
            JSON.stringify(backupData, null, 2)
        ],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "FreelanceHub_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

    showToast("📤 Backup exported!");

});
importBackupBtn.addEventListener("click", () => {

    importBackupFile.click();

});

importBackupFile.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data =
            JSON.parse(event.target.result);

        clients = data.clients || [];

        projects = data.projects || [];

        tasks = data.tasks || [];

        localStorage.setItem(
            "clients",
            JSON.stringify(clients)
        );

        localStorage.setItem(
            "projects",
            JSON.stringify(projects)
        );

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        renderClients();
        renderProjects();
        updateDashboard();
        updateFinance();

        showToast("📥 Backup restored!");

    };

    reader.readAsText(file);

});