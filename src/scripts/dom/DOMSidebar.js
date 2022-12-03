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
        for (const section in this.containers) {
            for (const project in this.containersContent[section]) {
                this.containers[section].append(this.containersContent[section][project]);
            }
        }
    }

    generateSkeleton() {
        let inboxTitle, projectsTitle, inboxContainer, projectsContainer;
        [inboxTitle, inboxContainer] = this.createSection("Inbox", inboxSvg);
        this.content.push(inboxTitle, inboxContainer);

        [projectsTitle, projectsContainer] = this.createSection("Projects", projectsSvg);
        this.content.push(projectsTitle, projectsContainer);

        this.userProjectsByName = {};
        this.containers = {"inbox": inboxContainer, "projects": projectsContainer};
        this.containersContent = {"inbox": {}, "projects": {}};
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
        
        let elementImage = document.createElement("img");
        elementImage.setAttribute("src", imgPath);
        
        let elementText = document.createElement("h4");
        elementText.innerText = name;

        elementContainer.append(elementImage, elementText);

        this.containersContent[section][name] = elementContainer;
        
        elementContainer.addEventListener("click", e => {
            eventHandler.clickProject(name);
        });

        return elementContainer;
    }

    selectProject(name) {
        for (const section in this.containers) {
            for (const project in this.containersContent[section]) {
                if (project === name) {
                    this.containersContent[section][project].classList.add("selected");
                } else {
                    this.containersContent[section][project].classList.remove("selected");
                }
            }
        }
    }

    removeProject(name) {
        delete this.containersContent["projects"][name];
    }
}