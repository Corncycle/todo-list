import { Project } from "./project.js";

export class ProjectsManager {
    constructor() {
        this.projects = [];
    }

    addProject(name) {
        this.projects.push(new Project(name));
        return this.projects[this.projects.length - 1];
    }

    removeProject(name) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].name === name) {
                this.projects.pop(i);
                return
            }
        }
    }
}