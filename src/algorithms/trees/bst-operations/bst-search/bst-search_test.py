import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bst-search")
BSTNode = module.BSTNode
bst_search = module.bst_search


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_finds_existing_value():
    result = bst_search(tree, 5)
    assert result.value == 5


def test_returns_none_for_missing():
    assert bst_search(tree, 9) is None


def test_finds_root():
    result = bst_search(tree, 4)
    assert result.value == 4


def test_finds_leaf():
    result = bst_search(tree, 1)
    assert result.value == 1


def test_null_tree():
    assert bst_search(None, 5) is None


def test_single_node_tree():
    result = bst_search(make_node(42), 42)
    assert result.value == 42


if __name__ == "__main__":
    test_finds_existing_value()
    test_returns_none_for_missing()
    test_finds_root()
    test_finds_leaf()
    test_null_tree()
    test_single_node_tree()
    print("All tests passed!")
