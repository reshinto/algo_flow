import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("longest-k-distinct")
longest_k_distinct = module.longest_k_distinct


def test_default_input():
    result = longest_k_distinct([1, 2, 1, 2, 3, 3, 4, 1], 2)
    assert result["max_length"] == 4


def test_k_equals_one():
    result = longest_k_distinct([1, 2, 2, 3, 3, 3], 1)
    assert result["max_length"] == 3
    assert result["start_index"] == 3


def test_k_gte_distinct():
    result = longest_k_distinct([1, 2, 3], 5)
    assert result["max_length"] == 3
    assert result["start_index"] == 0


def test_all_identical():
    result = longest_k_distinct([2, 2, 2, 2], 2)
    assert result["max_length"] == 4
    assert result["start_index"] == 0


def test_k_zero():
    result = longest_k_distinct([1, 2, 3], 0)
    assert result["max_length"] == 0


def test_empty_array():
    result = longest_k_distinct([], 2)
    assert result["max_length"] == 0


def test_single_element():
    result = longest_k_distinct([7], 1)
    assert result["max_length"] == 1
    assert result["start_index"] == 0


def test_start_index_within_bounds():
    input_array = [1, 2, 1, 2, 3, 3, 4, 1]
    result = longest_k_distinct(input_array, 2)
    assert 0 <= result["start_index"] < len(input_array)


def test_subarray_has_at_most_k_distinct():
    input_array = [1, 2, 1, 2, 3, 3, 4, 1]
    max_distinct = 2
    result = longest_k_distinct(input_array, max_distinct)
    subarray = input_array[result["start_index"]:result["start_index"] + result["max_length"]]
    assert len(set(subarray)) <= max_distinct


if __name__ == "__main__":
    test_default_input()
    test_k_equals_one()
    test_k_gte_distinct()
    test_all_identical()
    test_k_zero()
    test_empty_array()
    test_single_element()
    test_start_index_within_bounds()
    test_subarray_has_at_most_k_distinct()
    print("All tests passed!")
