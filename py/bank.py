#!/usr/bin/env python
# encoding: utf-8
"""
@author: HuRuiFeng
@file: bank.py
@time: 2025/6/28 14:37
@project: tdd-project
@desc: 
"""
from money import Money


class Bank:
    def __init__(self):
        self.exchangeRates = {}

    def addExchangeRate(self, currencyFrom, currencyTo, rate):
        key = currencyFrom + "->" + currencyTo
        self.exchangeRates[key] = rate

    def convert(self, aMoney, aCurrency):
        if aMoney.currency == aCurrency:
            return Money(aMoney.amount, aCurrency), None

        key = aMoney.currency + "->" + aCurrency
        if key in self.exchangeRates:
            return Money(aMoney.amount * self.exchangeRates[key], aCurrency), None
        return None, key
