import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("right-side-view-recursive")
BinaryNode = module.BinaryNode
right_side_view_recursive = module.right_side_view_recursive


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def test_null_returns_empty():
    assert right_side_view_recursive(None) == []


def test_single_node():
    assert right_side_view_recursive(make_node(1)) == [1]


def test_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert right_side_view_recursive(root) == [4, 6, 7]


def test_left_skewed_tree():
    root = make_node(1, make_node(2, make_node(3)))
    assert right_side_view_recursive(root) == [1, 2, 3]


def test_right_skewed_tree():
    root = make_node(1, None, make_node(2, None, make_node(3)))
    assert right_side_view_recursive(root) == [1, 2, 3]


if __name__ == "__main__":
    test_null_returns_empty()
    test_single_node()
    test_7_node_bst()
    test_left_skewed_tree()
    test_right_skewed_tree()
    print("All tests passed!")
