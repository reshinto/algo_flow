import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

find_median_stream = importlib.import_module("find-median-stream").find_median_stream


def test_default_stream():
    result = find_median_stream([5, 2, 8, 1, 9, 3, 7])
    assert result == [5, 3.5, 5, 3.5, 5, 4, 5], f"Expected [5, 3.5, 5, 3.5, 5, 4, 5], got {result}"


def test_single_element():
    result = find_median_stream([42])
    assert result == [42], f"Expected [42], got {result}"


def test_two_elements():
    result = find_median_stream([3, 7])
    assert result == [3, 5], f"Expected [3, 5], got {result}"


def test_all_identical():
    result = find_median_stream([4, 4, 4, 4])
    assert result == [4, 4, 4, 4], f"Expected [4, 4, 4, 4], got {result}"


def test_ascending_stream():
    result = find_median_stream([1, 2, 3, 4, 5])
    assert result == [1, 1.5, 2, 2.5, 3], f"Expected [1, 1.5, 2, 2.5, 3], got {result}"


def test_descending_stream():
    result = find_median_stream([5, 4, 3, 2, 1])
    assert result == [5, 4.5, 4, 3.5, 3], f"Expected [5, 4.5, 4, 3.5, 3], got {result}"


def test_negative_numbers():
    result = find_median_stream([-5, -1, -3])
    assert result == [-5, -3, -3], f"Expected [-5, -3, -3], got {result}"


def test_mixed_negative_positive():
    result = find_median_stream([-2, 0, 2])
    assert result == [-2, -1, 0], f"Expected [-2, -1, 0], got {result}"


def test_odd_length_stream():
    result = find_median_stream([1, 3, 5, 7, 9])
    assert result == [1, 2, 3, 4, 5], f"Expected [1, 2, 3, 4, 5], got {result}"


def test_two_equal_values():
    result = find_median_stream([7, 7])
    assert result == [7, 7], f"Expected [7, 7], got {result}"


if __name__ == "__main__":
    test_default_stream()
    test_single_element()
    test_two_elements()
    test_all_identical()
    test_ascending_stream()
    test_descending_stream()
    test_negative_numbers()
    test_mixed_negative_positive()
    test_odd_length_stream()
    test_two_equal_values()
    print("All tests passed!")
