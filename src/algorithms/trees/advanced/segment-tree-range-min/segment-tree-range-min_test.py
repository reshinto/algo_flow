import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("segment-tree-range-min")
segment_tree_range_min = module.segment_tree_range_min


def test_range_min_default_input():
    result = segment_tree_range_min([2, 5, 1, 4, 9, 3], [[0, 2], [3, 5]])
    assert result[0] == 1   # min of [2,5,1]
    assert result[1] == 3   # min of [4,9,3]


def test_single_element_query():
    result = segment_tree_range_min([4, 2, 6], [[1, 1]])
    assert result[0] == 2


def test_full_range_query():
    result = segment_tree_range_min([3, 1, 4, 1, 5, 9], [[0, 5]])
    assert result[0] == 1


def test_multiple_queries():
    result = segment_tree_range_min([10, 3, 8, 1, 7], [[0, 2], [1, 4], [3, 4]])
    assert result[0] == 3
    assert result[1] == 1
    assert result[2] == 1


if __name__ == "__main__":
    test_range_min_default_input()
    test_single_element_query()
    test_full_range_query()
    test_multiple_queries()
    print("All tests passed!")
