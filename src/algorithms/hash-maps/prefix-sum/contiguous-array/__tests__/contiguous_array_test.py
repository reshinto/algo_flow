import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

contiguous_array = importlib.import_module("contiguous-array").contiguous_array


def test_returns_6_for_default():
    assert contiguous_array([0, 1, 0, 1, 1, 0]) == 6


def test_returns_2_for_0_1():
    assert contiguous_array([0, 1]) == 2


def test_returns_2_for_0_1_0():
    assert contiguous_array([0, 1, 0]) == 2


def test_returns_0_for_all_zeros():
    assert contiguous_array([0, 0, 0]) == 0


def test_returns_0_for_all_ones():
    assert contiguous_array([1, 1, 1]) == 0


def test_returns_0_for_empty():
    assert contiguous_array([]) == 0


def test_returns_4_for_0_0_1_1():
    assert contiguous_array([0, 0, 1, 1]) == 4


def test_returns_4_for_1_0_1_0_1():
    assert contiguous_array([1, 0, 1, 0, 1]) == 4


if __name__ == "__main__":
    test_returns_6_for_default()
    test_returns_2_for_0_1()
    test_returns_2_for_0_1_0()
    test_returns_0_for_all_zeros()
    test_returns_0_for_all_ones()
    test_returns_0_for_empty()
    test_returns_4_for_0_0_1_1()
    test_returns_4_for_1_0_1_0_1()
    print("All tests passed!")
