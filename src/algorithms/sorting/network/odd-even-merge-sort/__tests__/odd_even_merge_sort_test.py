import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

odd_even_merge_sort_module = importlib.import_module("odd-even-merge-sort")
odd_even_merge_sort = odd_even_merge_sort_module.odd_even_merge_sort


def test_sorts_unsorted_array():
    assert odd_even_merge_sort([6, 3, 8, 1, 7, 2, 5, 4]) == [1, 2, 3, 4, 5, 6, 7, 8]


def test_handles_already_sorted_array():
    assert odd_even_merge_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert odd_even_merge_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_duplicate_values():
    assert odd_even_merge_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]


def test_handles_single_element_array():
    assert odd_even_merge_sort([42]) == [42]


def test_handles_empty_array():
    assert odd_even_merge_sort([]) == []


def test_handles_array_with_negative_numbers():
    assert odd_even_merge_sort([3, -1, 0, -5, 2]) == [-5, -1, 0, 2, 3]


def test_does_not_mutate_original_array():
    original = [4, 2, 3, 1]
    sorted_result = odd_even_merge_sort(original)
    assert sorted_result == [1, 2, 3, 4]
    assert original == [4, 2, 3, 1]


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
