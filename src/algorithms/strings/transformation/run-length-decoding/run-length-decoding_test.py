"""Correctness tests for the run_length_decoding function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("run-length-decoding")
run_length_decoding = module.run_length_decoding


def test_default_example():
    assert run_length_decoding("3a2b4c") == "aaabbcccc"


def test_all_single_count():
    assert run_length_decoding("1a1b1c") == "abc"


def test_empty_string():
    assert run_length_decoding("") == ""


def test_single_group_one_char():
    assert run_length_decoding("1z") == "z"


def test_single_group_many_chars():
    assert run_length_decoding("5x") == "xxxxx"


def test_mixed_count_groups():
    assert run_length_decoding("2a3b1c") == "aabbbc"


def test_multi_digit_count():
    assert run_length_decoding("10a") == "aaaaaaaaaa"


def test_two_identical_groups():
    assert run_length_decoding("2a2a") == "aaaa"


def test_uppercase_letters():
    assert run_length_decoding("3A2B") == "AAABB"


if __name__ == "__main__":
    test_default_example()
    test_all_single_count()
    test_empty_string()
    test_single_group_one_char()
    test_single_group_many_chars()
    test_mixed_count_groups()
    test_multi_digit_count()
    test_two_identical_groups()
    test_uppercase_letters()
    print("All tests passed!")
