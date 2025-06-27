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


class Dollar:
    def __init__(self, amount):
        self.amount = amount

    def times(self, multiplier):
        return Dollar(self.amount * multiplier)


class TestMoney(unittest.TestCase):
    def testMultiplication(self):
        fiver = Dollar(5)
        tenner = fiver.times(2)
        self.assertEqual(10, tenner.amount)


if __name__ == '__main__':
    unittest.main()
