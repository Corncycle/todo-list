import { Task } from "./task.js";
import { todayString } from "../util.js";

export class Project {
    constructor(name, projectsManager) {
        this.name = name;
        this._tasks = [];
        this.projectsManager = projectsManager;
    }

    static specialProjects = ["Today", "This Week", "All Tasks", "Uncategorized"];

    get tasks() {
        if (Project.specialProjects.includes(this.name)) {
            let allTasks = this.projectsManager.getAllTasks();
            if (this.name === "All Tasks") {
                return allTasks;
            } else if (this.name === "Today") {
                let allTasks = this.projectsManager.getAllTasks();
                return allTasks.filter(task => task.date.toLocaleDateString("en-CA") === todayString());
            }
            return [];
        }
        return this._tasks;
    }

    add(task) {
        this._tasks.push(task);
        return task;
    }

    addNew(name, date, description, priority, checked) {
        this._tasks.push(new Task(name, date, description, priority, checked));
        return this._tasks[this._tasks.length - 1];
    }

    remove(task) {
        let index = this._tasks.indexOf(task);
        if (index != -1) {
            this._tasks.splice(index, 1);
        }
        return task;
    }
}