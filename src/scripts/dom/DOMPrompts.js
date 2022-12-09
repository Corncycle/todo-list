export class DOMPrompts {
    constructor(eventHandler) {
        this.root = document.body;
        this.eventHandler = eventHandler;
    }

    buildPromptBase() {
        let wrapper = document.createElement("div");
        wrapper.classList.add("prompt-wrapper");

        let remover = document.createElement("div");
        remover.classList.add("prompt-remover");
        remover.addEventListener("click", e => {
            wrapper.remove();
        });

        let container = document.createElement("div");
        container.classList.add("prompt", "container", "vertical");
        wrapper.append(remover, container)
        return [wrapper, container];
    }

    buildPromptTitle(name) {
        let title = document.createElement("h2");
        title.innerText = name;
        title.classList.add("prompt-title");

        return title;
    }

    buildNewProjectPrompt() {
        let [wrapper, container] = this.buildPromptBase();
        container.append(this.buildPromptTitle("New Project"));

        let form = document.createElement("form");
        form.classList.add("prompt-form", "container");
        container.append(form);

        let titleInput = this.makeTextInput("Project Name", true);
        let confirmButton = this.makeButton("Add Project");
        form.append(titleInput, confirmButton);
        titleInput.addEventListener("input", e => {
            let issue = this.eventHandler.contestProjectName(titleInput.value);
            titleInput.setCustomValidity(issue);
        });

        confirmButton.addEventListener("click", e => {
            if (titleInput.validity.valid) {
                e.preventDefault();
                let issue = this.eventHandler.contestProjectName(titleInput.value);
                if (!issue) {
                    this.eventHandler.addProject(titleInput.value, null, "projects");
                    wrapper.remove();
                }
            }
        });

        this.root.append(wrapper);
    }

    buildNewTaskPrompt(currentProject, userProjects) {
        let [wrapper, container] = this.buildPromptBase();
        container.append(this.buildPromptTitle("New Task"));

        let form = document.createElement("form");
        form.classList.add("prompt-form", "container", "vertical");
        container.append(form);

        let rows = [];
        for (let i = 0; i < 3; i++) {
            rows.push(document.createElement("div"));
            rows[i].classList.add("prompt-row", "container");
            form.append(rows[i]);
        }
        let taskInput = this.makeTextInput("Task Name", true)
        let dateInput = this.makeDateInput("Date", true)
        let prioSelector = this.makeDropdownIput(true, true, "--Priority--", "High", "Medium", "Low");
        prioSelector.classList.add("priority");
        rows[0].append(taskInput, dateInput, prioSelector);
        let descInput = this.makeTextInput("Description (optional)");
        let projectNames = userProjects.map(proj => proj.name);
        projectNames = projectNames.concat(["Uncategorized"]);
        let projectInput = this.makeDropdownIput(true, false, "--Project--", ...projectNames);
        projectInput.childNodes.forEach(child => {
            if (child.innerText == currentProject.name) {
                child.setAttribute("selected", "");
            }
        });
        rows[1].append(descInput, projectInput);
        let confirmButton = this.makeButton("Add Task");
        confirmButton.addEventListener("click", e => {
            if (taskInput.validity.valid && 
                dateInput.validity.valid && 
                prioSelector.validity.valid &&
                projectInput.validity.valid) {
                e.preventDefault();
                this.eventHandler.addTask(projectInput.value, taskInput.value, dateInput.value, descInput.value, prioSelector.value);
                wrapper.remove();
            }
        });
        rows[2].append(confirmButton);
        rows[2].classList.add("prompt-final-row");
        
        this.root.append(wrapper);
    }

    makeTextInput(text, required) {
        let elm = document.createElement("input");
        elm.classList.add("prompt", "input");
        elm.setAttribute("placeholder", text);
        elm.setAttribute("type", "text");
        if (required) {
            elm.setAttribute("required", "");
        }

        return elm;
    }

    makeDateInput(text, defaultToday) {
        let elm = document.createElement("input");
        elm.classList.add("prompt", "input");
        elm.setAttribute("type", "date");
        if (defaultToday) {
            let d = new Date();
            elm.value = d.toLocaleDateString("en-CA");
        }
        elm.setAttribute("required", "");

        return elm;
    }

    makeDropdownIput(required, makeLowercase, text, ...options) {
        let elm = document.createElement("select");
        if (text) {
            let defOpt = document.createElement("option");
                defOpt.setAttribute("value", "");
                defOpt.innerText = text;
                elm.append(defOpt);
        }
        for (let st of options) {
            let opt = document.createElement("option");
            if (makeLowercase) {
                opt.setAttribute("value", st.toLowerCase());
            } else {
                opt.setAttribute("value", st);
            }
            opt.innerText = st;
            elm.append(opt);
        }
        if (required) {
            elm.setAttribute("required", "");
        }
        return elm
    }

    makeButton(text) {
        let elm = document.createElement("button");
        elm.innerText = text;
        return elm;
    }
}