const openTaskModal = document.getElementById("openTaskModal");
const closeTaskModal = document.getElementById("closeTaskModal");
const taskModal = document.getElementById("taskModal");

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const taskTitle = document.getElementById("taskTitle");
const taskSubject = document.getElementById("taskSubject");
const taskTime = document.getElementById("taskTime");

const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

const progressPercentage =
    document.getElementById("progressPercentage");

const progressCompleted =
    document.getElementById("progressCompleted");

const progressRemaining =
    document.getElementById("progressRemaining");


// =========================
// TASK DATA
// =========================

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// =========================
// OPEN MODAL
// =========================

openTaskModal.addEventListener("click", () => {
    taskModal.classList.add("active");
    taskTitle.focus();
});


// =========================
// CLOSE MODAL
// =========================

closeTaskModal.addEventListener("click", () => {
    taskModal.classList.remove("active");
});


// Close modal when clicking outside

taskModal.addEventListener("click", (event) => {

    if (event.target === taskModal) {
        taskModal.classList.remove("active");
    }

});


// =========================
// ADD TASK
// =========================

taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const newTask = {
        id: Date.now(),

        title: taskTitle.value.trim(),

        subject: taskSubject.value,

        time: Number(taskTime.value),

        completed: false
    };

   tasks.push(newTask);

localStorage.setItem(
    "studyTasks",
    JSON.stringify(tasks)
);

renderTasks();

    taskForm.reset();

    taskModal.classList.remove("active");

});


// =========================
// RENDER TASKS
// =========================

function renderTasks() {

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📋
                </div>

                <h3>No tasks yet</h3>

                <p>
                    Add your first study task
                    for today.
                </p>

            </div>
        `;

        updateStats();

        return;
    }


    taskList.innerHTML = "";


    tasks.forEach((task) => {

        const taskElement =
            document.createElement("div");

        taskElement.className = "task-item";


        if (task.completed) {
            taskElement.classList.add("completed");
        }


        taskElement.innerHTML = `

            <div
                class="task-checkbox ${
                    task.completed ? "completed" : ""
                }"
                data-id="${task.id}"
            >
                ${task.completed ? "✓" : ""}
            </div>


            <div class="task-content">

                <h3>${task.title}</h3>

                <p>
                    ${task.subject} •
                    ${task.time} minutes
                </p>

            </div>


            <button
                class="delete-task"
                data-id="${task.id}"
            >
                ×
            </button>

        `;


        taskList.appendChild(taskElement);

    });


    updateStats();
}


// =========================
// COMPLETE TASK
// =========================

taskList.addEventListener("click", (event) => {

    const checkbox =
        event.target.closest(".task-checkbox");


    if (!checkbox) {
        return;
    }


    const taskId =
        Number(checkbox.dataset.id);


    const task =
        tasks.find((task) => task.id === taskId);


  if (task) {
    task.completed = !task.completed;

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );
}

renderTasks();

});


// =========================
// DELETE TASK
// =========================

taskList.addEventListener("click", (event) => {

    const deleteButton =
        event.target.closest(".delete-task");


    if (!deleteButton) {
        return;
    }


    const taskId =
        Number(deleteButton.dataset.id);


  tasks = tasks.filter(
    (task) => task.id !== taskId
);

localStorage.setItem(
    "studyTasks",
    JSON.stringify(tasks)
);

renderTasks();

});


// =========================
// UPDATE STATISTICS
// =========================

function updateStats() {

    const totalTasks = tasks.length;


    const completedTasks =
        tasks.filter(
            (task) => task.completed
        ).length;


    const remainingTasks =
        totalTasks - completedTasks;


    let percentage = 0;


    if (totalTasks > 0) {

        percentage =
            Math.round(
                (completedTasks / totalTasks) * 100
            );

    }


    taskCount.textContent = totalTasks;

    completedCount.textContent =
        completedTasks;


    progressPercentage.textContent =
        `${percentage}%`;


    progressCompleted.textContent =
        completedTasks;


    progressRemaining.textContent =
        remainingTasks;


    updateProgressCircle(percentage);

}


// =========================
// UPDATE PROGRESS CIRCLE
// =========================

function updateProgressCircle(percentage) {

    const degrees =
        percentage * 3.6;


    document.querySelector(
        ".progress-circle"
    ).style.background = `
        conic-gradient(
            var(--primary) ${degrees}deg,
            #eef2ff ${degrees}deg
        )
    `;

}


// =========================
// INITIAL RENDER
// =========================

renderTasks(); 
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const sectionId = item.dataset.section;

        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});