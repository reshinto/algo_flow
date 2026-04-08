import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

strand_sort_module = importlib.import_module("strand-sort")
strand_sort = strand_sort_module.strand_sort


def test_sorts_unsorted_array():
    assert strand_sort([64, 34, 25, 12, 22, 11, 90]) == [11, 12, 22, 25, 34, 64, 90]


def test_handles_already_sorted_array():
    assert strand_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert strand_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_duplicate_values():
    assert strand_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]


def test_handles_single_element_array():
    assert strand_sort([42]) == [42]


def test_handles_empty_array():
    assert strand_sort([]) == []


def test_handles_array_with_negative_numbers():
    assert strand_sort([3, -1, 0, -5, 2]) == [-5, -1, 0, 2, 3]


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = strand_sort(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


def test_handles_two_element_array():
    assert strand_sort([2, 1]) == [1, 2]


def test_extracts_multiple_strands():
    assert strand_sort([3, 1, 4, 2, 5]) == [1, 2, 3, 4, 5]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_array_with_negative_numbers()
    test_does_not_mutate_original_array()
    test_handles_two_element_array()
    test_extracts_multiple_strands()
    print("All tests passed!")
