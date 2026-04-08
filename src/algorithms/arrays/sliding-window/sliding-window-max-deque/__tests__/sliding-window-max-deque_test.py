import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("sliding-window-max-deque")
sliding_window_max_deque = module.sliding_window_max_deque


def test_default_input():
    result = sliding_window_max_deque([1, 3, -1, -3, 5, 3, 6, 7], 3)
    assert result == [3, 3, 5, 5, 6, 7]


def test_empty_array():
    result = sliding_window_max_deque([], 3)
    assert result == []


def test_window_exceeds_array_length():
    result = sliding_window_max_deque([1, 2], 5)
    assert result == []


def test_window_size_zero():
    result = sliding_window_max_deque([1, 2, 3], 0)
    assert result == []


def test_window_equals_array_length():
    result = sliding_window_max_deque([3, 1, 4, 1, 5], 5)
    assert result == [5]


def test_window_size_one():
    result = sliding_window_max_deque([4, 2, 7, 1, 9], 1)
    assert result == [4, 2, 7, 1, 9]


def test_all_equal_elements():
    result = sliding_window_max_deque([5, 5, 5, 5], 2)
    assert result == [5, 5, 5]


def test_decreasing_array():
    result = sliding_window_max_deque([9, 7, 5, 3, 1], 3)
    assert result == [9, 7, 5]


def test_increasing_array():
    result = sliding_window_max_deque([1, 3, 5, 7, 9], 3)
    assert result == [5, 7, 9]


def test_negative_numbers():
    result = sliding_window_max_deque([-4, -2, -5, -1, -3], 2)
    assert result == [-2, -2, -1, -1]


def test_result_length():
    input_array = [1, 3, -1, -3, 5, 3, 6, 7]
    window_size = 3
    result = sliding_window_max_deque(input_array, window_size)
    assert len(result) == len(input_array) - window_size + 1


if __name__ == "__main__":
    test_default_input()
    test_empty_array()
    test_window_exceeds_array_length()
    test_window_size_zero()
    test_window_equals_array_length()
    test_window_size_one()
    test_all_equal_elements()
    test_decreasing_array()
    test_increasing_array()
    test_negative_numbers()
    test_result_length()
    print("All tests passed!")
