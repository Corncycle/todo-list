import { Project } from "./project.js";

export class ProjectsManager {
    constructor() {
        this._projects = [];
    }

    get projects() {
        return this._projects;
    }

    addProject(name) {
        for (const project of this._projects) {
            if (project.name === name) {
                return false
            }
        }
        this._projects.push(new Project(name));
        return this._projects[this._projects.length - 1];
    }

    removeProject(name) {
        for (let i = 0; i < this._projects.length; i++) {
            if (this._projects[i].name === name) {
                this._projects.pop(i);
                return
            }
        }
    }

    getProject(name) {
        for (let i = 0; i < this._projects.length; i++) {
            if (this._projects[i].name === name) {
                return this._projects[i]               
            }
        }
        return false;
    }

    getUserProjects(name) {
        let omit = ["Today", "This Week", "All Tasks"]
        return this._projects.filter(proj => !omit.includes(proj.name));
    }
}