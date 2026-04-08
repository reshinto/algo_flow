import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

missing_number = importlib.import_module("missing-number").missing_number


def test_returns_2_for_3_0_1():
    assert missing_number([3, 0, 1]) == 2


def test_returns_2_for_0_1():
    assert missing_number([0, 1]) == 2


def test_returns_8_for_large_array():
    assert missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1]) == 8


def test_returns_0_for_1():
    assert missing_number([1]) == 0


def test_returns_1_for_0():
    assert missing_number([0]) == 1


def test_returns_0_for_empty_array():
    assert missing_number([]) == 0


def test_returns_3_for_0_1_2():
    assert missing_number([0, 1, 2]) == 3


def test_returns_5_for_0_1_2_3_4_6():
    assert missing_number([0, 1, 2, 3, 4, 6]) == 5


if __name__ == "__main__":
    test_returns_2_for_3_0_1()
    test_returns_2_for_0_1()
    test_returns_8_for_large_array()
    test_returns_0_for_1()
    test_returns_1_for_0()
    test_returns_0_for_empty_array()
    test_returns_3_for_0_1_2()
    test_returns_5_for_0_1_2_3_4_6()
    print("All tests passed!")
