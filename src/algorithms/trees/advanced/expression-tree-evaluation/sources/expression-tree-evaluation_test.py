import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("expression-tree-evaluation")
expression_tree_evaluation = module.expression_tree_evaluation


def test_default_expression():
    assert expression_tree_evaluation("3 4 + 2 * 7 /") == 2


def test_simple_addition():
    assert expression_tree_evaluation("3 4 +") == 7


def test_simple_multiplication():
    assert expression_tree_evaluation("5 6 *") == 30


def test_subtraction():
    assert expression_tree_evaluation("10 4 -") == 6


def test_integer_division():
    assert expression_tree_evaluation("7 2 /") == 3


def test_nested_expression():
    # (2*3) + (4*5) = 6 + 20 = 26
    assert expression_tree_evaluation("2 3 * 4 5 * +") == 26


def test_single_number():
    assert expression_tree_evaluation("42") == 42


if __name__ == "__main__":
    test_default_expression()
    test_simple_addition()
    test_simple_multiplication()
    test_subtraction()
    test_integer_division()
    test_nested_expression()
    test_single_number()
    print("All tests passed!")
