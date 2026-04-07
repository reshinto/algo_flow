import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("flip-equivalent-trees")
BinaryNode = module.BinaryNode
flip_equivalent_trees = module.flip_equivalent_trees


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def test_two_null_trees():
    assert flip_equivalent_trees(None, None) == True


def test_one_null_tree():
    assert flip_equivalent_trees(make_node(1), None) == False
    assert flip_equivalent_trees(None, make_node(1)) == False


def test_identical_trees():
    tree_a = make_node(1, make_node(2), make_node(3))
    tree_b = make_node(1, make_node(2), make_node(3))
    assert flip_equivalent_trees(tree_a, tree_b) == True


def test_flipped_at_root():
    tree_a = make_node(1, make_node(2), make_node(3))
    tree_b = make_node(1, make_node(3), make_node(2))
    assert flip_equivalent_trees(tree_a, tree_b) == True


def test_flipped_7_node_bst():
    tree_a = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    tree_b = make_node(4, make_node(6, make_node(5), make_node(7)), make_node(2, make_node(1), make_node(3)))
    assert flip_equivalent_trees(tree_a, tree_b) == True


def test_different_root_values():
    assert flip_equivalent_trees(make_node(1), make_node(2)) == False


def test_different_leaf_values():
    tree_a = make_node(1, make_node(2), make_node(3))
    tree_b = make_node(1, make_node(9), make_node(3))
    assert flip_equivalent_trees(tree_a, tree_b) == False


if __name__ == "__main__":
    test_two_null_trees()
    test_one_null_tree()
    test_identical_trees()
    test_flipped_at_root()
    test_flipped_7_node_bst()
    test_different_root_values()
    test_different_leaf_values()
    print("All tests passed!")
