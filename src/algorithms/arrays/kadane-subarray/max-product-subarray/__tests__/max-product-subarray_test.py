import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("max-product-subarray")
max_product_subarray = module.max_product_subarray


def test_default_input():
    result = max_product_subarray([2, 3, -2, 4, -1, 2])
    assert result["max_product"] == 96, f"Expected 96, got {result['max_product']}"


def test_all_positive():
    result = max_product_subarray([1, 2, 3, 4])
    assert result["max_product"] == 24


def test_with_zero():
    result = max_product_subarray([2, 3, 0, 4, 5])
    assert result["max_product"] == 20


def test_single_element():
    result = max_product_subarray([7])
    assert result["max_product"] == 7
    assert result["start_index"] == 0
    assert result["end_index"] == 0


def test_two_negatives():
    result = max_product_subarray([-2, -3])
    assert result["max_product"] == 6


def test_negative_flip():
    result = max_product_subarray([-2, 3, -4])
    assert result["max_product"] == 24


def test_empty_array():
    result = max_product_subarray([])
    assert result["max_product"] == 0


def test_valid_indices():
    input_array = [2, 3, -2, 4, -1, 2]
    result = max_product_subarray(input_array)
    assert result["start_index"] >= 0
    assert result["end_index"] < len(input_array)
    assert result["start_index"] <= result["end_index"]


if __name__ == "__main__":
    test_default_input()
    test_all_positive()
    test_with_zero()
    test_single_element()
    test_two_negatives()
    test_negative_flip()
    test_empty_array()
    test_valid_indices()
    print("All tests passed!")
