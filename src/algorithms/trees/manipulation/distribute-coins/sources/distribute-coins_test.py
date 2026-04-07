import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("distribute-coins")
BinaryNode = module.BinaryNode
distribute_coins = module.distribute_coins


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def test_null_root_returns_zero():
    assert distribute_coins(None) == 0


def test_single_node_one_coin_returns_zero():
    assert distribute_coins(make_node(1)) == 0


def test_two_node_root_has_two_coins():
    root = make_node(2, make_node(0))
    assert distribute_coins(root) == 1


def test_root_three_coins_two_children_zero():
    root = make_node(3, make_node(0), make_node(0))
    assert distribute_coins(root) == 2


def test_all_coins_at_deep_leaf():
    root = make_node(0, make_node(0, make_node(3), None), make_node(0))
    assert distribute_coins(root) == 4


if __name__ == "__main__":
    test_null_root_returns_zero()
    test_single_node_one_coin_returns_zero()
    test_two_node_root_has_two_coins()
    test_root_three_coins_two_children_zero()
    test_all_coins_at_deep_leaf()
    print("All tests passed!")
