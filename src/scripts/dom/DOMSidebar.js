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
        [_, inboxContainer] = this.createSection("Inbox", "../../images/inbox.svg");
        this.content.push(_, inboxContainer);

        [_, projectsContainer] = this.createSection("Projects", "../../images/projects.svg");
        this.content.push(_, inboxContainer);

        this.containers = {"inbox": inboxContainer, "projects": projectsContainer};
    }

    createSection(name, imgPath) {
        let header = this.createSectionHeader(name, imgPath);

        let sectionContainer = document.createElement("div");
        sectionContainer.classList.add("sidebar-section", "container");
        
        return [header, sectionContainer];
    }

    createSectionHeader(name, imgPath) {
        let headerContainer = document.createElement("div");
        headerContainer.classList.add("sidebar-section-header", "container");
        
        let headerImage = document.createElement("img");
        headerImage.setAttribute("src", imgPath);
        
        let headerText = document.createElement("h3");
        headerText.innerText = name;

        headerContainer.append(headerImage, headerText);
        return headerContainer;
    }

    createProject(name, icon, parentContainer) {
    }

    logMessage() {
        console.log("You're logging here!");
        console.log(DOMSidebar.sProperty);
    }
}