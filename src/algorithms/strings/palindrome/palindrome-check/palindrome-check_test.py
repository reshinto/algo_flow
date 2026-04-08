"""Correctness tests for the palindrome_check function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("palindrome-check")
palindrome_check = module.palindrome_check


def test_racecar():
    assert palindrome_check("racecar") is True


def test_hello_false():
    assert palindrome_check("hello") is False


def test_single_char():
    assert palindrome_check("a") is True


def test_empty_string():
    assert palindrome_check("") is True


def test_two_char_non_palindrome():
    assert palindrome_check("ab") is False


def test_odd_length_palindrome():
    assert palindrome_check("aba") is True


def test_even_length_palindrome():
    assert palindrome_check("abba") is True


def test_first_last_differ():
    assert palindrome_check("abca") is False


def test_all_same_chars():
    assert palindrome_check("aaaa") is True


if __name__ == "__main__":
    test_racecar()
    test_hello_false()
    test_single_char()
    test_empty_string()
    test_two_char_non_palindrome()
    test_odd_length_palindrome()
    test_even_length_palindrome()
    test_first_last_differ()
    test_all_same_chars()
    print("All tests passed!")
