import importlib

mod = importlib.import_module("sum-of-left-leaves-iterative")
sum_of_left_leaves_iterative = mod.sum_of_left_leaves_iterative
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert sum_of_left_leaves_iterative(root) == 6


def test_null_root():
    assert sum_of_left_leaves_iterative(None) == 0


def test_single_node():
    assert sum_of_left_leaves_iterative(make_node(1)) == 0


def test_left_leaf():
    assert sum_of_left_leaves_iterative(make_node(1, make_node(5))) == 5


if __name__ == "__main__":
    test_7_node_bst()
    test_null_root()
    test_single_node()
    test_left_leaf()
    print("All tests passed!")
