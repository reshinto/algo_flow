import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("dutch-national-flag")
dutch_national_flag = module.dutch_national_flag


def test_mixed_array():
    result = dutch_national_flag([2, 0, 1, 2, 1, 0])
    assert result == [0, 0, 1, 1, 2, 2]


def test_already_sorted():
    result = dutch_national_flag([0, 0, 1, 1, 2, 2])
    assert result == [0, 0, 1, 1, 2, 2]


def test_reverse_sorted():
    result = dutch_national_flag([2, 2, 1, 1, 0, 0])
    assert result == [0, 0, 1, 1, 2, 2]


def test_all_zeros():
    result = dutch_national_flag([0, 0, 0])
    assert result == [0, 0, 0]


def test_all_ones():
    result = dutch_national_flag([1, 1, 1])
    assert result == [1, 1, 1]


def test_all_twos():
    result = dutch_national_flag([2, 2, 2])
    assert result == [2, 2, 2]


def test_single_zero():
    result = dutch_national_flag([0])
    assert result == [0]


def test_empty_array():
    result = dutch_national_flag([])
    assert result == []


def test_default_input():
    result = dutch_national_flag([2, 0, 1, 2, 1, 0, 0, 2, 1])
    assert result == [0, 0, 0, 1, 1, 1, 2, 2, 2]


def test_does_not_mutate_original():
    original = [2, 0, 1]
    dutch_national_flag(original)
    assert original == [2, 0, 1]


if __name__ == "__main__":
    test_mixed_array()
    test_already_sorted()
    test_reverse_sorted()
    test_all_zeros()
    test_all_ones()
    test_all_twos()
    test_single_zero()
    test_empty_array()
    test_default_input()
    test_does_not_mutate_original()
    print("All tests passed!")
