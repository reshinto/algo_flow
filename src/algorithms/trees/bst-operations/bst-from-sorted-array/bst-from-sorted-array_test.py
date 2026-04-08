import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bst-from-sorted-array")
BSTNode = module.BSTNode
bst_from_sorted_array = module.bst_from_sorted_array


def test_root_at_mid_value():
    result = bst_from_sorted_array([1, 2, 3, 4, 5, 6, 7])
    assert result.value == 4


def test_single_element():
    result = bst_from_sorted_array([42])
    assert result.value == 42
    assert result.left is None
    assert result.right is None


def test_empty_array():
    assert bst_from_sorted_array([]) is None


def test_two_element_tree():
    result = bst_from_sorted_array([1, 2])
    assert result.value == 1
    assert result.right.value == 2


def test_five_element_tree():
    result = bst_from_sorted_array([1, 2, 3, 4, 5])
    assert result.value == 3
    assert result.left.value == 1
    assert result.right.value == 4


if __name__ == "__main__":
    test_root_at_mid_value()
    test_single_element()
    test_empty_array()
    test_two_element_tree()
    test_five_element_tree()
    print("All tests passed!")
