import importlib

mod = importlib.import_module("is-balanced-tree-iterative")
is_balanced_tree_iterative = mod.is_balanced_tree_iterative
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert is_balanced_tree_iterative(root) is True


def test_null_root():
    assert is_balanced_tree_iterative(None) is True


def test_single_node():
    assert is_balanced_tree_iterative(make_node(1)) is True


def test_unbalanced_tree():
    root = make_node(1, make_node(2, make_node(3, make_node(4))))
    assert is_balanced_tree_iterative(root) is False


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_unbalanced_tree()
    print("All tests passed!")
