"""Correctness tests for the string_rotation_check function."""

import importlib

module = importlib.import_module("string-rotation-check")
string_rotation_check = module.string_rotation_check


def test_valid_rotation():
    assert string_rotation_check("waterbottle", "erbottlewat") is True


def test_zero_offset_rotation():
    assert string_rotation_check("hello", "hello") is True


def test_single_char_match():
    assert string_rotation_check("a", "a") is True


def test_single_char_no_match():
    assert string_rotation_check("a", "b") is False


def test_different_lengths():
    assert string_rotation_check("abc", "ab") is False


def test_bottlewater_is_rotation():
    assert string_rotation_check("waterbottle", "bottlewater") is True


def test_not_a_rotation():
    assert string_rotation_check("abcde", "abced") is False


def test_rotation_by_one():
    assert string_rotation_check("abcde", "bcdea") is True


def test_rotation_from_end():
    assert string_rotation_check("abcde", "eabcd") is True


def test_two_empty_strings():
    assert string_rotation_check("", "") is True


def test_one_empty_one_not():
    assert string_rotation_check("abc", "") is False


def test_repeated_chars_not_rotation():
    assert string_rotation_check("aabaa", "baaab") is False


def test_repeated_chars_valid_rotation():
    assert string_rotation_check("aab", "baa") is True


if __name__ == "__main__":
    test_valid_rotation()
    test_zero_offset_rotation()
    test_single_char_match()
    test_single_char_no_match()
    test_different_lengths()
    test_bottlewater_is_rotation()
    test_not_a_rotation()
    test_rotation_by_one()
    test_rotation_from_end()
    test_two_empty_strings()
    test_one_empty_one_not()
    test_repeated_chars_not_rotation()
    test_repeated_chars_valid_rotation()
    print("All tests passed!")
