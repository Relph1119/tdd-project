#!/usr/bin/env python
# encoding: utf-8
"""
@author: HuRuiFeng
@file: portfolio.py
@time: 2025/6/28 10:29
@project: tdd-project
@desc: 
"""
import functools
import operator

from money import Money


class Portfolio:
    def __init__(self):
        self.moneys = []

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency):
        total = functools.reduce(
            # 让加法函数运用到map所映射出来的各个amount上
            operator.add, map(lambda m: m.amount, self.moneys), 0)
        return Money(total, currency)
