"""Correctness tests for the longest_repeated_substring function."""

import importlib

module = importlib.import_module("longest-repeated-substring")
longest_repeated_substring = module.longest_repeated_substring


def test_banana():
    assert longest_repeated_substring("banana") == "ana"


def test_no_repeat():
    assert longest_repeated_substring("abcd") == ""


def test_aab():
    assert longest_repeated_substring("aab") == "a"


def test_single_char():
    assert longest_repeated_substring("a") == ""


def test_empty_string():
    assert longest_repeated_substring("") == ""


def test_ababc():
    assert longest_repeated_substring("ababc") == "ab"


def test_all_same():
    result = longest_repeated_substring("aaa")
    assert len(result) > 0
    assert result in "aaa"


def test_two_identical_chars():
    assert longest_repeated_substring("aa") == "a"


def test_two_different_chars():
    assert longest_repeated_substring("ab") == ""


def test_abcabc():
    assert longest_repeated_substring("abcabc") == "abc"


def test_mississippi():
    result = longest_repeated_substring("mississippi")
    assert len(result) > 0
    first_occurrence = "mississippi".find(result)
    second_occurrence = "mississippi".find(result, first_occurrence + 1)
    assert second_occurrence > -1


def test_numeric_like():
    assert longest_repeated_substring("121212") == "1212"


if __name__ == "__main__":
    test_banana()
    test_no_repeat()
    test_aab()
    test_single_char()
    test_empty_string()
    test_ababc()
    test_all_same()
    test_two_identical_chars()
    test_two_different_chars()
    test_abcabc()
    test_mississippi()
    test_numeric_like()
    print("All tests passed!")
