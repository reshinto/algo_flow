import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("sum-root-to-leaf-numbers")
sum_root_to_leaf_numbers = mod.sum_root_to_leaf_numbers
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_7_node_bst():
    # 421 + 423 + 465 + 467 = 1776
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert sum_root_to_leaf_numbers(root) == 1776


def test_null_root():
    assert sum_root_to_leaf_numbers(None) == 0


def test_single_node():
    assert sum_root_to_leaf_numbers(make_node(5)) == 5


def test_simple_3_node_tree():
    assert sum_root_to_leaf_numbers(make_node(1, make_node(2), make_node(3))) == 25


if __name__ == "__main__":
    test_7_node_bst()
    test_null_root()
    test_single_node()
    test_simple_3_node_tree()
    print("All tests passed!")
