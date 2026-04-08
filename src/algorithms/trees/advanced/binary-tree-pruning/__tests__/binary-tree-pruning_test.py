import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("binary-tree-pruning")
BinaryNode = module.BinaryNode
binary_tree_pruning = module.binary_tree_pruning


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def test_returns_none_for_all_zeros():
    root = make_node(0, make_node(0), make_node(0))
    assert binary_tree_pruning(root) is None


def test_returns_none_for_single_zero():
    assert binary_tree_pruning(make_node(0)) is None


def test_keeps_single_one_node():
    result = binary_tree_pruning(make_node(1))
    assert result is not None
    assert result.value == 1


def test_prunes_zero_only_subtrees():
    # Root 1 with left all zeros and right has some 1s
    root = make_node(
        1,
        make_node(0, make_node(0), make_node(0)),
        make_node(1, make_node(0), make_node(1)),
    )
    pruned = binary_tree_pruning(root)
    assert pruned is not None
    assert pruned.left is None
    assert pruned.right is not None
    assert pruned.right.right.value == 1
    assert pruned.right.left is None


def test_returns_none_for_none_input():
    assert binary_tree_pruning(None) is None


if __name__ == "__main__":
    test_returns_none_for_all_zeros()
    test_returns_none_for_single_zero()
    test_keeps_single_one_node()
    test_prunes_zero_only_subtrees()
    test_returns_none_for_none_input()
    print("All tests passed!")
