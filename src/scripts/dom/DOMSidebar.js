import inboxSvg from "../../images/inbox.svg";
import projectsSvg from "../../images/projects.svg"

export class DOMSidebar {
    constructor() {
        this.root = document.querySelector(".sidebar.container");
        this.content = [];
        this.generateSkeleton();
    };

    render() {
        this.content.forEach(elm => {
            this.root.appendChild(elm);
        });
    }

    generateSkeleton() {
        let inboxTitle, projectsTitle, inboxContainer, projectsContainer;
        [inboxTitle, inboxContainer] = this.createSection("Inbox", inboxSvg);
        this.content.push(inboxTitle, inboxContainer);

        [projectsTitle, projectsContainer] = this.createSection("Projects", projectsSvg);
        this.content.push(projectsTitle, projectsContainer);

        this.userProjectsByName = {};
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

    createProject(name, imgPath, section, eventHandler) {
        let elementContainer = document.createElement("div");
        elementContainer.classList.add("sidebar-section-project", "container");
        elementContainer.setAttribute("data-name", name);
        
        let elementImage = document.createElement("img");
        elementImage.setAttribute("src", imgPath);
        
        let elementText = document.createElement("h4");
        elementText.innerText = name;

        elementContainer.append(elementImage, elementText);
        
        elementContainer.addEventListener("click", e => {
            eventHandler.clickProject(name);
        });

        this.containers[section].append(elementContainer);

        return elementContainer;
    }

    selectProject(name) {
        for (const section in this.containers) {
            for (const project of this.containers[section].children) {
                if (project.getAttribute("data-name") === name) {
                    project.classList.add("selected");
                } else {
                    project.classList.remove("selected");
                }
            }
        }
    }

    removeProject(name) {
        for (let elm of this.containers["projects"].children) {
            if (elm.getAttribute("data-name") === name) {
                this.containers["projects"].removeChild(elm);
            }
        }
    }
}