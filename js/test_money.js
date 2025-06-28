/**
 * @author: HuRuiFeng
 * @file: test_money.js
 * @time: 2025/6/26 20:46
 * @project: js
 * @desc:
 */
const assert = require('assert');


class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }

    times(multiplier) {
        return new Money(this.amount * multiplier, this.currency)
    }

    divide(divisor) {
        return new Money(this.amount / divisor, this.currency)
    }
}

class Portfolio {
    constructor() {
        this.moneys = [];
    }

    add(...moneys) {
        this.moneys = this.moneys.concat(moneys);
    }

    evaluate(currency) {
        let total = this.moneys.reduce((sum, money) => {
            return sum + money.amount;
        }, 0);
        return new Money(total, currency);
    }
}

let fiverDollars = new Money(5, "USD");
let tenDollars = new Money(10, "USD");
assert.deepStrictEqual(fiverDollars.times(2), tenDollars);

let tenEuros = new Money(10, "EUR");
let twentyEuros = new Money(20, "EUR");
assert.deepStrictEqual(tenEuros.times(2), twentyEuros);

let originalMoney = new Money(4002, "KRW");
let actualMoneyAfterDivision = originalMoney.divide(4);
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
// 对比两个对象，全等运算符
assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);

let fiftenDollars = new Money(15, "USD");
let portfolio = new Portfolio();
portfolio.add(fiverDollars, tenDollars);
assert.deepStrictEqual(portfolio.evaluate("USD"), fiftenDollars);
