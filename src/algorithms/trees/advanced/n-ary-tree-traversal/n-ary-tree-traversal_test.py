import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("n-ary-tree-traversal")
NAryNode = module.NAryNode
n_ary_tree_traversal = module.n_ary_tree_traversal


def make_node(value, *children):
    node = NAryNode(value)
    node.children = list(children)
    return node


def test_returns_empty_for_null_root():
    assert n_ary_tree_traversal(None) == []


def test_handles_single_node():
    assert n_ary_tree_traversal(make_node(5)) == [5]


def test_root_before_children():
    root = make_node(
        1,
        make_node(3, make_node(5), make_node(6)),
        make_node(2, make_node(7), make_node(8)),
        make_node(4, make_node(9), make_node(10)),
    )
    result = n_ary_tree_traversal(root)
    assert result[0] == 1
    assert result[1] == 3
    assert len(result) == 10


def test_correct_preorder_3_level():
    root = make_node(
        1,
        make_node(3, make_node(5), make_node(6)),
        make_node(2, make_node(7), make_node(8)),
        make_node(4, make_node(9), make_node(10)),
    )
    assert n_ary_tree_traversal(root) == [1, 3, 5, 6, 2, 7, 8, 4, 9, 10]


def test_handles_flat_tree():
    assert n_ary_tree_traversal(make_node(42)) == [42]


if __name__ == "__main__":
    test_returns_empty_for_null_root()
    test_handles_single_node()
    test_root_before_children()
    test_correct_preorder_3_level()
    test_handles_flat_tree()
    print("All tests passed!")
