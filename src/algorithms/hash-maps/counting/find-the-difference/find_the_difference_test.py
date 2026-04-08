import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

find_the_difference = importlib.import_module("find-the-difference").find_the_difference


def test_finds_e_added_to_abcd():
    assert find_the_difference("abcd", "abcde") == "e"


def test_finds_added_char_at_start():
    assert find_the_difference("abc", "zabc") == "z"


def test_finds_added_char_duplicating_existing():
    assert find_the_difference("aab", "aabb") == "b"


def test_handles_empty_original():
    assert find_the_difference("", "x") == "x"


def test_finds_added_char_in_middle():
    assert find_the_difference("ab", "amb") == "m"


def test_handles_single_character_original():
    assert find_the_difference("a", "ab") == "b"


def test_finds_duplicated_char_in_all_same_string():
    assert find_the_difference("aaa", "aaaa") == "a"


def test_works_with_uppercase_letters():
    assert find_the_difference("ABC", "ABCD") == "D"


if __name__ == "__main__":
    test_finds_e_added_to_abcd()
    test_finds_added_char_at_start()
    test_finds_added_char_duplicating_existing()
    test_handles_empty_original()
    test_finds_added_char_in_middle()
    test_handles_single_character_original()
    test_finds_duplicated_char_in_all_same_string()
    test_works_with_uppercase_letters()
    print("All tests passed!")
