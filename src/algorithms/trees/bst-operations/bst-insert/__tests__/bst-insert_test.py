import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("bst-insert")
BSTNode = module.BSTNode
bst_insert = module.bst_insert


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_inserts_greater_than_all():
    fresh = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = bst_insert(fresh, 8)
    assert result.right.right.right.value == 8


def test_inserts_into_left_subtree():
    fresh = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = bst_insert(fresh, 0)
    assert result.left.left.left.value == 0


def test_creates_root_from_none():
    result = bst_insert(None, 10)
    assert result.value == 10


def test_ignores_duplicates():
    fresh = make_node(4, make_node(2), make_node(6))
    result = bst_insert(fresh, 4)
    assert result.value == 4


if __name__ == "__main__":
    test_inserts_greater_than_all()
    test_inserts_into_left_subtree()
    test_creates_root_from_none()
    test_ignores_duplicates()
    print("All tests passed!")
