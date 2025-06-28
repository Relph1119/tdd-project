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

class MoneyTest {
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
        assert.deepStrictEqual(portfolio.evaluate("USD"), fiftenDollars);
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
