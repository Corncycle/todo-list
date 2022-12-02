import { Project } from "./project.js";

export class ProjectsManager {
    constructor() {
        this.projects = [];
    }

    addProject(name) {
        this.projects.push(new Project(name));
        return this.projects[this.projects.length - 1];
    }
}