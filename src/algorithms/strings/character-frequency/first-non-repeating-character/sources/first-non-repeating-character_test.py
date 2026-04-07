"""Correctness tests for the first_non_repeating_character function."""

import importlib

module = importlib.import_module("first-non-repeating-character")
first_non_repeating_character = module.first_non_repeating_character


def test_leetcode():
    assert first_non_repeating_character("leetcode") == 0


def test_loveleetcode():
    assert first_non_repeating_character("loveleetcode") == 2


def test_aabb_all_repeat():
    assert first_non_repeating_character("aabb") == -1


def test_single_character():
    assert first_non_repeating_character("z") == 0


def test_aabbcc_all_repeat():
    assert first_non_repeating_character("aabbcc") == -1


def test_unique_in_middle():
    assert first_non_repeating_character("aabbc") == 4


def test_first_is_unique():
    assert first_non_repeating_character("xaabb") == 0


def test_last_is_unique():
    assert first_non_repeating_character("aabbz") == 4


def test_all_identical():
    assert first_non_repeating_character("aaaa") == -1


def test_two_unique_chars():
    assert first_non_repeating_character("ab") == 0


def test_dddccdbba():
    assert first_non_repeating_character("dddccdbba") == 8


if __name__ == "__main__":
    test_leetcode()
    test_loveleetcode()
    test_aabb_all_repeat()
    test_single_character()
    test_aabbcc_all_repeat()
    test_unique_in_middle()
    test_first_is_unique()
    test_last_is_unique()
    test_all_identical()
    test_two_unique_chars()
    test_dddccdbba()
    print("All tests passed!")
