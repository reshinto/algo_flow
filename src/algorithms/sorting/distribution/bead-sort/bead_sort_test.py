import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

bead_sort_module = importlib.import_module("bead-sort")
bead_sort = bead_sort_module.bead_sort


def test_sorts_unsorted_array():
    assert bead_sort([64, 34, 25, 12, 22, 11, 90]) == [11, 12, 22, 25, 34, 64, 90]


def test_handles_already_sorted_array():
    assert bead_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert bead_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_duplicate_values():
    assert bead_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]


def test_handles_single_element_array():
    assert bead_sort([42]) == [42]


def test_handles_empty_array():
    assert bead_sort([]) == []


def test_handles_all_identical_elements():
    assert bead_sort([7, 7, 7, 7]) == [7, 7, 7, 7]


def test_handles_array_with_all_zeros():
    assert bead_sort([0, 0, 0]) == [0, 0, 0]


def test_handles_negative_numbers_by_offsetting():
    assert bead_sort([3, -1, 0, -5, 2]) == [-5, -1, 0, 2, 3]


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = bead_sort(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_all_identical_elements()
    test_handles_array_with_all_zeros()
    test_handles_negative_numbers_by_offsetting()
    test_does_not_mutate_original_array()
    print("All tests passed!")
