import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bst-iterator")
BSTNode = module.BSTNode
bst_iterator = module.bst_iterator


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_iterates_in_sorted_order():
    assert bst_iterator(tree) == [1, 2, 3, 4, 5, 6, 7]


def test_empty_for_null_tree():
    assert bst_iterator(None) == []


def test_single_element():
    assert bst_iterator(make_node(42)) == [42]


def test_right_skewed_tree():
    skewed = make_node(1, None, make_node(2, None, make_node(3)))
    assert bst_iterator(skewed) == [1, 2, 3]


if __name__ == "__main__":
    test_iterates_in_sorted_order()
    test_empty_for_null_tree()
    test_single_element()
    test_right_skewed_tree()
    print("All tests passed!")
