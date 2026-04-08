import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

merge_k_sorted_arrays = importlib.import_module("merge-k-sorted-arrays").merge_k_sorted_arrays


def test_default_input():
    result = merge_k_sorted_arrays([[1, 4, 7], [2, 5, 8], [3, 6, 9]])
    assert result == [1, 2, 3, 4, 5, 6, 7, 8, 9], f"Expected sorted merge, got {result}"


def test_sorted_in_ascending_order():
    result = merge_k_sorted_arrays([[5, 10], [1, 7], [3, 8]])
    for idx in range(len(result) - 1):
        assert result[idx] <= result[idx + 1], f"Result not sorted at index {idx}"


def test_unequal_lengths():
    result = merge_k_sorted_arrays([[1], [2, 3, 4], [5, 6]])
    assert result == [1, 2, 3, 4, 5, 6]


def test_single_array():
    result = merge_k_sorted_arrays([[1, 2, 3]])
    assert result == [1, 2, 3]


def test_two_arrays():
    result = merge_k_sorted_arrays([[1, 3, 5], [2, 4, 6]])
    assert result == [1, 2, 3, 4, 5, 6]


def test_single_element_arrays():
    result = merge_k_sorted_arrays([[3], [1], [2]])
    assert result == [1, 2, 3]


def test_duplicates():
    result = merge_k_sorted_arrays([[1, 3, 3], [2, 3, 4]])
    assert result == [1, 2, 3, 3, 3, 4]


def test_negative_numbers():
    result = merge_k_sorted_arrays([[-3, -1, 0], [-2, 1, 2]])
    assert result == [-3, -2, -1, 0, 1, 2]


if __name__ == "__main__":
    test_default_input()
    test_sorted_in_ascending_order()
    test_unequal_lengths()
    test_single_array()
    test_two_arrays()
    test_single_element_arrays()
    test_duplicates()
    test_negative_numbers()
    print("All tests passed!")
