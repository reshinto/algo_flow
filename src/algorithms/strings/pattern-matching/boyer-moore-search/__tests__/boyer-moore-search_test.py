"""Correctness tests for the boyer_moore_search function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("boyer-moore-search")
boyer_moore_search = module.boyer_moore_search


def test_pattern_at_start():
    assert boyer_moore_search("ABCDEF", "ABC") == 0


def test_pattern_in_middle():
    assert boyer_moore_search("ABAAABCD", "ABC") == 4


def test_pattern_at_end():
    assert boyer_moore_search("XYZABC", "ABC") == 3


def test_pattern_not_found():
    assert boyer_moore_search("ABCDEFG", "XYZ") == -1


def test_single_char_found():
    assert boyer_moore_search("HELLO", "L") == 2


def test_single_char_not_found():
    assert boyer_moore_search("HELLO", "Z") == -1


def test_empty_pattern():
    assert boyer_moore_search("HELLO", "") == 0


def test_text_equals_pattern():
    assert boyer_moore_search("ABCD", "ABCD") == 0


def test_pattern_longer_than_text():
    assert boyer_moore_search("AB", "ABCD") == -1


def test_repeated_chars():
    assert boyer_moore_search("AAAAABCD", "ABCD") == 4


def test_multiple_shifts():
    assert boyer_moore_search("GCATCGCAGAGAGTATACAGTACG", "GCAGAGAG") == 5


def test_no_repeated_chars():
    assert boyer_moore_search("ABCDEFGHIJK", "DEF") == 3


if __name__ == "__main__":
    test_pattern_at_start()
    test_pattern_in_middle()
    test_pattern_at_end()
    test_pattern_not_found()
    test_single_char_found()
    test_single_char_not_found()
    test_empty_pattern()
    test_text_equals_pattern()
    test_pattern_longer_than_text()
    test_repeated_chars()
    test_multiple_shifts()
    test_no_repeated_chars()
    print("All tests passed!")
