import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("minimum-subarray-sum")
minimum_subarray_sum = module.minimum_subarray_sum


def test_default_input():
    result = minimum_subarray_sum([3, -4, 2, -3, -1, 7, -5])
    assert result["min_sum"] == -6
    assert result["start_index"] == 1
    assert result["end_index"] == 4


def test_all_positive_returns_min_element():
    result = minimum_subarray_sum([3, 1, 4, 1, 5])
    assert result["min_sum"] == 1


def test_all_negative_returns_full_array():
    result = minimum_subarray_sum([-1, -2, -3])
    assert result["min_sum"] == -6
    assert result["start_index"] == 0
    assert result["end_index"] == 2


def test_single_element():
    result = minimum_subarray_sum([-5])
    assert result["min_sum"] == -5
    assert result["start_index"] == 0
    assert result["end_index"] == 0


def test_empty_array():
    result = minimum_subarray_sum([])
    assert result["min_sum"] == 0


def test_single_negative_amid_positives():
    result = minimum_subarray_sum([5, 5, -20, 5, 5])
    assert result["min_sum"] == -20
    assert result["start_index"] == 2
    assert result["end_index"] == 2


def test_all_same_negative():
    result = minimum_subarray_sum([-3, -3, -3])
    assert result["min_sum"] == -9
    assert result["start_index"] == 0
    assert result["end_index"] == 2


def test_large_negative_in_middle():
    result = minimum_subarray_sum([100, -200, 100])
    assert result["min_sum"] == -200
    assert result["start_index"] == 1
    assert result["end_index"] == 1


if __name__ == "__main__":
    test_default_input()
    test_all_positive_returns_min_element()
    test_all_negative_returns_full_array()
    test_single_element()
    test_empty_array()
    test_single_negative_amid_positives()
    test_all_same_negative()
    test_large_negative_in_middle()
    print("All tests passed!")
