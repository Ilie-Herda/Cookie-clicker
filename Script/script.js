class Game {
    constructor() {
        // Game state
        this.cookie = parseFloat(localStorage.getItem("cookies")) || 0;
        this.cookiePerClick = parseInt(localStorage.getItem("cookiesPerClick")) || 1;
        this.upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;

        this.autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
        this.autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || 50;

        this.grandma = parseInt(localStorage.getItem("grandma")) || 0;
        this.grandmaCost = parseInt(localStorage.getItem("grandmaCost")) || 100;

        this.farm = parseInt(localStorage.getItem("farm")) || 0;
        this.farmCost = parseInt(localStorage.getItem("farmCost")) || 500;

        this.factory = parseInt(localStorage.getItem("factory")) || 0;
        this.factoryCost = parseInt(localStorage.getItem("factoryCost")) || 2500;

        this.cookieMultiplier = parseInt(localStorage.getItem("cookieMultiplier")) || 1;
        this.multiplierCost = parseInt(localStorage.getItem("multiplierCost")) || 1000;

        this.totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
        this.totalCookiesEarned = parseFloat(localStorage.getItem("totalCookiesEarned")) || 0;

        this.achievementsUnlocked = JSON.parse(localStorage.getItem("achievementsUnlocked")) || [];

        // DOM Elements
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

        this.factoryCount = document.getElementById("factoryCount");
        this.factoryProgress = document.getElementById("factoryProgress");

        this.statsIcon = document.getElementById("stats-icon");
        this.statsPopup = document.getElementById("stats-popup");
        this.closeStatsButton = document.getElementById("close-stats");

        this.achievementPopup = document.getElementById("achievement-popup");
        this.achievementText = document.getElementById("achievement-text");

        // Sound
        this.clickSound = document.getElementById("clickSound");

        // Events
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

        // Start
        this.updateUI();
        this.startAutoClickers();
        this.totalClicks = parseInt(localStorage.getItem("totalClicks")) || 0;
        this.totalCookiesEarned = parseFloat(localStorage.getItem("totalCookiesEarned")) || 0;

        this.statsIcon = document.getElementById("stats-icon");
        this.statsPopup = document.getElementById("stats-popup");
        this.closeStatsButton = document.getElementById("close-stats");

        this.statsIcon.addEventListener("click", () => this.statsPopup.classList.toggle("hidden"));
        this.closeStatsButton.addEventListener("click", () => this.statsPopup.classList.add("hidden"));

    }

    clickCookie() {
        const earned = this.cookiePerClick * this.cookieMultiplier;
        this.cookie += earned;
        this.totalCookiesEarned += earned;
        this.totalClicks++;

        this.playClickSound();
        this.checkAchievements();
        this.saveGame();
        this.updateUI();
        this.totalClicks++;
        this.totalCookiesEarned += this.cookiePerClick * this.cookieMultiplier;

    }

    playClickSound() {
        if (this.clickSound) {
            this.clickSound.currentTime = 0;
            this.clickSound.play().catch(() => {});
        }
    }

    checkAchievements() {
        const list = [
            { id: "100cookies", threshold: 100, text: "🎉 Achievement: Starter Chef (100 cookies)" },
            { id: "1kcookies", threshold: 1000, text: "🍪 Achievement: Cookie Pro (1.000 cookies)" },
            { id: "10kcookies", threshold: 10000, text: "🔥 Achievement: Bakbeest (10.000 cookies!)" }
        ];

        list.forEach(a => {
            if (this.cookie >= a.threshold && !this.achievementsUnlocked.includes(a.id)) {
                this.achievementsUnlocked.push(a.id);
                this.showAchievement(a.text);
                localStorage.setItem("achievementsUnlocked", JSON.stringify(this.achievementsUnlocked));
            }
        });
    }

    showAchievement(text) {
        this.achievementText.innerText = text;
        this.achievementPopup.classList.remove("hidden");

        setTimeout(() => {
            this.achievementPopup.classList.add("hidden");
        }, 3000);
    }

    tryBuy(type) {
        let success = false;

        switch (type) {
            case "upgrade":
                if (this.cookie >= this.upgradeCost) {
                     this.cookie -= this.upgradeCost;
                    this.cookiePerClick += this.cookieMultiplier; // ✅ stabiele upgrade
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
            this.animateButton(type);
            this.launchConfetti();
            this.saveGame();
            this.updateUI();
        }
    }

    animateButton(type) {
        const map = {
            upgrade: this.upgradeButton,
            autoClicker: this.autoClickerButton,
            grandma: this.grandmaButton,
            farm: this.farmButton,
            factory: this.factoryButton,
            multiplier: this.multiplierButton,
            clickBoost: this.clickBoostButton,
            cheaperProduction: this.cheaperProductionButton,
        };
        const btn = map[type];
        if (btn) {
            btn.classList.add("pulse");
            setTimeout(() => btn.classList.remove("pulse"), 400);
        }
    }

    launchConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confetti = [];
        for (let i = 0; i < 30; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: -10,
                r: Math.random() * 6 + 4,
                d: Math.random() * 40 + 10,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                tilt: Math.random() * 10 - 10
            });
        }

        let angle = 0;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            angle += 0.01;
            for (let i = 0; i < confetti.length; i++) {
                let c = confetti[i];
                ctx.beginPath();
                ctx.lineWidth = c.r;
                ctx.strokeStyle = c.color;
                ctx.moveTo(c.x + c.tilt + Math.sin(angle) * 5, c.y);
                ctx.lineTo(c.x + c.tilt, c.y + c.d);
                ctx.stroke();
                c.y += Math.cos(angle + i) + 1 + c.r / 2;
                c.x += Math.sin(angle);
            }
        };

        let duration = 800;
        const interval = setInterval(draw, 16);
        setTimeout(() => clearInterval(interval), duration);
    }

    startAutoClickers() {
        setInterval(() => {
            const cps =
                (this.autoClickers * 1) +
                (this.grandma * 3) +
                (this.farm * 6) +
                (this.factory * 12);
    
            const total = cps * this.cookieMultiplier;
    
            // ❗ Voeg controle toe om alleen te verhogen als > 0
            if (total > 0) {
                this.cookie += total;
                this.totalCookiesEarned += total;
            }
    
            this.saveGame();
            this.updateUI();
        }, 1000);
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

        this.setProgress("grandma", this.grandma);
        this.setProgress("farm", this.farm);
        this.setProgress("factory", this.factory);

        // Stats update
        document.getElementById("totalClicks").innerText = `Totaal aantal klikken: ${this.totalClicks}`;
        document.getElementById("totalCookies").innerText = `Totaal aantal cookies verdiend: ${Math.floor(this.totalCookiesEarned)}`;
        document.getElementById("statsGrandmas").innerText = `Grandmas gekocht: ${this.grandma}`;
        document.getElementById("statsFarms").innerText = `Farms gekocht: ${this.farm}`;
        document.getElementById("statsFactories").innerText = `Factories gekocht: ${this.factory}`;

        // Unit cps details
        document.getElementById("grandmaStats").innerText = `Grandmas (${this.grandma}): ${this.grandma * 3 * this.cookieMultiplier} cps`;
        document.getElementById("farmStats").innerText = `Farms (${this.farm}): ${this.farm * 6 * this.cookieMultiplier} cps`;
        document.getElementById("factoryStats").innerText = `Factories (${this.factory}): ${this.factory * 12 * this.cookieMultiplier} cps`;
        document.getElementById("totalClicks").innerText = `Totaal aantal klikken: ${this.totalClicks}`;
        document.getElementById("totalCookies").innerText = `Totaal aantal cookies verdiend: ${Math.floor(this.totalCookiesEarned)}`;
        document.getElementById("statsGrandmas").innerText = `Grandmas gekocht: ${this.grandma}`;
        document.getElementById("statsFarms").innerText = `Farms gekocht: ${this.farm}`;
        document.getElementById("statsFactories").innerText = `Factories gekocht: ${this.factory}`;

    }

    setProgress(type, count) {
        const bar = document.getElementById(`${type}Progress`);
        const label = document.getElementById(`${type}Count`);
        if (bar) bar.style.width = `${Math.min((count / 100) * 100, 100)}%`;
        if (label) label.textContent = count;
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
<<<<<<< HEAD

        localStorage.setItem("totalClicks", this.totalClicks);
        localStorage.setItem("totalCookiesEarned", this.totalCookiesEarned);
=======
        localStorage.setItem("totalClicks", this.totalClicks);
        localStorage.setItem("totalCookiesEarned", this.totalCookiesEarned);

>>>>>>> origin/main
    }

    resetGame() {
        if (confirm("Weet je zeker dat je het spel wilt resetten?")) {
            localStorage.clear();
            location.reload();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => new Game());
