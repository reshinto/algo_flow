import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

jewels_and_stones = importlib.import_module("jewels-and-stones").jewels_and_stones


def test_returns_3_for_default():
    assert jewels_and_stones("aA", "aAAbbbb") == 3


def test_returns_0_when_no_stones_are_jewels():
    assert jewels_and_stones("z", "aAAbbbb") == 0


def test_returns_full_stone_count_when_every_stone_is_jewel():
    assert jewels_and_stones("abc", "abcabc") == 6


def test_handles_empty_stones_string():
    assert jewels_and_stones("aA", "") == 0


def test_handles_single_matching_stone():
    assert jewels_and_stones("a", "a") == 1


def test_handles_single_non_matching_stone():
    assert jewels_and_stones("a", "b") == 0


def test_is_case_sensitive():
    assert jewels_and_stones("A", "aA") == 1


def test_handles_duplicate_jewel_characters():
    assert jewels_and_stones("aa", "aaa") == 3


if __name__ == "__main__":
    test_returns_3_for_default()
    test_returns_0_when_no_stones_are_jewels()
    test_returns_full_stone_count_when_every_stone_is_jewel()
    test_handles_empty_stones_string()
    test_handles_single_matching_stone()
    test_handles_single_non_matching_stone()
    test_is_case_sensitive()
    test_handles_duplicate_jewel_characters()
    print("All tests passed!")
