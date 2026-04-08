import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

radix_sort_msd_module = importlib.import_module("radix-sort-msd")
radix_sort_msd = radix_sort_msd_module.radix_sort_msd


def test_sorts_unsorted_array():
    assert radix_sort_msd([64, 34, 25, 12, 22, 11, 90]) == [11, 12, 22, 25, 34, 64, 90]


def test_handles_already_sorted_array():
    assert radix_sort_msd([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_handles_reverse_sorted_array():
    assert radix_sort_msd([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]


def test_handles_array_with_duplicate_values():
    assert radix_sort_msd([3, 1, 4, 1, 5, 9, 2, 6, 5]) == [1, 1, 2, 3, 4, 5, 5, 6, 9]


def test_handles_single_element_array():
    assert radix_sort_msd([42]) == [42]


def test_handles_empty_array():
    assert radix_sort_msd([]) == []


def test_handles_multi_digit_numbers():
    assert radix_sort_msd([170, 45, 75, 90, 802, 24, 2, 66]) == [2, 24, 45, 66, 75, 90, 170, 802]


def test_handles_negative_numbers_using_offset():
    assert radix_sort_msd([3, -1, 0, -5, 2]) == [-5, -1, 0, 2, 3]


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = radix_sort_msd(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


if __name__ == "__main__":
    test_sorts_unsorted_array()
    test_handles_already_sorted_array()
    test_handles_reverse_sorted_array()
    test_handles_array_with_duplicate_values()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_multi_digit_numbers()
    test_handles_negative_numbers_using_offset()
    test_does_not_mutate_original_array()
    print("All tests passed!")
