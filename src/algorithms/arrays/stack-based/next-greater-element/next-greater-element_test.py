import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("next-greater-element")
next_greater_element = module.next_greater_element


def test_mixed_array():
    result = next_greater_element([4, 5, 2, 10, 8])
    assert result == [5, 10, 10, -1, -1]


def test_strictly_increasing():
    result = next_greater_element([1, 2, 3, 4])
    assert result == [2, 3, 4, -1]


def test_strictly_decreasing():
    result = next_greater_element([4, 3, 2, 1])
    assert result == [-1, -1, -1, -1]


def test_all_equal():
    result = next_greater_element([5, 5, 5])
    assert result == [-1, -1, -1]


def test_single_element():
    result = next_greater_element([7])
    assert result == [-1]


def test_empty_array():
    result = next_greater_element([])
    assert result == []


def test_default_input():
    result = next_greater_element([4, 5, 2, 10, 8, 1, 3])
    assert result == [5, 10, 10, -1, -1, 3, -1]


def test_with_duplicates():
    result = next_greater_element([2, 1, 2, 4, 3])
    assert result == [4, 2, 4, -1, -1]


def test_two_element_left_smaller():
    result = next_greater_element([3, 7])
    assert result == [7, -1]


def test_two_element_left_larger():
    result = next_greater_element([9, 2])
    assert result == [-1, -1]


if __name__ == "__main__":
    test_mixed_array()
    test_strictly_increasing()
    test_strictly_decreasing()
    test_all_equal()
    test_single_element()
    test_empty_array()
    test_default_input()
    test_with_duplicates()
    test_two_element_left_smaller()
    test_two_element_left_larger()
    print("All tests passed!")
