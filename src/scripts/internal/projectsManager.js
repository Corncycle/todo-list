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
        this._projects.push(new Project(name, this));
        return this._projects[this._projects.length - 1];
    }

    removeProject(name) {
        for (let i = 0; i < this._projects.length; i++) {
            if (this._projects[i].name === name) {
                this._projects.splice(i, 1);
                return
            }
        }
    }

    getProject(name) {
        console.log("looking for " + name + " in ");
        console.log(this._projects);
        for (let i = 0; i < this._projects.length; i++) {
            if (this._projects[i].name === name) {
                return this._projects[i]               
            }
        }
        return false;
    }

    getInboxProjects() {
        let names = Project.specialProjects;
        return this._projects.filter(proj => names.includes(proj.name));
    }

    getUserProjects() {
        let omit = Project.specialProjects;
        return this._projects.filter(proj => !omit.includes(proj.name));
    }
    
    getAllTasks() {
        let tasks = [];
        let projectsWithTasks = this.getUserProjects();
        projectsWithTasks.concat([this.getProject("Uncategorized")]);
        let uncat = this.getProject("Uncategorized");
        projectsWithTasks = projectsWithTasks.concat([uncat]);
        projectsWithTasks.forEach(proj => {
            tasks = tasks.concat(proj.tasks);
        });
        return tasks;
    }
}