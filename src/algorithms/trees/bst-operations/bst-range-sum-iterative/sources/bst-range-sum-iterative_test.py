import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bst-range-sum-iterative")
BSTNode = module.BSTNode
bst_range_sum_iterative = module.bst_range_sum_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_sums_range_3_to_7():
    assert bst_range_sum_iterative(tree, 3, 7) == 3 + 4 + 5 + 6 + 7


def test_sums_all_values():
    assert bst_range_sum_iterative(tree, 1, 7) == 28


def test_returns_zero_no_match():
    assert bst_range_sum_iterative(tree, 10, 20) == 0


def test_null_tree():
    assert bst_range_sum_iterative(None, 1, 7) == 0


if __name__ == "__main__":
    test_sums_range_3_to_7()
    test_sums_all_values()
    test_returns_zero_no_match()
    test_null_tree()
    print("All tests passed!")
