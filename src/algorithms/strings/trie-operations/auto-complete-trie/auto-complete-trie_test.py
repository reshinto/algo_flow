"""Correctness tests for the auto_complete_trie function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("auto-complete-trie")
auto_complete_trie = module.auto_complete_trie


def test_matches_prefix():
    result = auto_complete_trie(["apple", "app", "apricot", "banana", "bat"], "ap")
    assert sorted(result) == sorted(["app", "apple", "apricot"])


def test_single_word_match():
    result = auto_complete_trie(["apple", "banana", "cherry"], "ban")
    assert result == ["banana"]


def test_no_match():
    result = auto_complete_trie(["apple", "app", "apricot"], "ba")
    assert result == []


def test_prefix_not_in_trie():
    result = auto_complete_trie(["apple", "app"], "xyz")
    assert result == []


def test_empty_prefix_returns_all():
    result = auto_complete_trie(["apple", "app", "banana"], "")
    assert sorted(result) == sorted(["app", "apple", "banana"])


def test_empty_word_list():
    result = auto_complete_trie([], "ap")
    assert result == []


def test_prefix_equals_full_word():
    result = auto_complete_trie(["apple", "app", "apricot"], "app")
    assert sorted(result) == sorted(["app", "apple"])


def test_shared_sub_prefix():
    result = auto_complete_trie(["cat", "car", "dog"], "ca")
    assert sorted(result) == sorted(["car", "cat"])


def test_single_word_dict_match():
    result = auto_complete_trie(["hello"], "hel")
    assert result == ["hello"]


def test_single_word_dict_no_match():
    result = auto_complete_trie(["hello"], "world")
    assert result == []


def test_no_shared_prefix():
    result = auto_complete_trie(["alpha", "beta", "gamma"], "al")
    assert result == ["alpha"]


def test_duplicate_words():
    result = auto_complete_trie(["apple", "apple"], "app")
    assert sorted(result) == ["apple"]


def test_single_char_prefix():
    result = auto_complete_trie(["apple", "apricot", "banana"], "a")
    assert sorted(result) == sorted(["apple", "apricot"])


if __name__ == "__main__":
    test_matches_prefix()
    test_single_word_match()
    test_no_match()
    test_prefix_not_in_trie()
    test_empty_prefix_returns_all()
    test_empty_word_list()
    test_prefix_equals_full_word()
    test_shared_sub_prefix()
    test_single_word_dict_match()
    test_single_word_dict_no_match()
    test_no_shared_prefix()
    test_duplicate_words()
    test_single_char_prefix()
    print("All tests passed!")
