"""Correctness tests for the minimum_window_substring function."""

import importlib

module = importlib.import_module("minimum-window-substring")
minimum_window_substring = module.minimum_window_substring


def test_classic_example():
    assert minimum_window_substring("ADOBECODEBANC", "ABC") == "BANC"


def test_single_char_match():
    assert minimum_window_substring("a", "a") == "a"


def test_needs_more_chars_than_text():
    assert minimum_window_substring("a", "aa") == ""


def test_pattern_char_absent():
    assert minimum_window_substring("hello", "z") == ""


def test_text_equals_pattern():
    assert minimum_window_substring("abc", "abc") == "abc"


def test_text_shorter_than_pattern():
    assert minimum_window_substring("ab", "abc") == ""


def test_duplicate_chars_in_pattern():
    assert minimum_window_substring("ADOBECODEBANC", "AABC") == "ADOBECODEBA"


def test_minimum_window_multiple_valid():
    assert minimum_window_substring("cabwefgewcwaefgcf", "cae") == "cwae"


def test_single_char_pattern_at_end():
    assert minimum_window_substring("abcdef", "f") == "f"


def test_empty_pattern():
    assert minimum_window_substring("abc", "") == ""


def test_all_same_chars():
    assert minimum_window_substring("aaabbbccc", "b") == "b"


def test_window_spans_full_text():
    assert minimum_window_substring("abc", "cba") == "abc"


if __name__ == "__main__":
    test_classic_example()
    test_single_char_match()
    test_needs_more_chars_than_text()
    test_pattern_char_absent()
    test_text_equals_pattern()
    test_text_shorter_than_pattern()
    test_duplicate_chars_in_pattern()
    test_minimum_window_multiple_valid()
    test_single_char_pattern_at_end()
    test_empty_pattern()
    test_all_same_chars()
    test_window_spans_full_text()
    print("All tests passed!")
