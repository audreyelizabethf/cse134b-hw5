class FactPanel extends HTMLElement {
    
    connectedCallback() {
        this.heading = document.createElement("h3")
        this.heading.textContent = "Useless Fact";

        this.factText = document.createElement("p");
        this.factText.className = "fact-text";

        this.details = document.createElement("p");
        this.details.className - "fact-details";

        this.nextButton = document.createElement("button");
        this.nextButton.type = "button";
        this.nextButton.textContent = "Next fact";

        this.status = document.createElement("p");
        this.status.className = "fact-status";
        this.status.setAttribute("role", "status");

        this.appendChild(this.heading);
        this.appendChild(this.factText);
        this.appendChild(this.details);
        this.appendChild(this.nextButton);
        this.appendChild(this.status);

        this.factText.textContent = "Test if facts will show up (coming soon)"
    }
}

customElements.define("fact-panel", FactPanel);