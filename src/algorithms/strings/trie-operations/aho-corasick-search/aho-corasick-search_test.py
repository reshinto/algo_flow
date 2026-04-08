"""Correctness tests for the aho_corasick_search function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("aho-corasick-search")
aho_corasick_search = module.aho_corasick_search


def test_classic_example():
    result = aho_corasick_search("ahishers", ["he", "she", "his", "hers"])
    assert sorted(result) == sorted(["he", "hers", "his", "she"])


def test_no_patterns_found():
    result = aho_corasick_search("hello world", ["xyz", "abc"])
    assert len(result) == 0


def test_empty_patterns_list():
    result = aho_corasick_search("hello", [])
    assert len(result) == 0


def test_empty_text():
    result = aho_corasick_search("", ["hello", "world"])
    assert len(result) == 0


def test_single_pattern_found():
    result = aho_corasick_search("banana", ["nan"])
    assert result == ["nan"]


def test_pattern_found_once_despite_multiple_occurrences():
    result = aho_corasick_search("aaaa", ["aa"])
    assert result == ["aa"]


def test_overlapping_patterns():
    result = aho_corasick_search("aabc", ["a", "aa", "aab"])
    assert sorted(result) == sorted(["a", "aa", "aab"])


def test_prefix_of_another_pattern():
    result = aho_corasick_search("app", ["app", "ap"])
    assert sorted(result) == sorted(["ap", "app"])


def test_full_text_pattern():
    result = aho_corasick_search("hello", ["hello"])
    assert result == ["hello"]


def test_single_char_patterns():
    result = aho_corasick_search("abcabc", ["a", "b"])
    assert sorted(result) == sorted(["a", "b"])


def test_returns_only_found_patterns():
    result = aho_corasick_search("cat", ["cat", "dog", "bird"])
    assert result == ["cat"]


def test_no_shared_prefix():
    result = aho_corasick_search("foobar", ["foo", "bar"])
    assert sorted(result) == sorted(["bar", "foo"])


def test_case_sensitive():
    result = aho_corasick_search("Hello", ["hello"])
    assert len(result) == 0


def test_pattern_at_end():
    result = aho_corasick_search("xyzabc", ["abc"])
    assert result == ["abc"]


def test_pattern_at_start():
    result = aho_corasick_search("abcxyz", ["abc"])
    assert result == ["abc"]


if __name__ == "__main__":
    test_classic_example()
    test_no_patterns_found()
    test_empty_patterns_list()
    test_empty_text()
    test_single_pattern_found()
    test_pattern_found_once_despite_multiple_occurrences()
    test_overlapping_patterns()
    test_prefix_of_another_pattern()
    test_full_text_pattern()
    test_single_char_patterns()
    test_returns_only_found_patterns()
    test_no_shared_prefix()
    test_case_sensitive()
    test_pattern_at_end()
    test_pattern_at_start()
    print("All tests passed!")
