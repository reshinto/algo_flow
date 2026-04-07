import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("binary-tree-tilt")
TreeNode = module.TreeNode
binary_tree_tilt = module.binary_tree_tilt


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_null_root_returns_zero():
    assert binary_tree_tilt(None) == 0


def test_single_node_returns_zero():
    assert binary_tree_tilt(make_node(1)) == 0


def test_simple_3_node_tree():
    # tilt at root = |2 - 3| = 1, leaves have tilt 0, total = 1
    assert binary_tree_tilt(make_node(1, make_node(2), make_node(3))) == 1


def test_non_negative_for_any_tree():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert binary_tree_tilt(root) >= 0


if __name__ == "__main__":
    test_null_root_returns_zero()
    test_single_node_returns_zero()
    test_simple_3_node_tree()
    test_non_negative_for_any_tree()
    print("All tests passed!")
