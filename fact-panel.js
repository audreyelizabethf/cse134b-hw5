 const sampleFacts = [
        {text: "Unlike knitting, true crochet has never been fully replicated by machines, which means crochet products are always made by hand.", source:"Crochet facts"},
        {text: "\"Amigurumi\" is the Japanese word for small crocheted or knitted stuffed toys.", source:"Crochet facts"},
        
        {text: "Clay shrinks as it dries and fires, often by around 10-15%.", source:"Pottery facts"},
        {text: "Stoneware is usually fired to around 2,200°F or hotter", source:"Pottery facts"},
    ];
    

class FactPanel extends HTMLElement {
    connectedCallback() {
        this.heading = document.createElement("h3")
        this.heading.textContent = "Did you know...";

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

        this.index = 0;
        this.nextButton.addEventListener("click", () => this.showNext());

        this.render();
    }

    render() {
        const fact = sampleFacts[this.index];
        this.factText.textContent = fact.text;
        this.details.textContent = `Source: ${fact.source}`;
        this.status.textContent = `Fact ${this.index + 1} of ${sampleFacts.length}`;
    }

    showNext() {
        this.index = (this.index + 1) % sampleFacts.length;
        this.render();
        this.updateCompact();
    }

    static observedAttributes = ["compact"];

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "compact") {
            this.updateCompact();
        }
    }

    updateCompact() {
        if(!this.details) return;
        this.details.hidden = this.hasAttribute("compact");
    }
}

customElements.define("fact-panel", FactPanel);

const panel = document.querySelector("fact-panel");
const compactToggle = document.querySelector("#compact-toggle");

compactToggle.hidden = false;

compactToggle.addEventListener("click", () => {
    panel.toggleAttribute("compact");
    compactToggle.setAttribute("aria-pressed", panel.hasAttribute("compact"));
});