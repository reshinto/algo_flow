"""Correctness tests for the naive_pattern_search function."""

import importlib

module = importlib.import_module("naive-pattern-search")
naive_pattern_search = module.naive_pattern_search


def test_pattern_at_start():
    assert naive_pattern_search("ABCDEF", "ABC") == 0


def test_pattern_in_middle():
    assert naive_pattern_search("AABAACAADAABAABA", "AABA") == 0


def test_pattern_at_end():
    assert naive_pattern_search("XYZABC", "ABC") == 3


def test_pattern_not_found():
    assert naive_pattern_search("ABCDEFG", "XYZ") == -1


def test_single_char_found():
    assert naive_pattern_search("HELLO", "L") == 2


def test_single_char_not_found():
    assert naive_pattern_search("HELLO", "Z") == -1


def test_empty_pattern():
    assert naive_pattern_search("HELLO", "") == 0


def test_text_equals_pattern():
    assert naive_pattern_search("ABCD", "ABCD") == 0


def test_pattern_longer_than_text():
    assert naive_pattern_search("AB", "ABCD") == -1


def test_repeated_characters():
    assert naive_pattern_search("AAAAAB", "AAAB") == 2


def test_first_of_multiple():
    assert naive_pattern_search("AABAACAADAABAABA", "AABA") == 0


def test_worst_case_repetitive():
    assert naive_pattern_search("AAAAAAB", "AAAAB") == 2


if __name__ == "__main__":
    test_pattern_at_start()
    test_pattern_in_middle()
    test_pattern_at_end()
    test_pattern_not_found()
    test_single_char_found()
    test_single_char_not_found()
    test_empty_pattern()
    test_text_equals_pattern()
    test_pattern_longer_than_text()
    test_repeated_characters()
    test_first_of_multiple()
    test_worst_case_repetitive()
    print("All tests passed!")
