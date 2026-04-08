"""Correctness tests for the string_compression function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("string-compression")
string_compression = module.string_compression


def test_compresses_repeated():
    assert string_compression("aabcccccaaa") == "a2b1c5a3"


def test_returns_original_if_not_shorter():
    assert string_compression("abc") == "abc"


def test_empty_string():
    assert string_compression("") == ""


def test_single_char():
    assert string_compression("a") == "a"


def test_two_identical_chars_same_length():
    assert string_compression("aa") == "aa"


def test_long_run():
    assert string_compression("aaaaaaa") == "a7"


def test_alternating_segments():
    assert string_compression("aaabbbccc") == "a3b3c3"


def test_no_runs():
    assert string_compression("abcd") == "abcd"


def test_long_run_then_short():
    assert string_compression("aaaaab") == "a5b1"


def test_two_distinct_runs():
    assert string_compression("aaabbb") == "a3b3"


def test_single_then_long_run():
    assert string_compression("abbbbb") == "a1b5"


def test_digits():
    assert string_compression("1111222") == "1423"


if __name__ == "__main__":
    test_compresses_repeated()
    test_returns_original_if_not_shorter()
    test_empty_string()
    test_single_char()
    test_two_identical_chars_same_length()
    test_long_run()
    test_alternating_segments()
    test_no_runs()
    test_long_run_then_short()
    test_two_distinct_runs()
    test_single_then_long_run()
    test_digits()
    print("All tests passed!")
