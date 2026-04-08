import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

sort_nearly_sorted = importlib.import_module("sort-nearly-sorted").sort_nearly_sorted


def test_default_k3():
    assert sort_nearly_sorted([6, 5, 3, 2, 8, 10, 9], 3) == [2, 3, 5, 6, 8, 9, 10]


def test_k0():
    assert sort_nearly_sorted([1, 2, 3, 4, 5], 0) == [1, 2, 3, 4, 5]


def test_k1():
    assert sort_nearly_sorted([2, 1, 4, 3, 6, 5], 1) == [1, 2, 3, 4, 5, 6]


def test_single_element():
    assert sort_nearly_sorted([42], 0) == [42]


def test_two_elements():
    assert sort_nearly_sorted([2, 1], 1) == [1, 2]


def test_k_equals_length_minus_1():
    assert sort_nearly_sorted([5, 4, 3, 2, 1], 4) == [1, 2, 3, 4, 5]


def test_duplicates():
    assert sort_nearly_sorted([3, 3, 1, 1, 2], 2) == [1, 1, 2, 3, 3]


def test_fully_sorted():
    result = sort_nearly_sorted([6, 5, 3, 2, 8, 10, 9], 3)
    for idx in range(1, len(result)):
        assert result[idx] >= result[idx - 1]


if __name__ == "__main__":
    test_default_k3()
    test_k0()
    test_k1()
    test_single_element()
    test_two_elements()
    test_k_equals_length_minus_1()
    test_duplicates()
    test_fully_sorted()
    print("All tests passed!")
