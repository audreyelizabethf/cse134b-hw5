//  const sampleFacts = [
//         {text: "Unlike knitting, true crochet has never been fully replicated by machines, which means crochet products are always made by hand.", source:"Crochet facts"},
//         {text: "\"Amigurumi\" is the Japanese word for small crocheted or knitted stuffed toys.", source:"Crochet facts"},
        
//         {text: "Clay shrinks as it dries and fires, often by around 10-15%.", source:"Pottery facts"},
//         {text: "Stoneware is usually fired to around 2,200°F or hotter", source:"Pottery facts"},
//     ];

const FACT_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
    
class FactPanel extends HTMLElement {
    connectedCallback() {
        this.heading = document.createElement("h3")
        this.heading.textContent = "Did you know...";

        this.factText = document.createElement("p");
        this.factText.className = "fact-text";

        this.details = document.createElement("p");
        this.details.className = "fact-details";

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

        this.count = 0;
        this.loading = false;

        this.nextButton.addEventListener("click", () => this.loadFact());

        this.updateCompact();
        this.loadFact();
    }

    async loadFact() {
        if (this.loading) return;
        this.loading = true;
        this.nextButton.setAttribute("aria-disabled", "true");
        this.status.classList.remove("is-error");
        this.status.textContent = "Loading a new fact...";

        try {
            const response = await fetch(FACT_URL);

            if(!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();

            if (typeof data?.text !== "string" || data.text.trim() === "" || typeof data?.source !== "string") {
                throw new Error("Unexpected response format.");
            }

            this.count = this.count + 1;
            this.factText.textContent = data.text;
            this.details.textContent = `Source: ${data.source}`;
            this.status.textContent = `New fact loaded (${this.count} this visit).`;
            this.nextButton.textContent = "Next fact";
        }

        catch (error) {
            console.error("Could not load a fact.", error);
            this.status.textContent = "Sorry, we couldn't load a fact. Check your connection and try again.";
            this.status.classList.add("is-error");
            this.nextButton.textContent = "Try again";
        }

        finally {
            this.loading = false;
            this.nextButton.removeAttribute("aria-disabled");
        }
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
const MODE_KEY = "hw5-fact-panel-mode";

function applyMode(mode) {
    panel.toggleAttribute("compact", mode === "compact");
    compactToggle.setAttribute("aria-pressed", mode === "compact");
}

function loadMode() {
    try {
        const saved = localStorage.getItem(MODE_KEY);
        if (saved === "compact" || saved === "expanded") {
            return saved;
        }
    }
    catch (error) {
        console.warn("Could not read the fact panel preference.", error);
    }
    return "expanded";
}

function saveMode(mode) {
    try {
        localStorage.setItem(MODE_KEY, mode);
    }
    catch (error) {
        console.warn("Could not save the fact panel preference.", error);
    }
}

applyMode(loadMode());
compactToggle.hidden = false;


compactToggle.addEventListener("click", () => {
    const newMode = panel.hasAttribute("compact") ? "expanded" : "compact";
    applyMode(newMode);
    saveMode(newMode);
});