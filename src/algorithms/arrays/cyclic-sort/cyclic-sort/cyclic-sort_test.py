import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

cyclic_sort_module = importlib.import_module("cyclic-sort")
cyclic_sort = cyclic_sort_module.cyclic_sort


def test_basic_unsorted():
    assert cyclic_sort([3, 5, 2, 1, 4]) == [1, 2, 3, 4, 5]


def test_already_sorted():
    assert cyclic_sort([1, 2, 3, 4]) == [1, 2, 3, 4]


def test_reverse_sorted():
    assert cyclic_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_single_element():
    assert cyclic_sort([1]) == [1]


def test_empty_array():
    assert cyclic_sort([]) == []


def test_two_elements_swapped():
    assert cyclic_sort([2, 1]) == [1, 2]


def test_default_input():
    assert cyclic_sort([3, 5, 2, 1, 4, 6]) == [1, 2, 3, 4, 5, 6]


def test_does_not_mutate():
    original = [3, 5, 2, 1, 4]
    cyclic_sort(original)
    assert original == [3, 5, 2, 1, 4]


def test_longer_array():
    result = cyclic_sort([8, 3, 6, 1, 5, 9, 2, 7, 4, 10])
    assert result == [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


if __name__ == "__main__":
    test_basic_unsorted()
    test_already_sorted()
    test_reverse_sorted()
    test_single_element()
    test_empty_array()
    test_two_elements_swapped()
    test_default_input()
    test_does_not_mutate()
    test_longer_array()
    print("All tests passed!")
