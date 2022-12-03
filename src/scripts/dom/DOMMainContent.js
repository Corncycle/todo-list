export class DOMMainContent {
    constructor() {
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
        elm.classList.add("main-content", "body");
        elm.innerText = "No tasks assigned yet.";
        return elm;
    }
}