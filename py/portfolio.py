#!/usr/bin/env python
# encoding: utf-8
"""
@author: HuRuiFeng
@file: portfolio.py
@time: 2025/6/28 10:29
@project: tdd-project
@desc: 
"""

from money import Money


class Portfolio:
    def __init__(self):
        self.moneys = []

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency):
        total = 0.0
        failures = []
        for m in self.moneys:
            try:
                total += self.__convert(m, currency)
            except KeyError as ke:
                failures.append(ke)

        if len(failures) == 0:
            return Money(total, currency)

        failureMessages = ",".join(f.args[0] for f in failures)
        raise Exception("Missing exchange rate(s):[" + failureMessages + "]")

    def __convert(self, aMoney, aCurrency):
        exchangeRates = {'EUR->USD': 1.2, 'USD->KRW': 1100}

        if aMoney.currency == aCurrency:
            return aMoney.amount
        else:
            key = aMoney.currency + "->" + aCurrency
            return aMoney.amount * exchangeRates[key]
