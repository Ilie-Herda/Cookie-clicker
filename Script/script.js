class Game {
    constructor() {
        // Load game data from localStorage or set defaults
        this.cookie = parseInt(localStorage.getItem("cookies")) || 0;
        this.cookiePerClick = parseInt(localStorage.getItem("cookiesPerClick")) || 1;
        this.upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;

        this.autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
        this.autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || 50;

        this.grandma = parseInt(localStorage.getItem("grandma")) || 0;
        this.farm = parseInt(localStorage.getItem("farm")) || 0;
        this.factory = parseInt(localStorage.getItem("factory")) || 0;

        this.grandmaCost = parseInt(localStorage.getItem("grandmaCost")) || 100;
        this.farmCost = parseInt(localStorage.getItem("farmCost")) || 500;
        this.factoryCost = parseInt(localStorage.getItem("factoryCost")) || 2500;

        this.cookieMultiplier = parseInt(localStorage.getItem("cookieMultiplier")) || 1;
        this.multiplierCost = parseInt(localStorage.getItem("multiplierCost")) || 1000;

        // Get UI elements
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

        // Event Listeners
        this.cookieElement.addEventListener("click", () => this.clickCookie());
        this.upgradeButton.addEventListener("click", () => this.upgrade());
        this.autoClickerButton.addEventListener("click", () => this.buyAutoClicker());
        this.grandmaButton.addEventListener("click", () => this.buyGrandma());
        this.farmButton.addEventListener("click", () => this.buyFarm());
        this.factoryButton.addEventListener("click", () => this.buyFactory());
        this.resetButton.addEventListener("click", () => this.resetGame());

        // Shop button and close button listeners
        this.shopIcon.addEventListener("click", () => this.toggleShop());
        this.multiplierButton.addEventListener("click", () => this.buyMultiplier());
        this.clickBoostButton.addEventListener("click", () => this.buyClickBooster());
        this.cheaperProductionButton.addEventListener("click", () => this.buyCheaperProduction());
        this.closeShopButton.addEventListener("click", () => this.closeShop());

        // Initially hide the shop
        this.shopPopup.classList.add("hidden");

        this.updateUI();
        this.startAutoClickers();
    }

    // Cookie click event
    clickCookie() {
        this.cookie += this.cookiePerClick * this.cookieMultiplier;  // Apply the multiplier here
        this.saveGame();
        this.updateUI();
    }

    // Upgrade click earnings
    upgrade() {
        if (this.cookie >= this.upgradeCost) {
            this.cookie -= this.upgradeCost;

            // Apply the multiplier to the upgrade, increasing per-click earnings correctly
            this.cookiePerClick = Math.floor(this.cookiePerClick * (1 + this.cookieMultiplier));  // Upgrade considering multiplier
            this.upgradeCost = Math.floor(this.upgradeCost * 1.5);

            this.saveGame();
            this.updateUI();
        }
    }


    // Buy auto-clickers
    buyAutoClicker() {
        if (this.cookie >= this.autoClickerCost) {
            this.cookie -= this.autoClickerCost;
            this.autoClickers++;
            this.autoClickerCost = Math.floor(this.autoClickerCost * 1.8);
            this.saveGame();
            this.updateUI();
        }
    }

    // Buy Grandma
    buyGrandma() {
        if (this.cookie >= this.grandmaCost) {
            this.cookie -= this.grandmaCost;
            this.grandma++;
            this.grandmaCost = Math.floor(this.grandmaCost * 1.5);
            this.saveGame();
            this.updateUI();
        }
    }

    // Buy Farm
    buyFarm() {
        if (this.cookie >= this.farmCost) {
            this.cookie -= this.farmCost;
            this.farm++;
            this.farmCost = Math.floor(this.farmCost * 1.8);
            this.saveGame();
            this.updateUI();
        }
    }

    // Buy Factory
    buyFactory() {
        if (this.cookie >= this.factoryCost) {
            this.cookie -= this.factoryCost;
            this.factory++;
            this.factoryCost = Math.floor(this.factoryCost * 2);
            this.saveGame();
            this.updateUI();
        }
    }

    // Buy Cookie Multiplier
    buyMultiplier() {
        if (this.cookie >= this.multiplierCost) {
            this.cookie -= this.multiplierCost;
            this.cookieMultiplier *= 2;  // Apply the multiplier
            this.multiplierCost = Math.floor(this.multiplierCost * 2.5);
            this.saveGame();
            this.updateUI();
        }
    }

    // Buy Click Booster
    buyClickBooster() {
        if (this.cookie >= 3000) {
            this.cookie -= 3000;
            this.cookiePerClick *= 2;  // Doubles the cookies per click
            this.saveGame();
            this.updateUI();
        }
    }

    // Buy Cheaper Production (reduces building costs)
    buyCheaperProduction() {
        if (this.cookie >= 4000) {
            this.cookie -= 4000;
            this.grandmaCost = Math.floor(this.grandmaCost * 0.8);  // Reduces Grandma cost by 20%
            this.farmCost = Math.floor(this.farmCost * 0.8);  // Reduces Farm cost by 20%
            this.factoryCost = Math.floor(this.factoryCost * 0.8);  // Reduces Factory cost by 20%
            this.saveGame();
            this.updateUI();
        }
    }

    // Toggle Shop Pop-up
    toggleShop() {
        this.shopPopup.classList.toggle("hidden");
    }

    // Close Shop Pop-up
    closeShop() {
        this.shopPopup.classList.add("hidden");
    }

    // Auto-clickers work every second
    startAutoClickers() {
        setInterval(() => {
            this.cookie += (this.autoClickers + this.grandma * 5 + this.farm * 15 + this.factory * 50) * this.cookieMultiplier;
            this.saveGame();
            this.updateUI();
        }, 1000);
    }

    // Save game progress
    saveGame() {
        localStorage.setItem("cookies", this.cookie);
        localStorage.setItem("cookiesPerClick", this.cookiePerClick);
        localStorage.setItem("upgradeCost", this.upgradeCost);
        localStorage.setItem("autoClickers", this.autoClickers);
        localStorage.setItem("autoClickerCost", this.autoClickerCost);
        localStorage.setItem("grandma", this.grandma);
        localStorage.setItem("farm", this.farm);
        localStorage.setItem("factory", this.factory);
        localStorage.setItem("grandmaCost", this.grandmaCost);
        localStorage.setItem("farmCost", this.farmCost);
        localStorage.setItem("factoryCost", this.factoryCost);
        localStorage.setItem("cookieMultiplier", this.cookieMultiplier);
        localStorage.setItem("multiplierCost", this.multiplierCost);
    }

    // Update UI elements
    updateUI() {
        this.counterElement.innerText = `Cookies: ${this.cookie}`;
        this.clickEarningsElement.innerText = `Cookies per click: ${this.cookiePerClick * this.cookieMultiplier}`;  // Update with multiplier
        this.autoEarningsElement.innerText = `Cookies per second: ${(this.autoClickers + this.grandma * 5 + this.farm * 15 + this.factory * 50) * this.cookieMultiplier}`;

        // Update button text with costs
        this.upgradeButton.innerText = `Upgrade Click Earnings (Cost: ${this.upgradeCost})`;
        this.autoClickerButton.innerText = `Buy Auto-Clicker (Cost: ${this.autoClickerCost})`;
        this.grandmaButton.innerText = `Buy Grandma's Bakery (Cost: ${this.grandmaCost})`;
        this.farmButton.innerText = `Buy Cookie Farm (Cost: ${this.farmCost})`;
        this.factoryButton.innerText = `Buy Cookie Factory (Cost: ${this.factoryCost})`;
        this.multiplierButton.innerText = `Buy x2 Multiplier (Cost: ${this.multiplierCost})`;
        this.clickBoostButton.innerText = `Click Booster (Cost: 3000)`;
        this.cheaperProductionButton.innerText = `Reduce Building Costs (Cost: 4000)`;
    }

    // Reset the game
    resetGame() {
        localStorage.clear();
        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", () => new Game());
