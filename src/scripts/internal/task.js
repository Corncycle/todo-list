export class Task {
    constructor(name, date, description, priority, checked) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.priority = priority;
        this.checked = checked;
        this.id = Task.generateId();
    }

    static idGenerator = 0;
    static generateId() {
        this.idGenerator += 1;
        return this.idGenerator;
    }
}