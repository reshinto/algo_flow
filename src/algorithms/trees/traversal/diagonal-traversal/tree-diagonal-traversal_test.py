import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("tree-diagonal-traversal")
diagonal_traversal = mod.diagonal_traversal
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert diagonal_traversal(root) == [[4, 6, 7], [2, 5, 3], [1]]


def test_null_root():
    assert diagonal_traversal(None) == []


def test_single_node():
    assert diagonal_traversal(make_node(42)) == [[42]]


def test_right_skewed():
    root = make_node(1, None, make_node(2, None, make_node(3)))
    assert diagonal_traversal(root) == [[1, 2, 3]]


def test_left_skewed():
    root = make_node(3, make_node(2, make_node(1)))
    assert diagonal_traversal(root) == [[3], [2], [1]]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_right_skewed()
    test_left_skewed()
    print("All tests passed!")
