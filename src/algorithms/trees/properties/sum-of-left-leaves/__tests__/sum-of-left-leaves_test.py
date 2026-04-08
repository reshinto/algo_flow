import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("sum-of-left-leaves")
sum_of_left_leaves = mod.sum_of_left_leaves
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert sum_of_left_leaves(root) == 6


def test_null_root():
    assert sum_of_left_leaves(None) == 0


def test_single_node():
    assert sum_of_left_leaves(make_node(1)) == 0


def test_left_leaf():
    assert sum_of_left_leaves(make_node(1, make_node(5))) == 5


def test_no_left_leaves():
    assert sum_of_left_leaves(make_node(1, None, make_node(2))) == 0


if __name__ == "__main__":
    test_7_node_bst()
    test_null_root()
    test_single_node()
    test_left_leaf()
    test_no_left_leaves()
    print("All tests passed!")
