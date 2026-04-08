import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("previous-smaller-element")
previous_smaller_element = module.previous_smaller_element


def test_default_input():
    result = previous_smaller_element([4, 10, 5, 8, 20, 15, 3, 12])
    assert result == [-1, 4, 4, 5, 8, 8, -1, 3]


def test_strictly_decreasing():
    result = previous_smaller_element([5, 4, 3, 2, 1])
    assert result == [-1, -1, -1, -1, -1]


def test_strictly_increasing():
    result = previous_smaller_element([1, 2, 3, 4, 5])
    assert result == [-1, 1, 2, 3, 4]


def test_all_equal():
    result = previous_smaller_element([3, 3, 3, 3])
    assert result == [-1, -1, -1, -1]


def test_single_element():
    result = previous_smaller_element([7])
    assert result == [-1]


def test_empty_array():
    result = previous_smaller_element([])
    assert result == []


def test_two_elements_first_smaller():
    result = previous_smaller_element([2, 5])
    assert result == [-1, 2]


def test_two_elements_first_larger():
    result = previous_smaller_element([5, 2])
    assert result == [-1, -1]


def test_valley_peak_pattern():
    result = previous_smaller_element([1, 3, 2, 4])
    assert result == [-1, 1, 1, 2]


if __name__ == "__main__":
    test_default_input()
    test_strictly_decreasing()
    test_strictly_increasing()
    test_all_equal()
    test_single_element()
    test_empty_array()
    test_two_elements_first_smaller()
    test_two_elements_first_larger()
    test_valley_peak_pattern()
    print("All tests passed!")
