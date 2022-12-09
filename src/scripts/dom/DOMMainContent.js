import { relativeTimeString } from "../util.js";
import { Project } from "../internal/project.js";

export class DOMMainContent {
    constructor(eventHandler) {
        this.specialProjects = ["Today", "This Week", "All Tasks"];
        this.root = document.querySelector(".main-content.container");
        this.eventHandler = eventHandler;
    }

    render(project) {
        let titleElement = this.createTitleElement(project);
        let tasksElement = this.createTasksElement(project);
        this.root.replaceChildren(titleElement, tasksElement);
    }

    createTitleElement(project) {
        let wrapper = document.createElement("div");
        wrapper.classList.add("main-content-wrapper", "container");
        let elm = document.createElement("h2");
        elm.classList.add("main-content", "title");
        elm.innerText = project.name;
        wrapper.append(elm)
        if (!Project.specialProjects.includes(project.name)) {
            let button = document.createElement("button");
            button.classList.add("project-title-button");
            wrapper.append(button);
            button.addEventListener("click", e => {
                this.eventHandler.removeProject(project.name);
            });
        }
        return wrapper;
    }

    createTasksElement(project) {
        let elm = document.createElement("div");
        elm.classList.add("task-list", "container", "vertical");
        let tasks = project.tasks;
        if (tasks.length == 0) {
            elm.innerText = "No tasks assigned yet.";
            return elm;
        }
        for (let i = 0; i < tasks.length; i++) {
            if (i > 0) {
                elm.append(this.createTaskDivider());
            }
            elm.appendChild(this.createTaskElement(tasks[i]));
        }
        return elm;
    }

    createTaskElement(task) {
        let elm = document.createElement("div");
        elm.classList.add("task", "container", "vertical");
        let header = document.createElement("div");
        header.classList.add("task-header", "container");
        
        let checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        let title = document.createElement("h4");
        title.innerText = task.name;
        title.classList.add("task-header", "title");
        let date = document.createElement("span");
        date.innerText = relativeTimeString(task.date);
        date.classList.add("task-date")
        let priority = document.createElement("div");
        priority.classList.add("task-priority");
        priority.classList.add("p-" + task.priority);
        header.append(checkBox, title, date, priority);
        elm.append(header);
        if (task.description) {
            let desc = document.createElement("p");
            desc.innerText = task.description;
            desc.classList.add("task-desc");
            elm.append(desc);
        }

        if (task.checked) {
            elm.classList.add("completed");
            checkBox.checked = true;
        };

        elm.addEventListener("mouseenter", e => {
            priority.classList.add("hover");
            date.innerText = task.project.name;
        });

        elm.addEventListener("mouseleave", e => {
            priority.classList.remove("hover");
            date.innerText = relativeTimeString(task.date);
        });

        priority.addEventListener("click", e => {
            this.eventHandler.deleteTask(task);
        });

        checkBox.addEventListener("click", e => {
            elm.classList.toggle("completed");
            task.checked = !task.checked;
            this.eventHandler.updateLocalStorage();
        });

        return elm;
    }

    createTaskDivider() {
        let elm = document.createElement("hr");
        elm.classList.add("task-divider");
        return elm;
    }
}