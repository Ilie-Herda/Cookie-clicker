class Game {
    constructor() {
        this.cookie = parseInt(localStorage.getItem("cookies")) || 0;
        this.cookiePerClick = parseInt(localStorage.getItem("cookiesPerClick")) || 1;
        this.upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;

        this.autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
        this.autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || 50;

        this.cookieElement = document.getElementById("cookie");
        this.counterElement = document.getElementById("counter");
        this.clickEarningsElement = document.getElementById("clickEarnings");
        this.autoEarningsElement = document.getElementById("autoEarnings");
        this.upgradeButton = document.getElementById("upgrade");
        this.autoClickerButton = document.getElementById("autoClicker");

        if (this.cookieElement && this.counterElement && this.upgradeButton && this.autoClickerButton) {
            this.cookieElement.addEventListener("click", () => this.clickCookie());
            this.upgradeButton.addEventListener("click", () => this.upgrade());
            this.autoClickerButton.addEventListener("click", () => this.buyAutoClicker());
        }

        this.updateCounter();
        this.updateUpgradeButton();
        this.updateAutoClickerButton();
        this.startAutoClickers();
    }

    clickCookie() {
        this.cookie += this.cookiePerClick;
        this.saveGame();
        this.updateCounter();
    }

    upgrade() {
        if (this.cookie >= this.upgradeCost) {
            this.cookie -= this.upgradeCost;
            this.cookiePerClick++;
            this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
            this.saveGame();
            this.updateCounter();
            this.updateUpgradeButton();
        }
    }

    buyAutoClicker() {
        if (this.cookie >= this.autoClickerCost) {
            this.cookie -= this.autoClickerCost;
            this.autoClickers++;
            this.autoClickerCost = Math.floor(this.autoClickerCost * 1.8);
            this.saveGame();
            this.updateCounter();
            this.updateAutoClickerButton();
        }
    }

    startAutoClickers() {
        setInterval(() => {
            this.cookie += this.autoClickers;
            this.saveGame();
            this.updateCounter();
        }, 1000);
    }

    updateCounter() {
        this.counterElement.innerText = `Cookies: ${this.cookie}`;
        this.clickEarningsElement.innerText = `Cookies per click: ${this.cookiePerClick}`;
        this.autoEarningsElement.innerText = `Cookies per second: ${this.autoClickers}`;
    }

    updateUpgradeButton() {
        this.upgradeButton.innerText = `Upgrade Click Earnings (Cost: ${this.upgradeCost})`;
    }

    updateAutoClickerButton() {
        this.autoClickerButton.innerText = `Buy Auto-Clicker (Cost: ${this.autoClickerCost})`;
    }

    saveGame() {
        localStorage.setItem("cookies", this.cookie);
        localStorage.setItem("cookiesPerClick", this.cookiePerClick);
        localStorage.setItem("upgradeCost", this.upgradeCost);
        localStorage.setItem("autoClickers", this.autoClickers);
        localStorage.setItem("autoClickerCost", this.autoClickerCost);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Game();
});
