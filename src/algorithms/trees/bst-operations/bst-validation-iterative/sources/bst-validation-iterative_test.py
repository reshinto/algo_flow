import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bst-validation-iterative")
BSTNode = module.BSTNode
bst_validation_iterative = module.bst_validation_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_validates_correct_bst():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert bst_validation_iterative(tree) == True


def test_rejects_invalid_bst():
    invalid = make_node(5, make_node(6), make_node(7))
    assert bst_validation_iterative(invalid) == False


def test_accepts_null():
    assert bst_validation_iterative(None) == True


def test_accepts_single_node():
    assert bst_validation_iterative(make_node(10)) == True


if __name__ == "__main__":
    test_validates_correct_bst()
    test_rejects_invalid_bst()
    test_accepts_null()
    test_accepts_single_node()
    print("All tests passed!")
