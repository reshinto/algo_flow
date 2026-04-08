import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

majority_element = importlib.import_module("majority-element").majority_element


def test_returns_2_for_default():
    assert majority_element([2, 2, 1, 1, 1, 2, 2]) == 2


def test_returns_3_for_3_2_3():
    assert majority_element([3, 2, 3]) == 3


def test_returns_single_element():
    assert majority_element([1]) == 1


def test_returns_1_for_all_ones():
    assert majority_element([1, 1, 1, 1]) == 1


def test_returns_5_for_5_5_5_1_2():
    assert majority_element([5, 5, 5, 1, 2]) == 5


def test_returns_1_for_1_2_1_1_3():
    assert majority_element([1, 2, 1, 1, 3]) == 1


def test_returns_7_for_7_7():
    assert majority_element([7, 7]) == 7


def test_returns_correct_majority_for_large_repeated_prefix():
    assert majority_element([9, 9, 9, 9, 1, 2, 3]) == 9


if __name__ == "__main__":
    test_returns_2_for_default()
    test_returns_3_for_3_2_3()
    test_returns_single_element()
    test_returns_1_for_all_ones()
    test_returns_5_for_5_5_5_1_2()
    test_returns_1_for_1_2_1_1_3()
    test_returns_7_for_7_7()
    test_returns_correct_majority_for_large_repeated_prefix()
    print("All tests passed!")
