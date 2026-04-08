import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("is-symmetric-tree")
is_symmetric_tree = mod.is_symmetric_tree
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_non_symmetric_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert is_symmetric_tree(root) is False


def test_symmetric_tree():
    root = make_node(1, make_node(2, make_node(3), make_node(4)), make_node(2, make_node(4), make_node(3)))
    assert is_symmetric_tree(root) is True


def test_null_root():
    assert is_symmetric_tree(None) is True


def test_single_node():
    assert is_symmetric_tree(make_node(1)) is True


def test_asymmetric_tree():
    root = make_node(1, make_node(2, None, make_node(3)), make_node(2, None, make_node(3)))
    assert is_symmetric_tree(root) is False


if __name__ == "__main__":
    test_non_symmetric_bst()
    test_symmetric_tree()
    test_null_root()
    test_single_node()
    test_asymmetric_tree()
    print("All tests passed!")
