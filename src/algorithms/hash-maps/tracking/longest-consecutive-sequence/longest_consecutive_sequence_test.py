import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

longest_consecutive_sequence = importlib.import_module(
    "longest-consecutive-sequence"
).longest_consecutive_sequence


def test_finds_sequence_1_2_3_4_in_default():
    assert longest_consecutive_sequence([100, 4, 200, 1, 3, 2]) == 4


def test_returns_1_for_no_consecutive_pairs():
    assert longest_consecutive_sequence([10, 20, 30]) == 1


def test_handles_fully_consecutive_array():
    assert longest_consecutive_sequence([1, 2, 3, 4, 5]) == 5


def test_handles_single_element():
    assert longest_consecutive_sequence([42]) == 1


def test_handles_duplicate_values():
    assert longest_consecutive_sequence([1, 2, 2, 3]) == 3


def test_handles_negative_numbers():
    assert longest_consecutive_sequence([-3, -2, -1, 0, 1]) == 5


def test_handles_sequence_spanning_negative_and_positive():
    assert longest_consecutive_sequence([-1, 0, 1]) == 3


def test_returns_correct_length_for_two_disjoint_sequences():
    assert longest_consecutive_sequence([1, 2, 3, 10, 11, 12, 13]) == 4


def test_handles_unsorted_input():
    assert longest_consecutive_sequence([5, 1, 3, 2, 4]) == 5


if __name__ == "__main__":
    test_finds_sequence_1_2_3_4_in_default()
    test_returns_1_for_no_consecutive_pairs()
    test_handles_fully_consecutive_array()
    test_handles_single_element()
    test_handles_duplicate_values()
    test_handles_negative_numbers()
    test_handles_sequence_spanning_negative_and_positive()
    test_returns_correct_length_for_two_disjoint_sequences()
    test_handles_unsorted_input()
    print("All tests passed!")
