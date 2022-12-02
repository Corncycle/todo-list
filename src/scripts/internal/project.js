import { Task } from "./task.js";

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    add(task) {
        this.tasks.push(task);
        return task;
    }

    addNew(name, date, description, priority, checked) {
        this.tasks.push(new Task(name, date, description, priority, checked));
        return this.tasks[this.tasks.length - 1];
    }

    remove(task) {
        let index = this.tasks.indexOf(task);
        if (index != -1) {
            this.tasks.pop(index);
        }
        return task;
    }
}