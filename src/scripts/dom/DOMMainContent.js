import circleSvg from "../../images/filled-circle-Z.svg";

export class DOMMainContent {
    constructor() {
        this.specialProjects = ["Today", "This Week", "All Tasks"];
        this.root = document.querySelector(".main-content.container");
    }

    render(project) {
        let titleElement = this.createTitleElement(project);
        let tasksElement = this.createTasksElement(project);
        this.root.replaceChildren(titleElement, tasksElement);
    }

    createTitleElement(project) {
        let elm = document.createElement("h2");
        elm.classList.add("main-content", "title");
        elm.innerText = project.name;
        return elm;
    }

    createTasksElement(project) {
        let elm = document.createElement("div");
        elm.classList.add("task-list", "container", "vertical");
        if (project.tasks.length == 0) {
            elm.innerText = "No tasks assigned yet.";
            return elm;
        }
        for (let i = 0; i < project.tasks.length; i++) {
            if (i > 0) {
                elm.append(this.createTaskDivider());
            }
            elm.appendChild(this.createTaskElement(project.tasks[i]));
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
        date.innerText = task.date;
        date.classList.add("task-date")
        let priority = document.createElement("svg");
        priority.innerHTML = circleSvg;
        priority.classList.add("task-priority");
        header.append(checkBox, title, date, priority);
        elm.append(header);
        
        if (task.description) {
            let desc = document.createElement("p");
            desc.innerText = task.description;
            desc.classList.add("task-desc");
            elm.append(desc);
        }
        return elm;
    }

    createTaskDivider() {
        let elm = document.createElement("hr");
        elm.classList.add("task-divider");
        return elm;
    }
}