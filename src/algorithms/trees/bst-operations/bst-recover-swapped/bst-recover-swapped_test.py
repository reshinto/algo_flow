import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bst-recover-swapped")
BSTNode = module.BSTNode
bst_recover_swapped = module.bst_recover_swapped


def make_node(value, left=None, right=None):
    node = BSTNode(value)
    node.left = left
    node.right = right
    return node


def collect_inorder(root):
    if not root:
        return []
    return collect_inorder(root.left) + [root.value] + collect_inorder(root.right)


def test_recovers_non_adjacent_swapped_nodes():
    # Swap 3 and 7 in balanced tree
    invalid = make_node(4, make_node(2, make_node(1), make_node(7)), make_node(6, make_node(5), make_node(3)))
    bst_recover_swapped(invalid)
    assert collect_inorder(invalid) == [1, 2, 3, 4, 5, 6, 7]


def test_recovers_adjacent_swapped_nodes():
    # Swap 2 and 3 (adjacent in-order)
    tree = make_node(4, make_node(3, make_node(1), make_node(2)), make_node(6, make_node(5), make_node(7)))
    bst_recover_swapped(tree)
    assert collect_inorder(tree) == [1, 2, 3, 4, 5, 6, 7]


def test_does_not_modify_valid_bst():
    tree = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    bst_recover_swapped(tree)
    assert collect_inorder(tree) == [1, 2, 3, 4, 5, 6, 7]


if __name__ == "__main__":
    test_recovers_non_adjacent_swapped_nodes()
    test_recovers_adjacent_swapped_nodes()
    test_does_not_modify_valid_bst()
    print("All tests passed!")
