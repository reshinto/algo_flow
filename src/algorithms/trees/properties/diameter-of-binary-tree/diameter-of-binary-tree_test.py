import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
import sys

mod = importlib.import_module("diameter-of-binary-tree")
diameter_of_binary_tree = mod.diameter_of_binary_tree
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert diameter_of_binary_tree(root) == 4


def test_null_root():
    assert diameter_of_binary_tree(None) == 0


def test_single_node():
    assert diameter_of_binary_tree(make_node(1)) == 0


def test_two_node_tree():
    assert diameter_of_binary_tree(make_node(1, make_node(2))) == 1


def test_skewed_tree():
    root = make_node(1, make_node(2, make_node(3, make_node(4))))
    assert diameter_of_binary_tree(root) == 3


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_two_node_tree()
    test_skewed_tree()
    print("All tests passed!")
