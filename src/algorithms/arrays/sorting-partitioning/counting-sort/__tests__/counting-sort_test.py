import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("counting-sort")
counting_sort = module.counting_sort


def test_basic_unsorted_array():
    result = counting_sort([3, 1, 4, 1, 5, 9, 2, 6])
    assert result == [1, 1, 2, 3, 4, 5, 6, 9]


def test_already_sorted():
    result = counting_sort([1, 2, 3, 4, 5])
    assert result == [1, 2, 3, 4, 5]


def test_reverse_sorted():
    result = counting_sort([5, 4, 3, 2, 1])
    assert result == [1, 2, 3, 4, 5]


def test_all_same_elements():
    result = counting_sort([3, 3, 3, 3])
    assert result == [3, 3, 3, 3]


def test_single_element():
    result = counting_sort([7])
    assert result == [7]


def test_empty_array():
    result = counting_sort([])
    assert result == []


def test_duplicates():
    result = counting_sort([4, 2, 2, 8, 3, 3, 1])
    assert result == [1, 2, 2, 3, 3, 4, 8]


def test_default_input():
    result = counting_sort([4, 2, 2, 8, 3, 3, 1, 7, 5])
    assert result == [1, 2, 2, 3, 3, 4, 5, 7, 8]


if __name__ == "__main__":
    test_basic_unsorted_array()
    test_already_sorted()
    test_reverse_sorted()
    test_all_same_elements()
    test_single_element()
    test_empty_array()
    test_duplicates()
    test_default_input()
    print("All tests passed!")
