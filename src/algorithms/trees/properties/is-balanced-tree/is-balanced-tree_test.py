import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("is-balanced-tree")
is_balanced_tree = mod.is_balanced_tree
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert is_balanced_tree(root) is True


def test_null_root():
    assert is_balanced_tree(None) is True


def test_single_node():
    assert is_balanced_tree(make_node(1)) is True


def test_unbalanced_tree():
    root = make_node(1, make_node(2, make_node(3, make_node(4))))
    assert is_balanced_tree(root) is False


def test_two_node_tree():
    assert is_balanced_tree(make_node(1, make_node(2))) is True


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_unbalanced_tree()
    test_two_node_tree()
    print("All tests passed!")
