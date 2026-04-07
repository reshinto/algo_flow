import importlib

mod = importlib.import_module("path-sum-iterative")
path_sum_iterative = mod.path_sum_iterative
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_path_sum_exists():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert path_sum_iterative(root, 7) is True


def test_path_sum_not_exists():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert path_sum_iterative(root, 100) is False


def test_null_root():
    assert path_sum_iterative(None, 5) is False


def test_single_node_matching():
    assert path_sum_iterative(make_node(5), 5) is True


if __name__ == "__main__":
    test_path_sum_exists()
    test_path_sum_not_exists()
    test_null_root()
    test_single_node_matching()
    print("All tests passed!")
