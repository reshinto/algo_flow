import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("largest-rectangle-histogram")
largest_rectangle_histogram = module.largest_rectangle_histogram


def test_default_input():
    result = largest_rectangle_histogram([2, 1, 5, 6, 2, 3])
    assert result["max_area"] == 10
    assert result["left_index"] == 2
    assert result["right_index"] == 3
    assert result["height"] == 5


def test_empty_array():
    result = largest_rectangle_histogram([])
    assert result["max_area"] == 0
    assert result["left_index"] == -1
    assert result["right_index"] == -1


def test_single_bar():
    result = largest_rectangle_histogram([5])
    assert result["max_area"] == 5
    assert result["left_index"] == 0
    assert result["right_index"] == 0
    assert result["height"] == 5


def test_all_equal_bars():
    result = largest_rectangle_histogram([3, 3, 3, 3])
    assert result["max_area"] == 12


def test_strictly_increasing():
    result = largest_rectangle_histogram([1, 2, 3, 4, 5])
    assert result["max_area"] == 9


def test_strictly_decreasing():
    result = largest_rectangle_histogram([5, 4, 3, 2, 1])
    assert result["max_area"] == 9


def test_valley_shape():
    result = largest_rectangle_histogram([5, 0, 5])
    assert result["max_area"] == 5


def test_two_tall_bars():
    result = largest_rectangle_histogram([6, 6])
    assert result["max_area"] == 12


def test_spike_in_middle():
    result = largest_rectangle_histogram([2, 10, 2])
    assert result["max_area"] == 10


if __name__ == "__main__":
    test_default_input()
    test_empty_array()
    test_single_bar()
    test_all_equal_bars()
    test_strictly_increasing()
    test_strictly_decreasing()
    test_valley_shape()
    test_two_tall_bars()
    test_spike_in_middle()
    print("All tests passed!")
