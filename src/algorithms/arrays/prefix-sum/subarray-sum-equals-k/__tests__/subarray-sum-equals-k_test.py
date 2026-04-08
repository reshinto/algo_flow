import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("subarray-sum-equals-k")
subarray_sum_equals_k = module.subarray_sum_equals_k


def test_count_two_subarrays():
    result = subarray_sum_equals_k([1, 2, 3], 3)
    assert result["count"] == 2


def test_no_match():
    result = subarray_sum_equals_k([1, 2, 3], 10)
    assert result["count"] == 0


def test_single_element_equals_k():
    result = subarray_sum_equals_k([5, 1, 3], 5)
    assert result["count"] == 1


def test_empty_array():
    result = subarray_sum_equals_k([], 3)
    assert result["count"] == 0


def test_all_equal_to_k():
    result = subarray_sum_equals_k([3, 3, 3], 3)
    assert result["count"] == 3


def test_all_zeros_target_zero():
    result = subarray_sum_equals_k([0, 0, 0], 0)
    assert result["count"] == 6


def test_single_element_match():
    result = subarray_sum_equals_k([7], 7)
    assert result["count"] == 1


def test_single_element_no_match():
    result = subarray_sum_equals_k([4], 7)
    assert result["count"] == 0


if __name__ == "__main__":
    test_count_two_subarrays()
    test_no_match()
    test_single_element_equals_k()
    test_empty_array()
    test_all_equal_to_k()
    test_all_zeros_target_zero()
    test_single_element_match()
    test_single_element_no_match()
    print("All tests passed!")
