import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("rotate-array-cyclic")
rotate_array_cyclic = module.rotate_array_cyclic


def test_rotate_by_two():
    assert rotate_array_cyclic([1, 2, 3, 4, 5, 6], 2) == [5, 6, 1, 2, 3, 4]


def test_rotate_by_one():
    assert rotate_array_cyclic([1, 2, 3, 4, 5], 1) == [5, 1, 2, 3, 4]


def test_rotate_by_length():
    assert rotate_array_cyclic([1, 2, 3, 4], 4) == [1, 2, 3, 4]


def test_rotate_larger_than_length():
    assert rotate_array_cyclic([1, 2, 3, 4, 5, 6], 8) == [5, 6, 1, 2, 3, 4]


def test_rotate_by_zero():
    assert rotate_array_cyclic([1, 2, 3, 4], 0) == [1, 2, 3, 4]


def test_empty_array():
    assert rotate_array_cyclic([], 3) == []


def test_single_element():
    assert rotate_array_cyclic([42], 5) == [42]


def test_two_elements():
    assert rotate_array_cyclic([1, 2], 1) == [2, 1]


def test_does_not_mutate():
    original = [1, 2, 3, 4, 5]
    rotate_array_cyclic(original, 2)
    assert original == [1, 2, 3, 4, 5]


def test_single_long_cycle():
    assert rotate_array_cyclic([1, 2, 3, 4, 5, 6], 1) == [6, 1, 2, 3, 4, 5]


if __name__ == "__main__":
    test_rotate_by_two()
    test_rotate_by_one()
    test_rotate_by_length()
    test_rotate_larger_than_length()
    test_rotate_by_zero()
    test_empty_array()
    test_single_element()
    test_two_elements()
    test_does_not_mutate()
    test_single_long_cycle()
    print("All tests passed!")
