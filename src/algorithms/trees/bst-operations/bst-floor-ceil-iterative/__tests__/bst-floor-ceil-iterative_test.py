import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("bst-floor-ceil-iterative")
BSTNode = module.BSTNode
bst_floor_ceil_iterative = module.bst_floor_ceil_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_exact_match():
    result = bst_floor_ceil_iterative(tree, 3)
    assert result["floor"] == 3
    assert result["ceil"] == 3


def test_exact_match_root():
    result = bst_floor_ceil_iterative(tree, 4)
    assert result["floor"] == 4
    assert result["ceil"] == 4


def test_null_floor_below_all():
    result = bst_floor_ceil_iterative(tree, 0)
    assert result["floor"] is None
    assert result["ceil"] == 1


def test_null_tree():
    result = bst_floor_ceil_iterative(None, 5)
    assert result["floor"] is None
    assert result["ceil"] is None


if __name__ == "__main__":
    test_exact_match()
    test_exact_match_root()
    test_null_floor_below_all()
    test_null_tree()
    print("All tests passed!")
