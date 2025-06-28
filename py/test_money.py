#!/usr/bin/env python
# encoding: utf-8
"""
@author: HuRuiFeng
@file: test_money.py
@time: 2025/6/26 20:48
@project: tdd-project
@desc: 
"""
import unittest

from bank import Bank
from money import Money
from portfolio import Portfolio


class TestMoney(unittest.TestCase):
    def setUp(self):
        self.bank = Bank()
        self.bank.addExchangeRate("EUR", "USD", 1.2)
        self.bank.addExchangeRate("USD", "KRW", 1100)

    def testMultiplication(self):
        tenEuros = Money(10, "EUR")
        twentyEuros = Money(20, "EUR")
        self.assertEqual(twentyEuros, tenEuros.times(2))

    def testDivision(self):
        originalMoney = Money(4002, "KRW")
        expectedMoneyAfterDivision = Money(1000.5, "KRW")
        self.assertEqual(expectedMoneyAfterDivision, originalMoney.division(4))

    def testAddition(self):
        fiveDollars = Money(5, "USD")
        tenDollars = Money(10, "USD")
        fifteenDollars = Money(15, "USD")
        portfolio = Portfolio()
        portfolio.add(fiveDollars, tenDollars)
        self.assertEqual(fifteenDollars, portfolio.evaluate(self.bank, "USD"))

    def testAdditionOfDollarsAndEuros(self):
        fiveDollars = Money(5, "USD")
        tenEuros = Money(10, "EUR")
        portfolio = Portfolio()
        portfolio.add(fiveDollars, tenEuros)
        expectedValue = Money(17, "USD")
        actualValue = portfolio.evaluate(self.bank, "USD")
        self.assertEqual(expectedValue, actualValue, "%s != %s" % (expectedValue, actualValue))

    def testAdditionOfDollarsAndWons(self):
        oneDollar = Money(1, "USD")
        elevenHundredWon = Money(1100, "KRW")
        portfolio = Portfolio()
        portfolio.add(oneDollar, elevenHundredWon)
        expectedValue = Money(2200, "KRW")
        actualValue = portfolio.evaluate(self.bank, "KRW")
        self.assertEqual(expectedValue, actualValue, "%s!= %s" % (expectedValue, actualValue))

    def testAdditionOfMultipleMissingExchangeRates(self):
        oneDollar = Money(1, "USD")
        oneEuro = Money(1, "EUR")
        oneWon = Money(1100, "KRW")
        portfolio = Portfolio()
        portfolio.add(oneDollar, oneEuro, oneWon)
        with self.assertRaisesRegex(
                Exception,
                "Missing exchange rate\(s\):\[USD->Kalganid,EUR->Kalganid,KRW->Kalganid\]"
        ):
            portfolio.evaluate(self.bank, "Kalganid")

    def testConversion(self):
        bank = Bank()
        bank.addExchangeRate("EUR", "USD", 1.2)
        tenEuros = Money(10, "EUR")
        self.assertEqual(bank.convert(tenEuros, "USD"), Money(12, "USD"))

    def testConversionWithMissingExchangeRate(self):
        bank = Bank()
        tenEuros = Money(10, "EUR")
        with self.assertRaisesRegex(Exception, "EUR->Kalganid"):
            bank.convert(tenEuros, "Kalganid")


if __name__ == '__main__':
    unittest.main()
