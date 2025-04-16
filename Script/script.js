// 🧬 Superklasse voor upgrades
class UpgradeItem {
    constructor(game, name, baseCost, cps, storageKey) {
        this.game = game;
        this.name = name;
        this.baseCost = baseCost;
        this.cps = cps;
        this.storageKey = storageKey;

        this.count = parseInt(localStorage.getItem(storageKey)) || 0;
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
    constructor(game) { super(game, 'Grandma', 100, 3, 'grandma'); }
}
class Farm    extends UpgradeItem { constructor(game) { super(game, 'Farm',    500, 6, 'farm');    }}
class Factory extends UpgradeItem { constructor(game) { super(game, 'Factory', 2500,12,'factory'); }}

// 🎮 Hoofdklasse Game
class Game {
    constructor() {
        this.loadSettings();
        this.grandma = new Grandma(this);
        this.farm    = new Farm(this);
        this.factory = new Factory(this);
        this.initDOM();
        this.initEvents();
        this.updateUI();
        this.startAutoClickers();
    }

    loadSettings() {
        this.cookie            = parseFloat(localStorage.getItem('cookies'))            || 0;
        this.cookiePerClick    = parseInt(localStorage.getItem('cookiesPerClick'))    || 1;
        this.upgradeCost       = parseInt(localStorage.getItem('upgradeCost'))       || 10;
        this.autoClickers      = parseInt(localStorage.getItem('autoClickers'))      || 0;
        this.autoClickerCost   = parseInt(localStorage.getItem('autoClickerCost'))   || 50;
        this.cookieMultiplier  = parseInt(localStorage.getItem('cookieMultiplier'))  || 1;
        this.multiplierCost    = parseInt(localStorage.getItem('multiplierCost'))    || 1000;
        this.totalClicks       = parseInt(localStorage.getItem('totalClicks'))       || 0;
        this.totalCookiesEarned= parseFloat(localStorage.getItem('totalCookiesEarned'))|| 0;
    }

    initDOM() {
        this.cookieEl = document.getElementById('cookie');
        this.countEl  = document.getElementById('counter');
        this.clickEl  = document.getElementById('clickEarnings');
        this.autoEl   = document.getElementById('autoEarnings');

        [ 'upgrade','autoClicker','multiplier','clickBoost','cheaperProduction',
          'grandma','farm','factory' ]
        .forEach(id => this[`${id}Btn`]=document.getElementById(id));

        this.resetBtn    = document.getElementById('reset');
        this.shopIcon    = document.getElementById('shop-icon');
        this.shopPopup   = document.getElementById('shop-popup');
        this.closeShop   = document.getElementById('close-shop');
        this.statsIcon   = document.getElementById('stats-icon');
        this.statsPopup  = document.getElementById('stats-popup');
        this.closeStats  = document.getElementById('close-stats');
        this.achievementPopup= document.getElementById('achievement-popup');
        this.achievementText = document.getElementById('achievement-text');

        this.grandmaCount= document.getElementById('grandmaCount');
        this.farmCount   = document.getElementById('farmCount');
        this.factoryCount= document.getElementById('factoryCount');
    }

    initEvents() {
        this.cookieEl.addEventListener('click', ()=> this.clickCookie());
        this.upgradeBtn     .addEventListener('click', ()=> this.buyUpgrade());
        this.autoClickerBtn .addEventListener('click', ()=> this.buyAutoClicker());
        this.multiplierBtn  .addEventListener('click', ()=> this.buyMultiplier());
        this.clickBoostBtn  .addEventListener('click', ()=> this.buyClickBoost());
        this.cheaperProductionBtn
                            .addEventListener('click', ()=> this.buyCheaper());

        this.grandmaBtn     .addEventListener('click', ()=> this.buyItem(this.grandma));
        this.farmBtn        .addEventListener('click', ()=> this.buyItem(this.farm));
        this.factoryBtn     .addEventListener('click', ()=> this.buyItem(this.factory));

        this.resetBtn.addEventListener('click', ()=> this.resetGame());
        this.shopIcon.addEventListener('click', ()=> this.shopPopup.classList.toggle('hidden'));
        this.closeShop.addEventListener('click', ()=> this.shopPopup.classList.add('hidden'));
        this.statsIcon.addEventListener('click',()=> this.statsPopup.classList.toggle('hidden'));
        this.closeStats.addEventListener('click',()=> this.statsPopup.classList.add('hidden'));
    }

    clickCookie() {
        const gain = this.cookiePerClick * this.cookieMultiplier;
        this.cookie += gain;
        this.totalCookiesEarned += gain;
        this.totalClicks++;
        this.saveGame();
        this.updateUI();
    }

    buyUpgrade() {
        if (this.cookie >= this.upgradeCost) {
            this.cookie -= this.upgradeCost;
            this.cookiePerClick *= 2;
            this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
            this.saveGame(); this.updateUI();
        }
    }

    buyAutoClicker() {
        if (this.cookie >= this.autoClickerCost) {
            this.cookie -= this.autoClickerCost;
            this.autoClickers++;
            this.autoClickerCost = Math.floor(this.autoClickerCost * 1.8);
            this.saveGame(); this.updateUI();
        }
    }

    buyMultiplier() {
        if (this.cookie >= this.multiplierCost) {
            this.cookie -= this.multiplierCost;
            this.cookieMultiplier *= 2;
            this.multiplierCost = Math.floor(this.multiplierCost * 2.5);
            this.saveGame(); this.updateUI();
        }
    }

    buyClickBoost() {
        if (this.cookie >= 3000) {
            this.cookie -= 3000;
            this.cookiePerClick *= 2;
            this.saveGame(); this.updateUI();
        }
    }

    buyCheaper() {
        if (this.cookie >= 4000) {
            this.cookie -= 4000;
            [this.grandma,this.farm,this.factory].forEach(item => {
                item.cost = Math.floor(item.cost * 0.8);
                item.save();
            });
            this.saveGame(); this.updateUI();
        }
    }

    buyItem(item) {
        if (item.buy()) {
            this.saveGame(); this.updateUI();
        }
    }

    totalCPS() {
        return this.autoClickers * 1 +
               this.grandma.getTotalCPS(this.cookieMultiplier) +
               this.farm   .getTotalCPS(this.cookieMultiplier) +
               this.factory.getTotalCPS(this.cookieMultiplier);
    }

    updateUI() {
        this.countEl.innerText = `Cookies: ${Math.floor(this.cookie)}`;
        this.clickEl.innerText = `Cookies per click: ${this.cookiePerClick * this.cookieMultiplier}`;
        this.autoEl .innerText = `Cookies per second: ${this.totalCPS().toFixed(1)}`;

        this.upgradeBtn.innerText    = `Upgrade Click Earnings (Cost: ${this.upgradeCost})`;
        this.autoClickerBtn.innerText= `Buy Auto-Clicker (Cost: ${this.autoClickerCost})`;
        this.multiplierBtn.innerText = `Buy x2 Multiplier (Cost: ${this.multiplierCost})`;
        this.clickBoostBtn.innerText = `Click Booster (Cost: 3000)`;
        this.cheaperProductionBtn.innerText = `Reduce Building Costs (Cost: 4000)`;

        this.grandmaBtn.innerText    = `Buy Grandma's Bakery (Cost: ${this.grandma.cost})`;
        this.farmBtn.innerText       = `Buy Cookie Farm (Cost: ${this.farm.cost})`;
        this.factoryBtn.innerText    = `Buy Cookie Factory (Cost: ${this.factory.cost})`;

        this.grandmaCount.textContent= this.grandma.count;
        this.farmCount.textContent   = this.farm.count;
        this.factoryCount.textContent= this.factory.count;

        document.getElementById('grandmaStats').innerText = `Grandmas (${this.grandma.count}): ${this.grandma.getTotalCPS(this.cookieMultiplier)} cps`;
        document.getElementById('farmStats')   .innerText = `Farms (${this.farm.count}): ${this.farm.getTotalCPS(this.cookieMultiplier)} cps`;
        document.getElementById('factoryStats').innerText = `Factories (${this.factory.count}): ${this.factory.getTotalCPS(this.cookieMultiplier)} cps`;

        document.getElementById('totalClicks').innerText = `Totaal aantal klikken: ${this.totalClicks}`;
        document.getElementById('totalCookies').innerText= `Totaal aantal cookies verdiend: ${Math.floor(this.totalCookiesEarned)}`;
        document.getElementById('statsGrandmas').innerText= `Grandmas gekocht: ${this.grandma.count}`;
        document.getElementById('statsFarms').innerText   = `Farms gekocht: ${this.farm.count}`;
        document.getElementById('statsFactories').innerText=`Factories gekocht: ${this.factory.count}`;
    }

    saveGame() {
        localStorage.setItem('cookies', this.cookie);
        localStorage.setItem('cookiesPerClick', this.cookiePerClick);
        localStorage.setItem('upgradeCost', this.upgradeCost);
        localStorage.setItem('autoClickers', this.autoClickers);
        localStorage.setItem('autoClickerCost', this.autoClickerCost);
        localStorage.setItem('cookieMultiplier', this.cookieMultiplier);
        localStorage.setItem('multiplierCost', this.multiplierCost);
        localStorage.setItem('totalClicks', this.totalClicks);
        localStorage.setItem('totalCookiesEarned', this.totalCookiesEarned);
        this.grandma.save(); this.farm.save(); this.factory.save();
    }

    resetGame() {
        if (confirm('Weet je zeker dat je het spel wilt resetten?')) {
            localStorage.clear();
            location.reload();
        }
    }

    startAutoClickers() {
        setInterval(() => {
            const cps = this.totalCPS();
            this.cookie += cps;
            this.totalCookiesEarned += cps;
            this.saveGame();
            this.updateUI();
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => new Game());