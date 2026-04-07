import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bst-lowest-common-ancestor-iterative")
BSTNode = module.BSTNode
bst_lowest_common_ancestor_iterative = module.bst_lowest_common_ancestor_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_lca_1_and_3():
    result = bst_lowest_common_ancestor_iterative(tree, 1, 3)
    assert result.value == 2


def test_lca_5_and_7():
    result = bst_lowest_common_ancestor_iterative(tree, 5, 7)
    assert result.value == 6


def test_lca_1_and_7():
    result = bst_lowest_common_ancestor_iterative(tree, 1, 7)
    assert result.value == 4


if __name__ == "__main__":
    test_lca_1_and_3()
    test_lca_5_and_7()
    test_lca_1_and_7()
    print("All tests passed!")
