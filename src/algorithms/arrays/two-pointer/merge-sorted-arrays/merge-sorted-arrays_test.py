import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("merge-sorted-arrays")
merge_sorted_arrays = module.merge_sorted_arrays


def test_basic_merge():
    result = merge_sorted_arrays([1, 3, 5], [2, 4, 6])
    assert result == [1, 2, 3, 4, 5, 6]


def test_empty_first_array():
    result = merge_sorted_arrays([], [1, 2, 3])
    assert result == [1, 2, 3]


def test_empty_second_array():
    result = merge_sorted_arrays([1, 2, 3], [])
    assert result == [1, 2, 3]


def test_both_empty():
    result = merge_sorted_arrays([], [])
    assert result == []


def test_overlapping_values():
    result = merge_sorted_arrays([1, 2, 4], [2, 3, 5])
    assert result == [1, 2, 2, 3, 4, 5]


def test_single_element_arrays():
    result = merge_sorted_arrays([5], [3])
    assert result == [3, 5]


def test_different_lengths():
    result = merge_sorted_arrays([1, 10], [2, 3, 4, 5, 6])
    assert result == [1, 2, 3, 4, 5, 6, 10]


def test_default_input():
    result = merge_sorted_arrays([1, 3, 5, 7, 9], [2, 4, 6, 8, 10])
    assert result == [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


if __name__ == "__main__":
    test_basic_merge()
    test_empty_first_array()
    test_empty_second_array()
    test_both_empty()
    test_overlapping_values()
    test_single_element_arrays()
    test_different_lengths()
    test_default_input()
    print("All tests passed!")
