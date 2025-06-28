/**
 * @author: HuRuiFeng
 * @file: money.js
 * @time: 2025/6/28 10:02
 * @project: js
 * @desc:
 */

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

module.exports = Money
