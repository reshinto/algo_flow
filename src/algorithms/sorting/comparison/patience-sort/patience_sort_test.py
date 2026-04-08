import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

patience_sort_module = importlib.import_module("patience-sort")
patience_sort = patience_sort_module.patience_sort


def test_sorts_unsorted_array():
    assert patience_sort([3, 1, 4, 1, 5, 9, 2, 6]) == [1, 1, 2, 3, 4, 5, 6, 9]


def test_handles_already_sorted_array():
    assert patience_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert patience_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_duplicate_values():
    assert patience_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]


def test_handles_single_element_array():
    assert patience_sort([42]) == [42]


def test_handles_empty_array():
    assert patience_sort([]) == []


def test_handles_array_with_negative_numbers():
    assert patience_sort([3, -1, 0, -5, 2]) == [-5, -1, 0, 2, 3]


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = patience_sort(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


def test_sorts_a_larger_array_correctly():
    assert patience_sort([64, 34, 25, 12, 22, 11, 90, 55, 47, 8]) == [8, 11, 12, 22, 25, 34, 47, 55, 64, 90]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_array_with_negative_numbers()
    test_does_not_mutate_original_array()
    test_sorts_a_larger_array_correctly()
    print("All tests passed!")
