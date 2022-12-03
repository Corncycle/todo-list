import { DOMSidebar } from "./dom/DOMSidebar.js";
import { ProjectsManager } from "./internal/projectsManager.js";

import circleSvg from "../images/circle.svg";

export class EventHandler {
    constructor() {
        this.projectsManager = new ProjectsManager();
        this.domSidebar = new DOMSidebar();

        this.addProject("Sample Project", circleSvg, "inbox");
        this.addProject("Another Project", circleSvg, "projects");
        this.addProject("Yet Another Project", circleSvg, "projects");
        this.domSidebar.render();
    }

    addProject(name, imgPath, section) {
        this.projectsManager.addProject(name);
        this.domSidebar.createProject(name, imgPath, section, this);
    }

    removeProject(name) {
        this.projectsManager.removeProject(name);
        this.domSidebar.removeProject(name);
        this.domSidebar.render();
    }

    clickProject(name) {
        console.log("You clicked project " + name);
    }
}