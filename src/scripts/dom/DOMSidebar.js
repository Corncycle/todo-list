export class DOMSidebar {
    constructor() {
        this.root = document.querySelector(".sidebar.container");
        this.content = [];
    };

    render() {
        this.content.forEach(elm => {
            this.root.appendChild(elm);
        });
    }

    generateSkeleton() {
        let _, inboxContainer, projectsContainer;
        [_, inboxContainer] = this.createSection("Inbox");
        [_, projectsContainer] = this.createSection("Projects");
        this.containers = {"inbox": inboxContainer, "projects": projectsContainer};
    }

    createSection(name) {
        let header = document.createElement("h3");
        header.innerText = name;
        this.content.push(header);

        let sectionContainer = document.createElement("div");
        sectionContainer.classList.add("sidebar-section", "container");
        this.content.push(sectionContainer);
        
        return [header, sectionContainer];
    }

    createProject(name, icon, parentContainer) {
    }

    logMessage() {
        console.log("You're logging here!");
        console.log(DOMSidebar.sProperty);
    }
}