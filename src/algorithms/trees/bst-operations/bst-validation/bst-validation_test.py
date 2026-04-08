import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bst-validation")
BSTNode = module.BSTNode
bst_validation = module.bst_validation


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_validates_correct_bst():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert bst_validation(tree) == True


def test_rejects_invalid_bst():
    invalid = make_node(5, make_node(6), make_node(7))
    assert bst_validation(invalid) == False


def test_accepts_null():
    assert bst_validation(None) == True


def test_accepts_single_node():
    assert bst_validation(make_node(42)) == True


def test_rejects_non_local_violation():
    invalid = make_node(5, None, make_node(10, make_node(3), None))
    assert bst_validation(invalid) == False


if __name__ == "__main__":
    test_validates_correct_bst()
    test_rejects_invalid_bst()
    test_accepts_null()
    test_accepts_single_node()
    test_rejects_non_local_violation()
    print("All tests passed!")
