import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("bst-range-sum")
BSTNode = module.BSTNode
bst_range_sum = module.bst_range_sum


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_sums_values_in_2_to_6():
    assert bst_range_sum(tree, 2, 6) == 2 + 3 + 4 + 5 + 6


def test_sums_all_values():
    assert bst_range_sum(tree, 1, 7) == 28


def test_returns_zero_no_match():
    assert bst_range_sum(tree, 10, 20) == 0


def test_sums_single_matching_node():
    assert bst_range_sum(tree, 4, 4) == 4


def test_null_tree():
    assert bst_range_sum(None, 1, 7) == 0


if __name__ == "__main__":
    test_sums_values_in_2_to_6()
    test_sums_all_values()
    test_returns_zero_no_match()
    test_sums_single_matching_node()
    test_null_tree()
    print("All tests passed!")
