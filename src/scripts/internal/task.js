export class Task {
    constructor(name, date, description, priority, checked) {
        this.name = name;
        // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
        this.date = new Date(date.replace(/-/g, '\/'));
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