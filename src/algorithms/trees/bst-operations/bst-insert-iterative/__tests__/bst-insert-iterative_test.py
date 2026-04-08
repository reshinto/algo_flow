import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("bst-insert-iterative")
BSTNode = module.BSTNode
bst_insert_iterative = module.bst_insert_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_inserts_greater_than_all():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = bst_insert_iterative(tree, 8)
    assert result.right.right.right.value == 8


def test_creates_root_from_none():
    result = bst_insert_iterative(None, 5)
    assert result.value == 5


def test_inserts_left_child():
    fresh = make_node(10)
    result = bst_insert_iterative(fresh, 5)
    assert result.left.value == 5


def test_ignores_duplicates():
    tree = make_node(4, make_node(2), make_node(6))
    result = bst_insert_iterative(tree, 2)
    assert result.left.right is None


if __name__ == "__main__":
    test_inserts_greater_than_all()
    test_creates_root_from_none()
    test_inserts_left_child()
    test_ignores_duplicates()
    print("All tests passed!")
