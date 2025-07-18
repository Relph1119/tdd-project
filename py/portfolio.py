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

    def evaluate(self, bank, currency):
        total = Money(0, currency)
        failures = ""
        for m in self.moneys:
            c, k = bank.convert(m, currency)
            if k is None:
                total += c
            else:
                failures += k if not failures else "," + k
        if not failures:
            return total

        raise Exception("Missing exchange rate(s):[" + failures + "]")
