import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("subarray-product-less-than-k")
subarray_product_less_than_k = module.subarray_product_less_than_k


def test_default_input():
    result = subarray_product_less_than_k([10, 5, 2, 6, 1, 3], 100)
    assert result["count"] == 16


def test_threshold_zero():
    result = subarray_product_less_than_k([1, 2, 3], 0)
    assert result["count"] == 0


def test_threshold_one():
    result = subarray_product_less_than_k([1, 2, 3], 1)
    assert result["count"] == 0


def test_empty_array():
    result = subarray_product_less_than_k([], 100)
    assert result["count"] == 0


def test_threshold_filters_multi_element():
    result = subarray_product_less_than_k([1, 2, 3, 4], 5)
    assert result["count"] == 5


def test_all_ones():
    result = subarray_product_less_than_k([1, 1, 1], 2)
    assert result["count"] == 6


def test_single_element_below_threshold():
    result = subarray_product_less_than_k([5], 10)
    assert result["count"] == 1


def test_single_element_at_threshold():
    result = subarray_product_less_than_k([10], 10)
    assert result["count"] == 0


def test_large_threshold_all_qualify():
    result = subarray_product_less_than_k([1, 2, 3], 1000)
    assert result["count"] == 6


if __name__ == "__main__":
    test_default_input()
    test_threshold_zero()
    test_threshold_one()
    test_empty_array()
    test_threshold_filters_multi_element()
    test_all_ones()
    test_single_element_below_threshold()
    test_single_element_at_threshold()
    test_large_threshold_all_qualify()
    print("All tests passed!")
