import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bst-delete")
BSTNode = module.BSTNode
bst_delete = module.bst_delete


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_deletes_leaf_node():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = bst_delete(tree, 1)
    assert result.left.left is None


def test_deletes_node_with_one_child():
    tree = make_node(4, make_node(2, make_node(1)), make_node(6))
    result = bst_delete(tree, 2)
    assert result.left.value == 1


def test_deletes_node_with_two_children():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = bst_delete(tree, 4)
    assert result is not None


def test_returns_none_for_single_node():
    result = bst_delete(make_node(5), 5)
    assert result is None


def test_unchanged_when_value_not_found():
    tree = make_node(4, make_node(2), make_node(6))
    result = bst_delete(tree, 99)
    assert result.value == 4


if __name__ == "__main__":
    test_deletes_leaf_node()
    test_deletes_node_with_one_child()
    test_deletes_node_with_two_children()
    test_returns_none_for_single_node()
    test_unchanged_when_value_not_found()
    print("All tests passed!")
