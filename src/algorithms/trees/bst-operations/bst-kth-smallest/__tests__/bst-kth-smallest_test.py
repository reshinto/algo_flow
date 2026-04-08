import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("bst-kth-smallest")
BSTNode = module.BSTNode
bst_kth_smallest = module.bst_kth_smallest


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_first_smallest():
    assert bst_kth_smallest(tree, 1) == 1


def test_third_smallest():
    assert bst_kth_smallest(tree, 3) == 3


def test_seventh_smallest():
    assert bst_kth_smallest(tree, 7) == 7


def test_fourth_smallest():
    assert bst_kth_smallest(tree, 4) == 4


def test_out_of_range():
    assert bst_kth_smallest(tree, 10) == -1


if __name__ == "__main__":
    test_first_smallest()
    test_third_smallest()
    test_seventh_smallest()
    test_fourth_smallest()
    test_out_of_range()
    print("All tests passed!")
