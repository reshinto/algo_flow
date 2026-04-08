import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("prefix-sum")
prefix_sum = module.prefix_sum


def test_single_query():
    result = prefix_sum([1, 2, 3, 4, 5], [[1, 3]])
    assert result["prefix_array"] == [1, 3, 6, 10, 15]
    assert result["query_results"] == [9]


def test_multiple_queries():
    result = prefix_sum([2, 4, 1, 3, 5, 2], [[1, 3], [0, 4], [2, 5]])
    assert result["query_results"] == [8, 15, 11]


def test_full_range_query():
    result = prefix_sum([3, 1, 4, 1, 5, 9, 2], [[0, 6]])
    assert result["query_results"][0] == 25


def test_single_element_range():
    result = prefix_sum([10, 20, 30, 40], [[2, 2]])
    assert result["query_results"][0] == 30


def test_empty_input():
    result = prefix_sum([], [])
    assert result["prefix_array"] == []
    assert result["query_results"] == []


def test_negative_numbers():
    result = prefix_sum([-2, 5, -1, 3], [[0, 3]])
    assert result["query_results"][0] == 5


def test_default_input():
    result = prefix_sum([2, 4, 1, 3, 5, 2], [[1, 3], [0, 4], [2, 5]])
    assert result["query_results"] == [8, 15, 11]
    assert result["prefix_array"] == [2, 6, 7, 10, 15, 17]


def test_query_from_index_zero():
    result = prefix_sum([5, 3, 2, 8], [[0, 2]])
    assert result["query_results"][0] == 10


if __name__ == "__main__":
    test_single_query()
    test_multiple_queries()
    test_full_range_query()
    test_single_element_range()
    test_empty_input()
    test_negative_numbers()
    test_default_input()
    test_query_from_index_zero()
    print("All tests passed!")
