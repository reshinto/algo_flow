import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

two_sum = importlib.import_module("two-sum").two_sum


def test_finds_pair_summing_to_target_in_default():
    assert two_sum([2, 7, 11, 15], 9) == [0, 1]


def test_finds_pair_at_end_of_array():
    assert two_sum([3, 2, 4], 6) == [1, 2]


def test_finds_pair_using_same_index_once():
    assert two_sum([3, 3], 6) == [0, 1]


def test_handles_negative_numbers():
    assert two_sum([-3, 4, 3, 90], 0) == [0, 2]


def test_handles_zero_as_target():
    assert two_sum([-1, 0, 1, 2], 0) == [0, 2]


def test_finds_pair_at_beginning():
    assert two_sum([5, 3, 1, 9], 8) == [0, 1]


def test_handles_two_element_array():
    assert two_sum([4, 6], 10) == [0, 1]


if __name__ == "__main__":
    test_finds_pair_summing_to_target_in_default()
    test_finds_pair_at_end_of_array()
    test_finds_pair_using_same_index_once()
    test_handles_negative_numbers()
    test_handles_zero_as_target()
    test_finds_pair_at_beginning()
    test_handles_two_element_array()
    print("All tests passed!")
