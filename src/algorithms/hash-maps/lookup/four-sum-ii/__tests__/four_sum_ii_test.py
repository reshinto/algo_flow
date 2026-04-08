import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

four_sum_ii = importlib.import_module("four-sum-ii").four_sum_ii


def test_returns_2_for_default():
    assert four_sum_ii([1, 2], [-2, -1], [-1, 2], [0, 2]) == 2


def test_returns_0_when_no_zero_sum():
    assert four_sum_ii([1, 2], [3, 4], [5, 6], [7, 8]) == 0


def test_handles_all_zeros():
    assert four_sum_ii([0, 0], [0, 0], [0, 0], [0, 0]) == 16


def test_handles_single_element_arrays():
    assert four_sum_ii([1], [-1], [1], [-1]) == 1


def test_handles_negative_values():
    assert four_sum_ii([-1, -2], [1, 2], [1, 2], [-1, -2]) == 6


def test_counts_all_tuples_not_unique():
    assert four_sum_ii([1, 1], [-1, -1], [0], [0]) == 4


def test_handles_large_complementary_values():
    assert four_sum_ii([1000], [-1000], [500], [-500]) == 1


if __name__ == "__main__":
    test_returns_2_for_default()
    test_returns_0_when_no_zero_sum()
    test_handles_all_zeros()
    test_handles_single_element_arrays()
    test_handles_negative_values()
    test_counts_all_tuples_not_unique()
    test_handles_large_complementary_values()
    print("All tests passed!")
