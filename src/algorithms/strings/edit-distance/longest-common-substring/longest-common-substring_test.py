"""Correctness tests for the longest_common_substring function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("longest-common-substring")
longest_common_substring = module.longest_common_substring


def test_ababc_babcba():
    assert longest_common_substring("ABABC", "BABCBA") == 4


def test_source_empty():
    assert longest_common_substring("", "abc") == 0


def test_target_empty():
    assert longest_common_substring("abc", "") == 0


def test_two_empty_strings():
    assert longest_common_substring("", "") == 0


def test_identical_strings():
    assert longest_common_substring("abc", "abc") == 3


def test_completely_different():
    assert longest_common_substring("abc", "xyz") == 0


def test_single_matching_char():
    assert longest_common_substring("abc", "xbz") == 1


def test_single_char_match():
    assert longest_common_substring("a", "a") == 1


def test_single_char_differ():
    assert longest_common_substring("a", "b") == 0


def test_substring_at_beginning():
    assert longest_common_substring("abcdef", "abcxyz") == 3


def test_substring_at_end():
    assert longest_common_substring("xyzabc", "defabc") == 3


def test_multiple_substrings_pick_longest():
    assert longest_common_substring("abXYZcd", "abXYcd") == 4


def test_repeated_characters():
    assert longest_common_substring("aaaa", "aa") == 2


if __name__ == "__main__":
    test_ababc_babcba()
    test_source_empty()
    test_target_empty()
    test_two_empty_strings()
    test_identical_strings()
    test_completely_different()
    test_single_matching_char()
    test_single_char_match()
    test_single_char_differ()
    test_substring_at_beginning()
    test_substring_at_end()
    test_multiple_substrings_pick_longest()
    test_repeated_characters()
    print("All tests passed!")
