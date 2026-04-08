import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("product-except-self")
product_except_self = module.product_except_self


def test_basic_four_element():
    assert product_except_self([1, 2, 3, 4]) == [24, 12, 8, 6]


def test_default_five_element():
    assert product_except_self([1, 2, 3, 4, 5]) == [120, 60, 40, 30, 24]


def test_single_zero():
    assert product_except_self([1, 0, 3]) == [0, 3, 0]


def test_two_zeros():
    assert product_except_self([0, 1, 0]) == [0, 0, 0]


def test_single_element():
    assert product_except_self([5]) == [1]


def test_empty_array():
    assert product_except_self([]) == []


def test_all_ones():
    assert product_except_self([1, 1, 1]) == [1, 1, 1]


def test_negative_numbers():
    assert product_except_self([-1, 2, -3]) == [-6, 3, -2]


if __name__ == "__main__":
    test_basic_four_element()
    test_default_five_element()
    test_single_zero()
    test_two_zeros()
    test_single_element()
    test_empty_array()
    test_all_ones()
    test_negative_numbers()
    print("All tests passed!")
