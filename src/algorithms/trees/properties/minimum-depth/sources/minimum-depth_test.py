import importlib

mod = importlib.import_module("minimum-depth")
minimum_depth = mod.minimum_depth
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert minimum_depth(root) == 3


def test_null_root():
    assert minimum_depth(None) == 0


def test_single_node():
    assert minimum_depth(make_node(42)) == 1


def test_single_child_not_leaf():
    root = make_node(1, None, make_node(2, None, make_node(3)))
    assert minimum_depth(root) == 3


def test_two_level_tree():
    assert minimum_depth(make_node(1, make_node(2))) == 2


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_null_root()
    test_single_node()
    test_single_child_not_leaf()
    test_two_level_tree()
    print("All tests passed!")
