import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

reorganize_string = importlib.import_module("reorganize-string").reorganize_string


def has_adjacent_duplicates(text):
    for idx in range(1, len(text)):
        if text[idx] == text[idx - 1]:
            return True
    return False


def char_counts(text):
    counts = {}
    for char in text:
        counts[char] = counts.get(char, 0) + 1
    return counts


def test_aabbc():
    result = reorganize_string("aabbc")
    assert len(result) == 5
    assert not has_adjacent_duplicates(result)
    assert char_counts(result) == char_counts("aabbc")


def test_impossible_aaab():
    assert reorganize_string("aaab") == ""


def test_single_char():
    assert reorganize_string("a") == "a"


def test_two_different():
    result = reorganize_string("ab")
    assert len(result) == 2
    assert not has_adjacent_duplicates(result)


def test_aab():
    result = reorganize_string("aab")
    assert len(result) == 3
    assert not has_adjacent_duplicates(result)


def test_vvvlo():
    result = reorganize_string("vvvlo")
    assert len(result) == 5
    assert not has_adjacent_duplicates(result)
    assert char_counts(result) == char_counts("vvvlo")


def test_impossible_aaa():
    assert reorganize_string("aaa") == ""


def test_impossible_aa():
    assert reorganize_string("aa") == ""


def test_all_unique():
    result = reorganize_string("abcde")
    assert len(result) == 5
    assert not has_adjacent_duplicates(result)


if __name__ == "__main__":
    test_aabbc()
    test_impossible_aaab()
    test_single_char()
    test_two_different()
    test_aab()
    test_vvvlo()
    test_impossible_aaa()
    test_impossible_aa()
    test_all_unique()
    print("All tests passed!")
