import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

stooge_sort_module = importlib.import_module("stooge-sort")
stooge_sort = stooge_sort_module.stooge_sort


def test_sorts_unsorted_array():
    assert stooge_sort([5, 3, 1, 4, 2]) == [1, 2, 3, 4, 5]


def test_handles_already_sorted_array():
    assert stooge_sort([1, 2, 3]) == [1, 2, 3]


def test_handles_reverse_sorted_array():
    assert stooge_sort([3, 2, 1]) == [1, 2, 3]


def test_handles_array_with_duplicate_values():
    assert stooge_sort([3, 1, 2, 1, 3]) == [1, 1, 2, 3, 3]


def test_handles_single_element_array():
    assert stooge_sort([42]) == [42]


def test_handles_empty_array():
    assert stooge_sort([]) == []


def test_handles_array_with_negative_numbers():
    assert stooge_sort([3, -1, 2]) == [-1, 2, 3]


def test_does_not_mutate_original_array():
    original = [5, 3, 1, 4, 2]
    sorted_result = stooge_sort(original)
    assert sorted_result == [1, 2, 3, 4, 5]
    assert original == [5, 3, 1, 4, 2]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_array_with_negative_numbers()
    test_does_not_mutate_original_array()
    print("All tests passed!")
