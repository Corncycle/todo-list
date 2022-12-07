import { DOMSidebar } from "./dom/DOMSidebar.js";
import { DOMMainContent } from "./dom/DOMMainContent.js";
import { DOMPrompts } from "./dom/DOMPrompts.js";
import { ProjectsManager } from "./internal/projectsManager.js";

import starSvg from "../images/star.svg";
import weekSvg from "../images/week.svg";
import viewListSvg from "../images/view-list.svg";
import circleSvg from "../images/circle.svg";

export class EventHandler {
    constructor() {
        this.projectsManager = new ProjectsManager();
        this.domSidebar = new DOMSidebar();
        this.domMainContent = new DOMMainContent(this);
        this.domPrompts = new DOMPrompts(this);

        this.addProject("Today", starSvg, "inbox");
        this.addProject("This Week", weekSvg, "inbox");
        this.addProject("All Tasks", viewListSvg, "inbox");
        this.addProject("Another Project", circleSvg, "projects");
        this.addProject("Yet Another Project", circleSvg, "projects");

        this.clickProject("Today");
        this.domSidebar.render();
    }

    addProject(name, imgPath, section) {
        let success = this.projectsManager.addProject(name);
        if (!success) {
            console.log("There is already a project with that name!");
            return;
        }
        this.domSidebar.createProject(name, imgPath, section, this);
        this.domSidebar.render();
    }

    removeProject(name) {
        this.projectsManager.removeProject(name);
        this.domSidebar.removeProject(name);
        this.domSidebar.render();
    }

    clickProject(name) {
        this.currentProject = this.projectsManager.getProject(name);
        this.domSidebar.selectProject(name);
        this.domMainContent.render(this.currentProject);
    }

    addTask(name, date, description, priority) {
        this.currentProject.addNew(name, date, description, priority, false);
        this.domMainContent.render(this.currentProject);
    }

    deleteTask(task) {
        this.currentProject.remove(task);
        this.domMainContent.render(this.currentProject);
    }

    promptNewTask() {
        this.domPrompts.buildNewTaskPrompt(this.currentProject, this.projectsManager.getUserProjects());
    }
}