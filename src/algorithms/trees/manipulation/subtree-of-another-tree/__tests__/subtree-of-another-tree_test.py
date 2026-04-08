import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("subtree-of-another-tree")
BinaryNode = module.BinaryNode
subtree_of_another_tree = module.subtree_of_another_tree


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def test_null_subtree_returns_true():
    assert subtree_of_another_tree(make_node(1), None) == True


def test_null_main_tree_returns_false():
    assert subtree_of_another_tree(None, make_node(1)) == False


def test_trees_are_equal():
    main_tree = make_node(1, make_node(2), make_node(3))
    sub_tree = make_node(1, make_node(2), make_node(3))
    assert subtree_of_another_tree(main_tree, sub_tree) == True


def test_subtree_is_left_subtree():
    main_tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    sub_tree = make_node(2, make_node(1), make_node(3))
    assert subtree_of_another_tree(main_tree, sub_tree) == True


def test_subtree_not_in_main_tree():
    main_tree = make_node(4, make_node(2), make_node(6))
    sub_tree = make_node(9)
    assert subtree_of_another_tree(main_tree, sub_tree) == False


def test_value_matches_but_structure_differs():
    main_tree = make_node(4, make_node(2, make_node(1)), None)
    sub_tree = make_node(2, None, make_node(1))
    assert subtree_of_another_tree(main_tree, sub_tree) == False


if __name__ == "__main__":
    test_null_subtree_returns_true()
    test_null_main_tree_returns_false()
    test_trees_are_equal()
    test_subtree_is_left_subtree()
    test_subtree_not_in_main_tree()
    test_value_matches_but_structure_differs()
    print("All tests passed!")
