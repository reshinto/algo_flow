import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("bst-search-iterative")
BSTNode = module.BSTNode
bst_search_iterative = module.bst_search_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_finds_value():
    result = bst_search_iterative(tree, 6)
    assert result.value == 6


def test_returns_none_for_missing():
    assert bst_search_iterative(tree, 10) is None


def test_finds_root():
    result = bst_search_iterative(tree, 4)
    assert result.value == 4


def test_null_tree():
    assert bst_search_iterative(None, 5) is None


def test_finds_left_leaf():
    result = bst_search_iterative(tree, 1)
    assert result.value == 1


if __name__ == "__main__":
    test_finds_value()
    test_returns_none_for_missing()
    test_finds_root()
    test_null_tree()
    test_finds_left_leaf()
    print("All tests passed!")
