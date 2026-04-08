"""Correctness tests for the kmp_search function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("kmp-search")
kmp_search = module.kmp_search


def test_pattern_at_start():
    assert kmp_search("ABCDEF", "ABC") == 0


def test_pattern_in_middle():
    assert kmp_search("ABABDABACDABABCABAB", "ABABCABAB") == 10


def test_pattern_at_end():
    assert kmp_search("XYZABC", "ABC") == 3


def test_pattern_not_found():
    assert kmp_search("ABCDEFG", "XYZ") == -1


def test_single_char_found():
    assert kmp_search("HELLO", "L") == 2


def test_single_char_not_found():
    assert kmp_search("HELLO", "Z") == -1


def test_empty_pattern():
    assert kmp_search("HELLO", "") == 0


def test_text_equals_pattern():
    assert kmp_search("ABCD", "ABCD") == 0


def test_pattern_longer_than_text():
    assert kmp_search("AB", "ABCD") == -1


def test_repeated_characters():
    assert kmp_search("AAAAAB", "AAAB") == 2


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
    test_repeated_characters()
    print("All tests passed!")
