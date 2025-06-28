/**
 * @author: HuRuiFeng
 * @file: test_money.js
 * @time: 2025/6/26 20:46
 * @project: js
 * @desc:
 */
const assert = require('assert');
const Money = require('./money');
const Portfolio = require('./portfolio');
const Bank = require('./bank');

class MoneyTest {
    constructor() {
        this.bank = new Bank();
        this.bank.addExchangeRate("EUR", "USD", 1.2);
        this.bank.addExchangeRate("USD", "KRW", 1100);
    }

    testMultiplication() {
        let tenEuros = new Money(10, "EUR");
        let twentyEuros = new Money(20, "EUR");
        assert.deepStrictEqual(tenEuros.times(2), twentyEuros);
    }

    testDivision() {
        let originalMoney = new Money(4002, "KRW");
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
        // 对比两个对象，全等运算符
        assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);
    }

    testAddition() {
        let fiverDollars = new Money(5, "USD");
        let tenDollars = new Money(10, "USD");
        let fiftenDollars = new Money(15, "USD");
        let portfolio = new Portfolio();
        portfolio.add(fiverDollars, tenDollars);
        assert.deepStrictEqual(portfolio.evaluate(this.bank, "USD"), fiftenDollars);
    }

    testAdditionOfDollarsAndEuros() {
        let fiverDollars = new Money(5, "USD");
        let tenEuros = new Money(10, "EUR");
        let portfolio = new Portfolio();
        portfolio.add(fiverDollars, tenEuros);
        let expectedValue = new Money(17, "USD");
        assert.deepStrictEqual(portfolio.evaluate(this.bank, "USD"), expectedValue);
    }

    testAdditionOfDollarsAndWons() {
        let oneDollar = new Money(1, "USD");
        let elevenHundredWon = new Money(1100, "KRW");
        let portfolio = new Portfolio();
        portfolio.add(oneDollar, elevenHundredWon);
        let expectedValue = new Money(2200, "KRW");
        assert.deepStrictEqual(portfolio.evaluate(this.bank, "KRW"), expectedValue);
    }

    testAdditionWithMultipleMissingExchangeRates() {
        let oneDollar = new Money(1, "USD");
        let oneEuro = new Money(1, "EUR");
        let oneWon = new Money(1, "KRW");
        let portfolio = new Portfolio();
        portfolio.add(oneDollar, oneEuro, oneWon);
        let expectedError = new Error(
            "Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]");
        assert.throws(() => portfolio.evaluate(this.bank, "Kalganid"), expectedError);
    }

    testConversion() {
        let bank = new Bank();
        bank.addExchangeRate("EUR", "USD", 1.2);
        let tenEuros = new Money(10, "EUR");
        assert.deepStrictEqual(bank.convert(tenEuros, "USD"), new Money(12, "USD"));
    }

    testConversionWithMissingExchangeRate() {
        let bank = new Bank();
        let tenEuros = new Money(10, "EUR");
        let expectedError = new Error("EUR->Kalganid");
        assert.throws(function () {
            bank.convert(tenEuros, "Kalganid")
        }, expectedError);
    }

    getAllTestMethods() {
        let moneyPrototype = MoneyTest.prototype;
        // 获取所有的属性
        let allProps = Object.getOwnPropertyNames(moneyPrototype);
        // 获取类型为函数且名称以test开头的属性
        let testMethods = allProps.filter(p => {
            return typeof moneyPrototype[p] === 'function' && p.startsWith('test');
        });
        return testMethods;
    }

    runAllTests() {
        // 获取所有的测试方法名
        let testMethods = this.getAllTestMethods();
        testMethods.forEach(m => {
            console.log("Running %s()", m);
            // 利用反射机制取得该方法的method对象
            let method = Reflect.get(this, m);
            // 使用try-catch处理断言错误并保证后续的测试方法依然能够执行
            try {
                // 不带参数地调用测试方法
                Reflect.apply(method, this, []);
            } catch (e) {
                if (e instanceof assert.AssertionError) {
                    console.log(e);
                } else {
                    throw e;
                }
            }
        })
    }
}

new MoneyTest().runAllTests();
