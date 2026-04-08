import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bst-floor-ceil")
BSTNode = module.BSTNode
bst_floor_ceil = module.bst_floor_ceil


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


# Tree: 4(2(1,3), 6(5,7))
tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))


def test_exact_match():
    result = bst_floor_ceil(tree, 5)
    assert result["floor"] == 5
    assert result["ceil"] == 5


def test_exact_match_root():
    result = bst_floor_ceil(tree, 4)
    assert result["floor"] == 4
    assert result["ceil"] == 4


def test_null_floor_for_value_below_all():
    result = bst_floor_ceil(tree, 0)
    assert result["floor"] is None
    assert result["ceil"] == 1


def test_null_ceil_for_value_above_all():
    result = bst_floor_ceil(tree, 8)
    assert result["floor"] == 7
    assert result["ceil"] is None


def test_null_tree():
    result = bst_floor_ceil(None, 5)
    assert result["floor"] is None
    assert result["ceil"] is None


if __name__ == "__main__":
    test_exact_match()
    test_exact_match_root()
    test_null_floor_for_value_below_all()
    test_null_ceil_for_value_above_all()
    test_null_tree()
    print("All tests passed!")
