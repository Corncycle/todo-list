import inboxSvg from "../../images/inbox.svg";
import projectsSvg from "../../images/projects.svg"
import { Project } from "../internal/project.js";

import starSvg from "../../images/star.svg";
import weekSvg from "../../images/week.svg";
import viewListSvg from "../../images/view-list.svg";
import circleSvg from "../../images/circle.svg";

export class DOMSidebar {
    constructor(eventHandler) {
        this.root = document.querySelector(".sidebar.container");
        this.content = []
        this.eventHandler = eventHandler;
        this.generateSkeleton();
    }

    static specialImages = {
        "Today": starSvg,
        "This Week": weekSvg,
        "All Tasks": viewListSvg,
    };

    render(projectsManager) {
        for (let cont in this.containers) {
            let c = this.containers[cont];
            while (c.firstChild) {
                c.removeChild(c.firstChild);
            }
        }
        projectsManager.projects.forEach(proj => {
            if (proj.name != "Uncategorized") {
                if (Project.specialProjects.includes(proj.name)) {
                    let projElm = this.createProject(proj.name, DOMSidebar.specialImages[proj.name], "inbox", this.eventHandler);
                    this.containers["inbox"].append(projElm);
                    if (proj.name == this.selectectedProject) {
                        projElm.classList.add("selected");
                    }
                } else {
                    let projElm = this.createProject(proj.name, circleSvg, "projects", this.eventHandler);
                    this.containers["projects"].append(projElm);
                    if (proj.name == this.selectectedProject) {
                        projElm.classList.add("selected");
                    }
                }
            }
        });
        this.content.forEach(elm => {
            this.root.append(elm);
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
        this.selectectedProject = name;
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