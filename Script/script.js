<<<<<<< HEAD


// 🧬 Superklasse voor upgrades
class UpgradeItem {
    constructor(game, name, baseCost, cps, storageKey) {
        this.game = game;
        this.name = name;
        this.baseCost = baseCost;
        this.cps = cps;
        this.storageKey = storageKey;

        this.count = parseInt(localStorage.getItem(`${storageKey}`)) || 0;
        this.cost = parseInt(localStorage.getItem(`${storageKey}Cost`)) || baseCost;
    }

    buy() {
        if (this.game.cookie >= this.cost) {
            this.game.cookie -= this.cost;
            this.count++;
            this.cost = Math.floor(this.cost * 1.5);
            this.save();
            return true;
        }
        return false;
    }

    getTotalCPS(multiplier) {
        return this.count * this.cps * multiplier;
    }

    save() {
        localStorage.setItem(this.storageKey, this.count);
        localStorage.setItem(`${this.storageKey}Cost`, this.cost);
    }

    reset() {
        this.count = 0;
        this.cost = this.baseCost;
        this.save();
    }
}

class Grandma extends UpgradeItem {
    constructor(game) {
        super(game, 'Grandma', 100, 3, 'grandma');
    }
}

class Farm extends UpgradeItem {
    constructor(game) {
        super(game, 'Farm', 500, 6, 'farm');
    }
}

class Factory extends UpgradeItem {
    constructor(game) {
        super(game, 'Factory', 2500, 12, 'factory');
    }
}

// 🎮 De hoofdklasse Game
class Game {
    constructor() {
        this.cookie = parseFloat(localStorage.getItem("cookies")) || 0;
        this.cookiePerClick = parseInt(localStorage.getItem("cookiesPerClick")) || 1;
        this.upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;
        this.autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
        this.autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || 50;
        this.cookieMultiplier = parseInt(localStorage.getItem("cookieMultiplier")) || 1;
        this.multiplierCost = parseInt(localStorage.getItem("multiplierCost")) || 1000;

        this.totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
        this.totalCookiesEarned = parseFloat(localStorage.getItem("totalCookiesEarned")) || 0;

        this.grandma = new Grandma(this);
        this.farm = new Farm(this);
        this.factory = new Factory(this);

        this.initDOM();
        this.initEvents();
=======
// Volledige werkende Cookie Clicker game (JS-klasse)
class Game {
    constructor() {
        this.resetValues();
        this.loadGame();
        this.getElements();
        this.attachEvents();
>>>>>>> origin/main
        this.updateUI();
        this.startAutoClickers();
    }

<<<<<<< HEAD
    initDOM() {
=======
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
>>>>>>> origin/main
        this.cookieElement = document.getElementById("cookie");
        this.counterElement = document.getElementById("counter");
        this.clickEarningsElement = document.getElementById("clickEarnings");
        this.autoEarningsElement = document.getElementById("autoEarnings");

        this.upgradeButton = document.getElementById("upgrade");
        this.autoClickerButton = document.getElementById("autoClicker");
        this.multiplierButton = document.getElementById("multiplier");

        this.grandmaButton = document.getElementById("grandma");
        this.farmButton = document.getElementById("farm");
        this.factoryButton = document.getElementById("factory");

        this.resetButton = document.getElementById("reset");
    }

<<<<<<< HEAD
    initEvents() {
=======
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
>>>>>>> origin/main
        this.cookieElement.addEventListener("click", () => this.clickCookie());
        this.upgradeButton.addEventListener("click", () => this.buyUpgrade());
        this.autoClickerButton.addEventListener("click", () => this.buyAutoClicker());
        this.multiplierButton.addEventListener("click", () => this.buyMultiplier());

<<<<<<< HEAD
        this.grandmaButton.addEventListener("click", () => this.buyItem(this.grandma));
        this.farmButton.addEventListener("click", () => this.buyItem(this.farm));
        this.factoryButton.addEventListener("click", () => this.buyItem(this.factory));

        this.resetButton.addEventListener("click", () => {
            if (confirm("Reset game?")) {
                localStorage.clear();
                location.reload();
            }
        });
=======
        this.resetButton.addEventListener("click", () => this.resetGame());

        this.shopIcon.addEventListener("click", () => this.shopPopup.classList.toggle("hidden"));
        this.closeShopButton.addEventListener("click", () => this.shopPopup.classList.add("hidden"));

        this.multiplierButton.addEventListener("click", () => this.tryBuy("multiplier"));
        this.clickBoostButton.addEventListener("click", () => this.tryBuy("clickBoost"));
        this.cheaperProductionButton.addEventListener("click", () => this.tryBuy("cheaperProduction"));

        this.statsIcon.addEventListener("click", () => this.statsPopup.classList.toggle("hidden"));
        this.closeStatsButton.addEventListener("click", () => this.statsPopup.classList.add("hidden"));
>>>>>>> origin/main
    }

    clickCookie() {
        const earned = this.cookiePerClick * this.cookieMultiplier;
        this.cookie += earned;
        this.totalCookiesEarned += earned;
        this.totalClicks++;
<<<<<<< HEAD
        this.save();
        this.updateUI();
    }

    buyUpgrade() {
        if (this.cookie >= this.upgradeCost) {
            this.cookie -= this.upgradeCost;
            this.cookiePerClick *= 2;
            this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
            this.save();
=======
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
>>>>>>> origin/main
            this.updateUI();
        }
    }

<<<<<<< HEAD
    buyAutoClicker() {
        if (this.cookie >= this.autoClickerCost) {
            this.cookie -= this.autoClickerCost;
            this.autoClickers++;
            this.autoClickerCost = Math.floor(this.autoClickerCost * 1.8);
            this.save();
            this.updateUI();
        }
    }

    buyMultiplier() {
        if (this.cookie >= this.multiplierCost) {
            this.cookie -= this.multiplierCost;
            this.cookieMultiplier *= 2;
            this.multiplierCost = Math.floor(this.multiplierCost * 2.5);
            this.save();
            this.updateUI();
        }
    }

    buyItem(item) {
        if (item.buy()) {
            this.save();
            this.updateUI();
        }
    }

    startAutoClickers() {
        setInterval(() => {
            const cps = (
                this.autoClickers * 1 +
                this.grandma.getTotalCPS(this.cookieMultiplier) +
                this.farm.getTotalCPS(this.cookieMultiplier) +
                this.factory.getTotalCPS(this.cookieMultiplier)
            );
            this.cookie += cps;
            this.totalCookiesEarned += cps;
            this.save();
            this.updateUI();
        }, 1000);
    }

=======
>>>>>>> origin/main
    updateUI() {
        this.counterElement.innerText = `Cookies: ${Math.floor(this.cookie)}`;
        this.clickEarningsElement.innerText = `Cookies per click: ${this.cookiePerClick * this.cookieMultiplier}`;
        this.autoEarningsElement.innerText = `Cookies per second: ${(
            this.autoClickers * 1 +
            this.grandma.getTotalCPS(this.cookieMultiplier) +
            this.farm.getTotalCPS(this.cookieMultiplier) +
            this.factory.getTotalCPS(this.cookieMultiplier)
        ).toFixed(1)}`;

        this.upgradeButton.innerText = `Upgrade Click Earnings (Cost: ${this.upgradeCost})`;
        this.autoClickerButton.innerText = `Buy Auto-Clicker (Cost: ${this.autoClickerCost})`;
        this.grandmaButton.innerText = `Buy Grandma's Bakery (Cost: ${this.grandma.cost})`;
        this.farmButton.innerText = `Buy Cookie Farm (Cost: ${this.farm.cost})`;
        this.factoryButton.innerText = `Buy Cookie Factory (Cost: ${this.factory.cost})`;
        this.multiplierButton.innerText = `Buy x2 Multiplier (Cost: ${this.multiplierCost})`;
<<<<<<< HEAD
    }

    save() {
=======

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
>>>>>>> origin/main
        localStorage.setItem("cookies", this.cookie);
        localStorage.setItem("cookiesPerClick", this.cookiePerClick);
        localStorage.setItem("upgradeCost", this.upgradeCost);
        localStorage.setItem("autoClickers", this.autoClickers);
        localStorage.setItem("autoClickerCost", this.autoClickerCost);
        localStorage.setItem("cookieMultiplier", this.cookieMultiplier);
        localStorage.setItem("multiplierCost", this.multiplierCost);
        localStorage.setItem("totalClicks", this.totalClicks);
        localStorage.setItem("totalCookiesEarned", this.totalCookiesEarned);
<<<<<<< HEAD

        this.grandma.save();
        this.farm.save();
        this.factory.save();
=======
        localStorage.setItem("achievementsUnlocked", JSON.stringify(this.achievementsUnlocked));
    }

    resetGame() {
        if (confirm("Weet je zeker dat je het spel wilt resetten?")) {
            localStorage.clear();
            this.resetValues();
            this.saveGame();
            this.updateUI();
        }
>>>>>>> origin/main
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
