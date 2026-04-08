import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("vertical-order-traversal")
vertical_order_traversal = mod.vertical_order_traversal
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert vertical_order_traversal(root) == [[1], [2], [4, 3, 5], [6], [7]]


def test_null_root():
    assert vertical_order_traversal(None) == []


def test_single_node():
    assert vertical_order_traversal(make_node(42)) == [[42]]


def test_right_skewed():
    root = make_node(1, None, make_node(2, None, make_node(3)))
    assert vertical_order_traversal(root) == [[1], [2], [3]]


def test_left_child():
    assert vertical_order_traversal(make_node(5, make_node(3))) == [[3], [5]]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_right_skewed()
    test_left_child()
    print("All tests passed!")
