import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("move-zeros")
move_zeros = module.move_zeros


def test_moves_zeros_to_end():
    result = move_zeros([0, 1, 0, 3, 12])
    assert result == [1, 3, 12, 0, 0]


def test_no_zeros():
    result = move_zeros([1, 2, 3, 4, 5])
    assert result == [1, 2, 3, 4, 5]


def test_all_zeros():
    result = move_zeros([0, 0, 0])
    assert result == [0, 0, 0]


def test_single_zero():
    result = move_zeros([0])
    assert result == [0]


def test_single_non_zero():
    result = move_zeros([7])
    assert result == [7]


def test_empty_array():
    result = move_zeros([])
    assert result == []


def test_zeros_at_start():
    result = move_zeros([0, 0, 1, 2])
    assert result == [1, 2, 0, 0]


def test_zeros_already_at_end():
    result = move_zeros([1, 2, 3, 0, 0])
    assert result == [1, 2, 3, 0, 0]


def test_default_input():
    result = move_zeros([0, 1, 0, 3, 12, 0, 5])
    assert result == [1, 3, 12, 5, 0, 0, 0]


def test_does_not_mutate_original():
    original = [0, 1, 0, 3, 12]
    move_zeros(original)
    assert original == [0, 1, 0, 3, 12]


if __name__ == "__main__":
    test_moves_zeros_to_end()
    test_no_zeros()
    test_all_zeros()
    test_single_zero()
    test_single_non_zero()
    test_empty_array()
    test_zeros_at_start()
    test_zeros_already_at_end()
    test_default_input()
    test_does_not_mutate_original()
    print("All tests passed!")
