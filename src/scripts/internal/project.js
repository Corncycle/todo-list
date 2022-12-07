import { Task } from "./task.js";

export class Project {
    constructor(name) {
        this.name = name;
        this._tasks = [];
    }

    static specialProjects = ["Today", "This Week", "All Tasks"];

    get tasks() {
        if (Project.specialProjects.includes(this.name)) {
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