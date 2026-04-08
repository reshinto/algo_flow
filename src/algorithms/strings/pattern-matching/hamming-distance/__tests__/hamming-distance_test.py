"""Correctness tests for the hamming_distance function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("hamming-distance")
hamming_distance = module.hamming_distance


def test_karolin_kathrin():
    assert hamming_distance("karolin", "kathrin") == 3


def test_identical_strings():
    assert hamming_distance("abcdef", "abcdef") == 0


def test_all_chars_differ():
    assert hamming_distance("aaaa", "bbbb") == 4


def test_single_char_difference():
    assert hamming_distance("hello", "hxllo") == 1


def test_different_lengths():
    assert hamming_distance("abc", "abcd") == -1


def test_text_longer_than_pattern():
    assert hamming_distance("abcde", "abc") == -1


def test_single_char_match():
    assert hamming_distance("a", "a") == 0


def test_single_char_differ():
    assert hamming_distance("a", "b") == 1


def test_two_empty_strings():
    assert hamming_distance("", "") == 0


def test_binary_string_pair():
    assert hamming_distance("1011101", "1001001") == 2


def test_uppercase_comparison():
    assert hamming_distance("TONED", "ROSES") == 3


if __name__ == "__main__":
    test_karolin_kathrin()
    test_identical_strings()
    test_all_chars_differ()
    test_single_char_difference()
    test_different_lengths()
    test_text_longer_than_pattern()
    test_single_char_match()
    test_single_char_differ()
    test_two_empty_strings()
    test_binary_string_pair()
    test_uppercase_comparison()
    print("All tests passed!")
