import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("bst-to-greater-tree-iterative")
BSTNode = module.BSTNode
bst_to_greater_tree_iterative = module.bst_to_greater_tree_iterative


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_transforms_3_node_bst():
    # Node 3->3, node 2->5, node 1->6
    tree = make_node(2, make_node(1), make_node(3))
    result = bst_to_greater_tree_iterative(tree)
    assert result.value == 5
    assert result.right.value == 3
    assert result.left.value == 6


def test_single_node():
    single = make_node(7)
    result = bst_to_greater_tree_iterative(single)
    assert result.value == 7


def test_null_tree():
    assert bst_to_greater_tree_iterative(None) is None


if __name__ == "__main__":
    test_transforms_3_node_bst()
    test_single_node()
    test_null_tree()
    print("All tests passed!")
