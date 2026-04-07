import importlib

mod = importlib.import_module("morris-inorder-traversal")
morris_inorder_traversal = mod.morris_inorder_traversal
BSTNode = mod.BSTNode


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert morris_inorder_traversal(root) == [1, 2, 3, 4, 5, 6, 7]


def test_null_root():
    assert morris_inorder_traversal(None) == []


def test_single_node():
    assert morris_inorder_traversal(make_node(42)) == [42]


def test_left_skewed():
    root = make_node(5, make_node(4, make_node(3, make_node(2, make_node(1)))))
    assert morris_inorder_traversal(root) == [1, 2, 3, 4, 5]


def test_right_skewed():
    root = make_node(1, None, make_node(2, None, make_node(3, None, make_node(4, None, make_node(5)))))
    assert morris_inorder_traversal(root) == [1, 2, 3, 4, 5]


def test_left_child_only():
    assert morris_inorder_traversal(make_node(5, make_node(3))) == [3, 5]


def test_right_child_only():
    assert morris_inorder_traversal(make_node(5, None, make_node(8))) == [5, 8]


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_left_skewed()
    test_right_skewed()
    test_left_child_only()
    test_right_child_only()
    print("All tests passed!")
