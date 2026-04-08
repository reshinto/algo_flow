import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

single_number_module = importlib.import_module("single-number")
single_number = single_number_module.single_number


def test_basic_array():
    result = single_number([4, 1, 2, 1, 2])
    assert result["unique_element"] == 4, f"Expected 4, got {result['unique_element']}"


def test_single_element():
    result = single_number([42])
    assert result["unique_element"] == 42, f"Expected 42, got {result['unique_element']}"


def test_unique_at_end():
    result = single_number([1, 1, 2, 2, 3])
    assert result["unique_element"] == 3, f"Expected 3, got {result['unique_element']}"


def test_unique_at_start():
    result = single_number([5, 3, 3, 7, 7])
    assert result["unique_element"] == 5, f"Expected 5, got {result['unique_element']}"


def test_empty_array():
    result = single_number([])
    assert result["unique_element"] == 0, f"Expected 0, got {result['unique_element']}"


def test_negative_numbers():
    result = single_number([-1, 2, -1])
    assert result["unique_element"] == 2, f"Expected 2, got {result['unique_element']}"


def test_larger_array():
    result = single_number([1, 2, 3, 4, 5, 99, 5, 4, 3, 2, 1])
    assert result["unique_element"] == 99, f"Expected 99, got {result['unique_element']}"


def test_unique_zero():
    result = single_number([1, 2, 1, 2, 0])
    assert result["unique_element"] == 0, f"Expected 0, got {result['unique_element']}"


if __name__ == "__main__":
    test_basic_array()
    test_single_element()
    test_unique_at_end()
    test_unique_at_start()
    test_empty_array()
    test_negative_numbers()
    test_larger_array()
    test_unique_zero()
    print("All tests passed!")
