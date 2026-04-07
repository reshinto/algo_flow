import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bst-delete-iterative")
BSTNode = module.BSTNode
bst_delete_iterative = module.bst_delete_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_deletes_leaf_node():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = bst_delete_iterative(tree, 7)
    assert result.right.right is None


def test_deletes_node_with_two_children():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = bst_delete_iterative(tree, 6)
    assert result.right.value == 7


def test_returns_none_for_only_node():
    assert bst_delete_iterative(make_node(5), 5) is None


def test_unchanged_when_absent():
    tree = make_node(4, make_node(2), make_node(6))
    result = bst_delete_iterative(tree, 99)
    assert result.value == 4


if __name__ == "__main__":
    test_deletes_leaf_node()
    test_deletes_node_with_two_children()
    test_returns_none_for_only_node()
    test_unchanged_when_absent()
    print("All tests passed!")
