import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

number_of_good_pairs = importlib.import_module("number-of-good-pairs").number_of_good_pairs


def test_returns_4_for_default():
    assert number_of_good_pairs([1, 2, 3, 1, 1, 3]) == 4


def test_returns_6_for_all_ones():
    assert number_of_good_pairs([1, 1, 1, 1]) == 6


def test_returns_0_for_all_distinct():
    assert number_of_good_pairs([1, 2, 3]) == 0


def test_returns_1_for_1_1():
    assert number_of_good_pairs([1, 1]) == 1


def test_returns_0_for_single_element():
    assert number_of_good_pairs([5]) == 0


def test_returns_0_for_empty_array():
    assert number_of_good_pairs([]) == 0


def test_returns_3_for_2_2_2():
    assert number_of_good_pairs([2, 2, 2]) == 3


def test_handles_negative_numbers():
    assert number_of_good_pairs([-1, -1, 2]) == 1


if __name__ == "__main__":
    test_returns_4_for_default()
    test_returns_6_for_all_ones()
    test_returns_0_for_all_distinct()
    test_returns_1_for_1_1()
    test_returns_0_for_single_element()
    test_returns_0_for_empty_array()
    test_returns_3_for_2_2_2()
    test_handles_negative_numbers()
    print("All tests passed!")
