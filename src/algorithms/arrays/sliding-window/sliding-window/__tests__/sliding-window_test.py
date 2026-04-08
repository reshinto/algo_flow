import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("sliding-window")
max_sum_subarray = module.max_sum_subarray


def test_basic_array():
    result = max_sum_subarray([2, 1, 5, 1, 3, 2], 3)
    assert result["max_sum"] == 9
    assert result["window_start_index"] == 2


def test_window_at_start():
    result = max_sum_subarray([10, 9, 8, 1, 2, 3], 3)
    assert result["max_sum"] == 27
    assert result["window_start_index"] == 0


def test_window_at_end():
    result = max_sum_subarray([1, 2, 3, 8, 9, 10], 3)
    assert result["max_sum"] == 27
    assert result["window_start_index"] == 3


def test_array_equals_window_size():
    result = max_sum_subarray([3, 5, 7], 3)
    assert result["max_sum"] == 15
    assert result["window_start_index"] == 0


def test_window_size_one():
    result = max_sum_subarray([4, 1, 7, 2, 9], 1)
    assert result["max_sum"] == 9
    assert result["window_start_index"] == 4


def test_empty_array():
    result = max_sum_subarray([], 3)
    assert result["max_sum"] == 0


def test_window_exceeds_length():
    result = max_sum_subarray([1, 2], 5)
    assert result["max_sum"] == 0


def test_negative_numbers():
    result = max_sum_subarray([-1, -3, -5, -2, -1, -4], 2)
    assert result["max_sum"] == -3
    assert result["window_start_index"] == 3


def test_default_algorithm_input():
    result = max_sum_subarray([2, 1, 5, 1, 3, 2, 8, 4, 3, 5], 3)
    assert result["max_sum"] == 15
    assert result["window_start_index"] == 6


if __name__ == "__main__":
    test_basic_array()
    test_window_at_start()
    test_window_at_end()
    test_array_equals_window_size()
    test_window_size_one()
    test_empty_array()
    test_window_exceeds_length()
    test_negative_numbers()
    test_default_algorithm_input()
    print("All tests passed!")
