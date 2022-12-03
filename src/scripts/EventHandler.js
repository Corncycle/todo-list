import { DOMSidebar } from "./dom/DOMSidebar.js";
import { DOMMainContent } from "./dom/DOMMainContent.js";
import { ProjectsManager } from "./internal/projectsManager.js";

import starSvg from "../images/star.svg";
import weekSvg from "../images/week.svg";
import viewListSvg from "../images/view-list.svg";
import circleSvg from "../images/circle.svg";

export class EventHandler {
    constructor() {
        this.projectsManager = new ProjectsManager();
        this.domSidebar = new DOMSidebar();
        this.domMainContent = new DOMMainContent();

        this.addProject("Today", starSvg, "inbox");
        this.addProject("This Week", weekSvg, "inbox");
        this.addProject("All Tasks", viewListSvg, "inbox");
        this.addProject("Another Project", circleSvg, "projects");
        this.addProject("Yet Another Project", circleSvg, "projects");
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
        this.domSidebar.selectProject(name);
        this.domMainContent.render(this.projectsManager.getProject(name));
    }
}