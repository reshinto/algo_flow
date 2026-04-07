import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("same-tree")
BinaryNode = module.BinaryNode
same_tree = module.same_tree


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def test_two_null_trees():
    assert same_tree(None, None) == True


def test_one_null_tree():
    assert same_tree(make_node(1), None) == False
    assert same_tree(None, make_node(1)) == False


def test_identical_single_nodes():
    assert same_tree(make_node(1), make_node(1)) == True


def test_different_single_nodes():
    assert same_tree(make_node(1), make_node(2)) == False


def test_identical_7_node_bsts():
    tree_a = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    tree_b = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert same_tree(tree_a, tree_b) == True


def test_different_leaf_values():
    tree_a = make_node(1, make_node(2), make_node(3))
    tree_b = make_node(1, make_node(2), make_node(4))
    assert same_tree(tree_a, tree_b) == False


def test_different_structures():
    tree_a = make_node(1, make_node(2))
    tree_b = make_node(1, None, make_node(2))
    assert same_tree(tree_a, tree_b) == False


if __name__ == "__main__":
    test_two_null_trees()
    test_one_null_tree()
    test_identical_single_nodes()
    test_different_single_nodes()
    test_identical_7_node_bsts()
    test_different_leaf_values()
    test_different_structures()
    print("All tests passed!")
