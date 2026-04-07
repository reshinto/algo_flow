import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("segment-tree-range-sum")
segment_tree_range_sum = module.segment_tree_range_sum


def test_range_sum_default_input():
    result = segment_tree_range_sum([1, 3, 5, 7, 9, 11], [[1, 3], [0, 5]])
    assert result[0] == 15   # 3+5+7
    assert result[1] == 36   # 1+3+5+7+9+11


def test_single_element_query():
    result = segment_tree_range_sum([4, 2, 6], [[1, 1]])
    assert result[0] == 2


def test_full_range_query():
    result = segment_tree_range_sum([1, 2, 3, 4, 5], [[0, 4]])
    assert result[0] == 15


def test_multiple_queries():
    result = segment_tree_range_sum([10, 20, 30, 40, 50], [[0, 1], [2, 4], [1, 3]])
    assert result[0] == 30
    assert result[1] == 120
    assert result[2] == 90


if __name__ == "__main__":
    test_range_sum_default_input()
    test_single_element_query()
    test_full_range_query()
    test_multiple_queries()
    print("All tests passed!")
