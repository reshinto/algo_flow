import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bst-kth-smallest-iterative")
BSTNode = module.BSTNode
bst_kth_smallest_iterative = module.bst_kth_smallest_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_first_smallest():
    assert bst_kth_smallest_iterative(tree, 1) == 1


def test_second_smallest():
    assert bst_kth_smallest_iterative(tree, 2) == 2


def test_seventh_smallest():
    assert bst_kth_smallest_iterative(tree, 7) == 7


def test_out_of_range():
    assert bst_kth_smallest_iterative(tree, 99) == -1


if __name__ == "__main__":
    test_first_smallest()
    test_second_smallest()
    test_seventh_smallest()
    test_out_of_range()
    print("All tests passed!")
