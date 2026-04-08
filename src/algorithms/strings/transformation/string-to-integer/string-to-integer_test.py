"""Correctness tests for the string_to_integer function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("string-to-integer")
string_to_integer = module.string_to_integer

INT32_MIN = -(2**31)
INT32_MAX = 2**31 - 1


def test_plain_positive():
    assert string_to_integer("42") == 42


def test_negative_with_leading_whitespace():
    assert string_to_integer("   -42") == -42


def test_stops_at_non_digit():
    assert string_to_integer("4193 with words") == 4193


def test_starts_with_letters():
    assert string_to_integer("words and 987") == 0


def test_empty_string():
    assert string_to_integer("") == 0


def test_only_whitespace():
    assert string_to_integer("   ") == 0


def test_explicit_plus():
    assert string_to_integer("+100") == 100


def test_zero():
    assert string_to_integer("0") == 0


def test_clamp_above_max():
    assert string_to_integer("2147483648") == INT32_MAX


def test_clamp_below_min():
    assert string_to_integer("-2147483649") == INT32_MIN


def test_extremely_large():
    assert string_to_integer("99999999999999999") == INT32_MAX


def test_extremely_large_negative():
    assert string_to_integer("-99999999999999999") == INT32_MIN


def test_leading_whitespace_positive():
    assert string_to_integer("  123") == 123


def test_stops_after_sign_with_letters():
    assert string_to_integer("-abc") == 0


def test_int32_max_exact():
    assert string_to_integer("2147483647") == INT32_MAX


def test_int32_min_exact():
    assert string_to_integer("-2147483648") == INT32_MIN


if __name__ == "__main__":
    test_plain_positive()
    test_negative_with_leading_whitespace()
    test_stops_at_non_digit()
    test_starts_with_letters()
    test_empty_string()
    test_only_whitespace()
    test_explicit_plus()
    test_zero()
    test_clamp_above_max()
    test_clamp_below_min()
    test_extremely_large()
    test_extremely_large_negative()
    test_leading_whitespace_positive()
    test_stops_after_sign_with_letters()
    test_int32_max_exact()
    test_int32_min_exact()
    print("All tests passed!")
