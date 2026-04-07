import importlib

mod = importlib.import_module("reverse-level-order")
reverse_level_order = mod.reverse_level_order
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert reverse_level_order(root) == [[1, 3, 5, 7], [2, 6], [4]]


def test_null_root():
    assert reverse_level_order(None) == []


def test_single_node():
    assert reverse_level_order(make_node(42)) == [[42]]


def test_left_skewed():
    root = make_node(5, make_node(4, make_node(3)))
    assert reverse_level_order(root) == [[3], [4], [5]]


def test_right_skewed():
    root = make_node(1, None, make_node(2, None, make_node(3)))
    assert reverse_level_order(root) == [[3], [2], [1]]


def test_two_node():
    assert reverse_level_order(make_node(5, make_node(3))) == [[3], [5]]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_left_skewed()
    test_right_skewed()
    test_two_node()
    print("All tests passed!")
