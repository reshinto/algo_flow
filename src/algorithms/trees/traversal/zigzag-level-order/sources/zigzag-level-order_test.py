import importlib

mod = importlib.import_module("zigzag-level-order")
zigzag_level_order = mod.zigzag_level_order
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert zigzag_level_order(root) == [[4], [6, 2], [1, 3, 5, 7]]


def test_null_root():
    assert zigzag_level_order(None) == []


def test_single_node():
    assert zigzag_level_order(make_node(42)) == [[42]]


def test_two_level_with_both_children():
    root = make_node(1, make_node(2), make_node(3))
    assert zigzag_level_order(root) == [[1], [3, 2]]


def test_left_skewed():
    root = make_node(3, make_node(2, make_node(1)))
    assert zigzag_level_order(root) == [[3], [2], [1]]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_two_level_with_both_children()
    test_left_skewed()
    print("All tests passed!")
