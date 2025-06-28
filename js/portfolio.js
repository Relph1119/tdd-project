/**
 * @author: HuRuiFeng
 * @file: portfolio.js
 * @time: 2025/6/28 10:03
 * @project: js
 * @desc:
 */

const Money = require('./money');

class Portfolio {
    constructor() {
        this.moneys = [];
    }

    add(...moneys) {
        this.moneys = this.moneys.concat(moneys);
    }

    evaluate(bank, currency) {
        // 初始化缺失的键的数组
        let failures = [];
        let total = this.moneys.reduce((sum, money) => {
            try {
                let convertedMoney = bank.convert(money, currency);
                return sum + convertedMoney.amount;
            } catch (error) {
                failures.push(error.message);
                return sum;
            }
        }, 0);
        if (!failures.length) {
            return new Money(total, currency);
        }
        throw new Error("Missing exchange rate(s):[" + failures.join() + "]");
    }
}

module.exports = Portfolio
