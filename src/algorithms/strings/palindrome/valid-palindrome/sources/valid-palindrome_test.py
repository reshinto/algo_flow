"""Correctness tests for the valid_palindrome function."""

import importlib

module = importlib.import_module("valid-palindrome")
valid_palindrome = module.valid_palindrome


def test_a_man_a_plan():
    assert valid_palindrome("A man, a plan, a canal: Panama") is True


def test_race_a_car_false():
    assert valid_palindrome("race a car") is False


def test_single_space():
    assert valid_palindrome(" ") is True


def test_single_alnum_with_punctuation():
    assert valid_palindrome("a.") is True


def test_empty_string():
    assert valid_palindrome("") is True


def test_simple_palindrome():
    assert valid_palindrome("racecar") is True


def test_simple_non_palindrome():
    assert valid_palindrome("hello") is False


def test_case_insensitive():
    assert valid_palindrome("AbBa") is True


def test_only_punctuation():
    assert valid_palindrome(".,!?") is True


def test_alnum_palindrome_with_punctuation():
    assert valid_palindrome("...racecar...") is True


def test_alnum_mismatch_in_middle():
    assert valid_palindrome("ab2a") is False


if __name__ == "__main__":
    test_a_man_a_plan()
    test_race_a_car_false()
    test_single_space()
    test_single_alnum_with_punctuation()
    test_empty_string()
    test_simple_palindrome()
    test_simple_non_palindrome()
    test_case_insensitive()
    test_only_punctuation()
    test_alnum_palindrome_with_punctuation()
    test_alnum_mismatch_in_middle()
    print("All tests passed!")
