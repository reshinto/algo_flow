import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("maximum-depth")
maximum_depth = mod.maximum_depth
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert maximum_depth(root) == 3


def test_null_root():
    assert maximum_depth(None) == 0


def test_single_node():
    assert maximum_depth(make_node(42)) == 1


def test_left_skewed_tree():
    root = make_node(5, make_node(4, make_node(3, make_node(2, make_node(1)))))
    assert maximum_depth(root) == 5


def test_right_skewed_tree():
    root = make_node(1, None, make_node(2, None, make_node(3)))
    assert maximum_depth(root) == 3


def test_two_level_tree():
    assert maximum_depth(make_node(1, make_node(2))) == 2


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_left_skewed_tree()
    test_right_skewed_tree()
    test_two_level_tree()
    print("All tests passed!")
