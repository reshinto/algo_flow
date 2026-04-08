"""Correctness tests for the reverse_string function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("reverse-string")
reverse_string = module.reverse_string


def test_standard_word():
    assert reverse_string("hello") == "olleh"


def test_single_char():
    assert reverse_string("a") == "a"


def test_empty_string():
    assert reverse_string("") == ""


def test_two_chars():
    assert reverse_string("ab") == "ba"


def test_palindrome():
    assert reverse_string("racecar") == "racecar"


def test_with_spaces():
    assert reverse_string("hello world") == "dlrow olleh"


def test_repeated_chars():
    assert reverse_string("aaaa") == "aaaa"


def test_longer_word():
    assert reverse_string("algorithm") == "mhtirogla"


if __name__ == "__main__":
    test_standard_word()
    test_single_char()
    test_empty_string()
    test_two_chars()
    test_palindrome()
    test_with_spaces()
    test_repeated_chars()
    test_longer_word()
    print("All tests passed!")
