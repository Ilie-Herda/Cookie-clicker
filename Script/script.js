// Volledige werkende Cookie Clicker game (JS-klasse)
class Game {
    constructor() {
        this.resetValues();
        this.loadGame();
        this.getElements();
        this.attachEvents();
        this.updateUI();
        this.startAutoClickers();
    }

    resetValues() {
        this.cookie = 0;
        this.cookiePerClick = 1;
        this.upgradeCost = 10;
        this.autoClickers = 0;
        this.autoClickerCost = 50;
        this.grandma = 0;
        this.grandmaCost = 100;
        this.farm = 0;
        this.farmCost = 500;
        this.factory = 0;
        this.factoryCost = 2500;
        this.cookieMultiplier = 1;
        this.multiplierCost = 1000;
        this.totalClicks = 0;
        this.totalCookiesEarned = 0;
        this.achievementsUnlocked = [];
    }

    loadGame() {
        this.cookie = parseFloat(localStorage.getItem("cookies")) || this.cookie;
        this.cookiePerClick = parseInt(localStorage.getItem("cookiesPerClick")) || this.cookiePerClick;
        this.upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || this.upgradeCost;
        this.autoClickers = parseInt(localStorage.getItem("autoClickers")) || this.autoClickers;
        this.autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || this.autoClickerCost;
        this.grandma = parseInt(localStorage.getItem("grandma")) || this.grandma;
        this.grandmaCost = parseInt(localStorage.getItem("grandmaCost")) || this.grandmaCost;
        this.farm = parseInt(localStorage.getItem("farm")) || this.farm;
        this.farmCost = parseInt(localStorage.getItem("farmCost")) || this.farmCost;
        this.factory = parseInt(localStorage.getItem("factory")) || this.factory;
        this.factoryCost = parseInt(localStorage.getItem("factoryCost")) || this.factoryCost;
        this.cookieMultiplier = parseInt(localStorage.getItem("cookieMultiplier")) || this.cookieMultiplier;
        this.multiplierCost = parseInt(localStorage.getItem("multiplierCost")) || this.multiplierCost;
        this.totalClicks = parseInt(localStorage.getItem("totalClicks")) || this.totalClicks;
        this.totalCookiesEarned = parseFloat(localStorage.getItem("totalCookiesEarned")) || this.totalCookiesEarned;
        this.achievementsUnlocked = JSON.parse(localStorage.getItem("achievementsUnlocked")) || this.achievementsUnlocked;
    }

    getElements() {
        this.cookieElement = document.getElementById("cookie");
        this.counterElement = document.getElementById("counter");
        this.clickEarningsElement = document.getElementById("clickEarnings");
        this.autoEarningsElement = document.getElementById("autoEarnings");

        this.upgradeButton = document.getElementById("upgrade");
        this.autoClickerButton = document.getElementById("autoClicker");
        this.grandmaButton = document.getElementById("grandma");
        this.farmButton = document.getElementById("farm");
        this.factoryButton = document.getElementById("factory");

        this.resetButton = document.getElementById("reset");

        this.shopIcon = document.getElementById("shop-icon");
        this.shopPopup = document.getElementById("shop-popup");
        this.multiplierButton = document.getElementById("multiplier");
        this.clickBoostButton = document.getElementById("clickBoost");
        this.cheaperProductionButton = document.getElementById("cheaperProduction");
        this.closeShopButton = document.getElementById("close-shop");

        this.grandmaCount = document.getElementById("grandmaCount");
        this.farmCount = document.getElementById("farmCount");
        this.factoryCount = document.getElementById("factoryCount");

        this.statsIcon = document.getElementById("stats-icon");
        this.statsPopup = document.getElementById("stats-popup");
        this.closeStatsButton = document.getElementById("close-stats");

        this.achievementPopup = document.getElementById("achievement-popup");
        this.achievementText = document.getElementById("achievement-text");

        this.clickSound = document.getElementById("clickSound");
    }

    attachEvents() {
        this.cookieElement.addEventListener("click", () => this.clickCookie());
        this.upgradeButton.addEventListener("click", () => this.tryBuy("upgrade"));
        this.autoClickerButton.addEventListener("click", () => this.tryBuy("autoClicker"));
        this.grandmaButton.addEventListener("click", () => this.tryBuy("grandma"));
        this.farmButton.addEventListener("click", () => this.tryBuy("farm"));
        this.factoryButton.addEventListener("click", () => this.tryBuy("factory"));

        this.resetButton.addEventListener("click", () => this.resetGame());

        this.shopIcon.addEventListener("click", () => this.shopPopup.classList.toggle("hidden"));
        this.closeShopButton.addEventListener("click", () => this.shopPopup.classList.add("hidden"));

        this.multiplierButton.addEventListener("click", () => this.tryBuy("multiplier"));
        this.clickBoostButton.addEventListener("click", () => this.tryBuy("clickBoost"));
        this.cheaperProductionButton.addEventListener("click", () => this.tryBuy("cheaperProduction"));

        this.statsIcon.addEventListener("click", () => this.statsPopup.classList.toggle("hidden"));
        this.closeStatsButton.addEventListener("click", () => this.statsPopup.classList.add("hidden"));
    }

    clickCookie() {
        const earned = this.cookiePerClick * this.cookieMultiplier;
        this.cookie += earned;
        this.totalCookiesEarned += earned;
        this.totalClicks++;
        this.saveGame();
        this.updateUI();
    }

    tryBuy(type) {
        let success = false;
        switch (type) {
            case "upgrade":
                if (this.cookie >= this.upgradeCost) {
                    this.cookie -= this.upgradeCost;
                    this.cookiePerClick = Math.floor(this.cookiePerClick * (1 + this.cookieMultiplier));
                    this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
                    success = true;
                }
                break;
            case "autoClicker":
                if (this.cookie >= this.autoClickerCost) {
                    this.cookie -= this.autoClickerCost;
                    this.autoClickers++;
                    this.autoClickerCost = Math.floor(this.autoClickerCost * 1.8);
                    success = true;
                }
                break;
            case "grandma":
                if (this.cookie >= this.grandmaCost) {
                    this.cookie -= this.grandmaCost;
                    this.grandma++;
                    this.grandmaCost = Math.floor(this.grandmaCost * 1.5);
                    success = true;
                }
                break;
            case "farm":
                if (this.cookie >= this.farmCost) {
                    this.cookie -= this.farmCost;
                    this.farm++;
                    this.farmCost = Math.floor(this.farmCost * 1.8);
                    success = true;
                }
                break;
            case "factory":
                if (this.cookie >= this.factoryCost) {
                    this.cookie -= this.factoryCost;
                    this.factory++;
                    this.factoryCost = Math.floor(this.factoryCost * 2);
                    success = true;
                }
                break;
            case "multiplier":
                if (this.cookie >= this.multiplierCost) {
                    this.cookie -= this.multiplierCost;
                    this.cookieMultiplier *= 2;
                    this.multiplierCost = Math.floor(this.multiplierCost * 2.5);
                    success = true;
                }
                break;
            case "clickBoost":
                if (this.cookie >= 3000) {
                    this.cookie -= 3000;
                    this.cookiePerClick *= 2;
                    success = true;
                }
                break;
            case "cheaperProduction":
                if (this.cookie >= 4000) {
                    this.cookie -= 4000;
                    this.grandmaCost = Math.floor(this.grandmaCost * 0.8);
                    this.farmCost = Math.floor(this.farmCost * 0.8);
                    this.factoryCost = Math.floor(this.factoryCost * 0.8);
                    success = true;
                }
                break;
        }

        if (success) {
            this.saveGame();
            this.updateUI();
        }
    }

    updateUI() {
        this.counterElement.innerText = `Cookies: ${Math.floor(this.cookie)}`;
        this.clickEarningsElement.innerText = `Cookies per click: ${this.cookiePerClick * this.cookieMultiplier}`;
        this.autoEarningsElement.innerText = `Cookies per second: ${(this.autoClickers * 1 + this.grandma * 3 + this.farm * 6 + this.factory * 12) * this.cookieMultiplier}`;

        this.upgradeButton.innerText = `Upgrade Click Earnings (Cost: ${this.upgradeCost})`;
        this.autoClickerButton.innerText = `Buy Auto-Clicker (Cost: ${this.autoClickerCost})`;
        this.grandmaButton.innerText = `Buy Grandma's Bakery (Cost: ${this.grandmaCost})`;
        this.farmButton.innerText = `Buy Cookie Farm (Cost: ${this.farmCost})`;
        this.factoryButton.innerText = `Buy Cookie Factory (Cost: ${this.factoryCost})`;
        this.multiplierButton.innerText = `Buy x2 Multiplier (Cost: ${this.multiplierCost})`;

        if (this.grandmaCount) this.grandmaCount.textContent = this.grandma;
        if (this.farmCount) this.farmCount.textContent = this.farm;
        if (this.factoryCount) this.factoryCount.textContent = this.factory;

        document.getElementById("grandmaStats").innerText = `Grandmas (${this.grandma}): ${this.grandma * 3 * this.cookieMultiplier} cps`;
        document.getElementById("farmStats").innerText = `Farms (${this.farm}): ${this.farm * 6 * this.cookieMultiplier} cps`;
        document.getElementById("factoryStats").innerText = `Factories (${this.factory}): ${this.factory * 12 * this.cookieMultiplier} cps`;

        document.getElementById("totalClicks").innerText = `Totaal aantal klikken: ${this.totalClicks}`;
        document.getElementById("totalCookies").innerText = `Totaal aantal cookies verdiend: ${Math.floor(this.totalCookiesEarned)}`;
        document.getElementById("statsGrandmas").innerText = `Grandmas gekocht: ${this.grandma}`;
        document.getElementById("statsFarms").innerText = `Farms gekocht: ${this.farm}`;
        document.getElementById("statsFactories").innerText = `Factories gekocht: ${this.factory}`;
    }

    saveGame() {
        localStorage.setItem("cookies", this.cookie);
        localStorage.setItem("cookiesPerClick", this.cookiePerClick);
        localStorage.setItem("upgradeCost", this.upgradeCost);
        localStorage.setItem("autoClickers", this.autoClickers);
        localStorage.setItem("autoClickerCost", this.autoClickerCost);
        localStorage.setItem("grandma", this.grandma);
        localStorage.setItem("grandmaCost", this.grandmaCost);
        localStorage.setItem("farm", this.farm);
        localStorage.setItem("farmCost", this.farmCost);
        localStorage.setItem("factory", this.factory);
        localStorage.setItem("factoryCost", this.factoryCost);
        localStorage.setItem("cookieMultiplier", this.cookieMultiplier);
        localStorage.setItem("multiplierCost", this.multiplierCost);
        localStorage.setItem("totalClicks", this.totalClicks);
        localStorage.setItem("totalCookiesEarned", this.totalCookiesEarned);
        localStorage.setItem("achievementsUnlocked", JSON.stringify(this.achievementsUnlocked));
    }

    resetGame() {
        if (confirm("Weet je zeker dat je het spel wilt resetten?")) {
            localStorage.clear();
            this.resetValues();
            this.saveGame();
            this.updateUI();
        }
    }

    startAutoClickers() {
        setInterval(() => {
            const cps = (
                this.autoClickers * 1 +
                this.grandma * 3 +
                this.farm * 6 +
                this.factory * 12
            ) * this.cookieMultiplier;
            this.cookie += cps;
            this.totalCookiesEarned += cps;
            this.saveGame();
            this.updateUI();
        }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => new Game());
