import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("cousins-in-binary-tree")
TreeNode = module.TreeNode
cousins_in_binary_tree = module.cousins_in_binary_tree


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def build_7_node_tree():
    return make_node(4,
        make_node(2, make_node(1), make_node(3)),
        make_node(6, make_node(5), make_node(7)))


def test_cousins_1_and_5():
    assert cousins_in_binary_tree(build_7_node_tree(), 1, 5) == True


def test_siblings_not_cousins():
    # 1 and 3 are siblings
    assert cousins_in_binary_tree(build_7_node_tree(), 1, 3) == False


def test_different_depths_not_cousins():
    # 2 is at depth 1, 1 is at depth 2
    assert cousins_in_binary_tree(build_7_node_tree(), 2, 1) == False


def test_null_root_returns_false():
    assert cousins_in_binary_tree(None, 1, 2) == False


def test_cousins_3_and_7():
    assert cousins_in_binary_tree(build_7_node_tree(), 3, 7) == True


if __name__ == "__main__":
    test_cousins_1_and_5()
    test_siblings_not_cousins()
    test_different_depths_not_cousins()
    test_null_root_returns_false()
    test_cousins_3_and_7()
    print("All tests passed!")
