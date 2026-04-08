import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
bit_module = importlib.import_module("binary-indexed-tree")
binary_indexed_tree = bit_module.binary_indexed_tree


def test_range_sums_default_input():
    result = binary_indexed_tree([3, 2, 4, 5, 1, 1, 5, 3], [[0, 4], [2, 6]])
    assert result[0] == 15  # 3+2+4+5+1
    assert result[1] == 16  # 4+5+1+1+5


def test_single_element_query():
    result = binary_indexed_tree([10, 20, 30], [[1, 1]])
    assert result[0] == 20


def test_full_range_query():
    result = binary_indexed_tree([1, 2, 3, 4, 5], [[0, 4]])
    assert result[0] == 15


def test_multiple_queries():
    result = binary_indexed_tree([5, 3, 2, 8, 1], [[0, 2], [1, 4], [2, 3]])
    assert result[0] == 10  # 5+3+2
    assert result[1] == 14  # 3+2+8+1
    assert result[2] == 10  # 2+8


if __name__ == "__main__":
    test_range_sums_default_input()
    test_single_element_query()
    test_full_range_query()
    test_multiple_queries()
    print("All tests passed!")
