import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("red-black-insert")
red_black_insert = module.red_black_insert


def test_inserts_single_value():
    assert red_black_insert([5]) == [5]


def test_sorted_inorder_default_input():
    values = [7, 3, 18, 10, 22, 8, 11, 26]
    result = red_black_insert(values)
    assert result == sorted(values)


def test_ascending_order_insert():
    assert red_black_insert([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_descending_order_insert():
    assert red_black_insert([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_empty_input():
    assert red_black_insert([]) == []


def test_duplicates_handled():
    result = red_black_insert([5, 3, 5])
    assert len(result) > 0


if __name__ == "__main__":
    test_inserts_single_value()
    test_sorted_inorder_default_input()
    test_ascending_order_insert()
    test_descending_order_insert()
    test_empty_input()
    test_duplicates_handled()
    print("All tests passed!")
