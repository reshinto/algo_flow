"""Correctness tests for the rabin_karp_search function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("rabin-karp-search")
rabin_karp_search = module.rabin_karp_search


def test_pattern_at_start():
    assert rabin_karp_search("ABCDEF", "ABC") == 0


def test_pattern_in_middle():
    assert rabin_karp_search("GEEKS FOR GEEKS", "GEEK") == 0


def test_pattern_at_end():
    assert rabin_karp_search("XYZABC", "ABC") == 3


def test_pattern_not_found():
    assert rabin_karp_search("ABCDEFG", "XYZ") == -1


def test_single_char_found():
    assert rabin_karp_search("HELLO", "L") == 2


def test_single_char_not_found():
    assert rabin_karp_search("HELLO", "Z") == -1


def test_empty_pattern():
    assert rabin_karp_search("HELLO", "") == 0


def test_text_equals_pattern():
    assert rabin_karp_search("ABCD", "ABCD") == 0


def test_pattern_longer_than_text():
    assert rabin_karp_search("AB", "ABCD") == -1


def test_repeated_characters():
    assert rabin_karp_search("AAAAAB", "AAAB") == 2


def test_full_text_pattern():
    assert rabin_karp_search("ABABCABAB", "ABABCABAB") == 0


def test_for_in_geeks():
    assert rabin_karp_search("GEEKS FOR GEEKS", "FOR") == 6


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
    test_full_text_pattern()
    test_for_in_geeks()
    print("All tests passed!")
