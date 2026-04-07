import importlib

mod = importlib.import_module("boundary-traversal")
boundary_traversal = mod.boundary_traversal
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert boundary_traversal(root) == [4, 2, 1, 3, 5, 7, 6]


def test_null_root():
    assert boundary_traversal(None) == []


def test_single_node():
    assert boundary_traversal(make_node(42)) == [42]


def test_only_right_child():
    root = make_node(5, None, make_node(8))
    assert boundary_traversal(root) == [5, 8]


def test_only_left_child():
    root = make_node(5, make_node(3))
    assert boundary_traversal(root) == [5, 3]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_only_right_child()
    test_only_left_child()
    print("All tests passed!")
