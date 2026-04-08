import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("lowest-common-ancestor")
BinaryNode = module.BinaryNode
lowest_common_ancestor = module.lowest_common_ancestor


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def build_7_node_tree():
    return make_node(4,
        make_node(2, make_node(1), make_node(3)),
        make_node(6, make_node(5), make_node(7)))


def test_null_root_returns_none():
    assert lowest_common_ancestor(None, 1, 2) is None


def test_root_matches_one_target():
    root = make_node(4, make_node(2), make_node(6))
    result = lowest_common_ancestor(root, 4, 6)
    assert result.value == 4


def test_lca_is_node_2_for_targets_1_and_3():
    result = lowest_common_ancestor(build_7_node_tree(), 1, 3)
    assert result.value == 2


def test_lca_is_root_for_opposite_subtrees():
    result = lowest_common_ancestor(build_7_node_tree(), 3, 5)
    assert result.value == 4


def test_ancestor_of_other():
    root = make_node(4, make_node(2, make_node(1)))
    result = lowest_common_ancestor(root, 2, 1)
    assert result.value == 2


if __name__ == "__main__":
    test_null_root_returns_none()
    test_root_matches_one_target()
    test_lca_is_node_2_for_targets_1_and_3()
    test_lca_is_root_for_opposite_subtrees()
    test_ancestor_of_other()
    print("All tests passed!")
