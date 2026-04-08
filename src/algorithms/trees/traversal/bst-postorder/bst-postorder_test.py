import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("bst-postorder")
bst_postorder = mod.bst_postorder
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert bst_postorder(root) == [1, 3, 2, 5, 7, 6, 4]


def test_null_root():
    assert bst_postorder(None) == []


def test_single_node():
    assert bst_postorder(make_node(42)) == [42]


def test_left_skewed():
    root = make_node(5, make_node(4, make_node(3, make_node(2, make_node(1)))))
    assert bst_postorder(root) == [1, 2, 3, 4, 5]


def test_right_skewed():
    root = make_node(1, None, make_node(2, None, make_node(3, None, make_node(4, None, make_node(5)))))
    assert bst_postorder(root) == [5, 4, 3, 2, 1]


def test_left_child_only():
    assert bst_postorder(make_node(5, make_node(3))) == [3, 5]


def test_right_child_only():
    assert bst_postorder(make_node(5, None, make_node(8))) == [8, 5]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_left_skewed()
    test_right_skewed()
    test_left_child_only()
    test_right_child_only()
    print("All tests passed!")
