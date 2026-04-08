"""Correctness tests for the longest_palindromic_substring function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("longest-palindromic-substring")
longest_palindromic_substring = module.longest_palindromic_substring


def test_babad():
    result = longest_palindromic_substring("babad")
    assert result in ("bab", "aba")


def test_cbbd():
    assert longest_palindromic_substring("cbbd") == "bb"


def test_single_char():
    assert longest_palindromic_substring("a") == "a"


def test_empty_string():
    assert longest_palindromic_substring("") == ""


def test_full_palindrome():
    assert longest_palindromic_substring("racecar") == "racecar"


def test_even_length_palindrome():
    assert longest_palindromic_substring("abba") == "abba"


def test_all_same_chars():
    assert longest_palindromic_substring("aaaa") == "aaaa"


def test_all_unique_chars():
    result = longest_palindromic_substring("abcde")
    assert len(result) == 1


def test_embedded_palindrome():
    assert longest_palindromic_substring("xyzracecarabc") == "racecar"


def test_even_palindrome_embedded():
    assert longest_palindromic_substring("xyzabbadef") == "abba"


def test_two_char_palindrome():
    assert longest_palindromic_substring("aa") == "aa"


def test_two_char_non_palindrome():
    result = longest_palindromic_substring("ab")
    assert len(result) == 1


if __name__ == "__main__":
    test_babad()
    test_cbbd()
    test_single_char()
    test_empty_string()
    test_full_palindrome()
    test_even_length_palindrome()
    test_all_same_chars()
    test_all_unique_chars()
    test_embedded_palindrome()
    test_even_palindrome_embedded()
    test_two_char_palindrome()
    test_two_char_non_palindrome()
    print("All tests passed!")
