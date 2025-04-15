

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
        this.updateUI();
        this.startAutoClickers();
    }

    initDOM() {
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

    initEvents() {
        this.cookieElement.addEventListener("click", () => this.clickCookie());
        this.upgradeButton.addEventListener("click", () => this.buyUpgrade());
        this.autoClickerButton.addEventListener("click", () => this.buyAutoClicker());
        this.multiplierButton.addEventListener("click", () => this.buyMultiplier());

        this.grandmaButton.addEventListener("click", () => this.buyItem(this.grandma));
        this.farmButton.addEventListener("click", () => this.buyItem(this.farm));
        this.factoryButton.addEventListener("click", () => this.buyItem(this.factory));

        this.resetButton.addEventListener("click", () => {
            if (confirm("Reset game?")) {
                localStorage.clear();
                location.reload();
            }
        });
    }

    clickCookie() {
        const earned = this.cookiePerClick * this.cookieMultiplier;
        this.cookie += earned;
        this.totalCookiesEarned += earned;
        this.totalClicks++;
        this.save();
        this.updateUI();
    }

    buyUpgrade() {
        if (this.cookie >= this.upgradeCost) {
            this.cookie -= this.upgradeCost;
            this.cookiePerClick *= 2;
            this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
            this.save();
            this.updateUI();
        }
    }

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
    }

    save() {
        localStorage.setItem("cookies", this.cookie);
        localStorage.setItem("cookiesPerClick", this.cookiePerClick);
        localStorage.setItem("upgradeCost", this.upgradeCost);
        localStorage.setItem("autoClickers", this.autoClickers);
        localStorage.setItem("autoClickerCost", this.autoClickerCost);
        localStorage.setItem("cookieMultiplier", this.cookieMultiplier);
        localStorage.setItem("multiplierCost", this.multiplierCost);
        localStorage.setItem("totalClicks", this.totalClicks);
        localStorage.setItem("totalCookiesEarned", this.totalCookiesEarned);

        this.grandma.save();
        this.farm.save();
        this.factory.save();
    }
}

document.addEventListener("DOMContentLoaded", () => new Game());
