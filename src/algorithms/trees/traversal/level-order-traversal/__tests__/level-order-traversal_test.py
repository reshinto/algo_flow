import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("level-order-traversal")
level_order_traversal = mod.level_order_traversal
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert level_order_traversal(root) == [[4], [2, 6], [1, 3, 5, 7]]


def test_null_root():
    assert level_order_traversal(None) == []


def test_single_node():
    assert level_order_traversal(make_node(42)) == [[42]]


def test_left_skewed():
    root = make_node(5, make_node(4, make_node(3)))
    assert level_order_traversal(root) == [[5], [4], [3]]


def test_right_skewed():
    root = make_node(1, None, make_node(2, None, make_node(3)))
    assert level_order_traversal(root) == [[1], [2], [3]]


def test_left_child_only():
    assert level_order_traversal(make_node(5, make_node(3))) == [[5], [3]]


def test_right_child_only():
    assert level_order_traversal(make_node(5, None, make_node(8))) == [[5], [8]]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_left_skewed()
    test_right_skewed()
    test_left_child_only()
    test_right_child_only()
    print("All tests passed!")
