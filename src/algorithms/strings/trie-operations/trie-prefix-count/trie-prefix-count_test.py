"""Correctness tests for the trie_prefix_count function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("trie-prefix-count")
trie_prefix_count = module.trie_prefix_count


def test_counts_shared_prefix():
    assert trie_prefix_count(["apple", "app", "apricot", "ape"], "ap") == 4


def test_single_word_match():
    assert trie_prefix_count(["hello"], "he") == 1


def test_empty_word_list():
    assert trie_prefix_count([], "a") == 0


def test_no_word_starts_with_prefix():
    assert trie_prefix_count(["apple", "app", "apricot"], "banana") == 0


def test_exact_prefix_match():
    assert trie_prefix_count(["apple", "app", "apricot", "ape"], "apple") == 1


def test_prefix_equals_full_word():
    assert trie_prefix_count(["app", "apple", "application"], "app") == 3


def test_prefix_longer_than_stored():
    assert trie_prefix_count(["app"], "application") == 0


def test_duplicate_words_counted_separately():
    assert trie_prefix_count(["apple", "apple"], "ap") == 2


def test_single_char_prefix():
    assert trie_prefix_count(["apple", "ant", "ace"], "a") == 3


def test_no_common_prefix():
    assert trie_prefix_count(["cat", "dog", "bird"], "c") == 1


def test_empty_prefix_returns_zero():
    assert trie_prefix_count(["apple", "app"], "") == 0


def test_varying_length_words():
    assert trie_prefix_count(["a", "ab", "abc", "abcd"], "ab") == 3


if __name__ == "__main__":
    test_counts_shared_prefix()
    test_single_word_match()
    test_empty_word_list()
    test_no_word_starts_with_prefix()
    test_exact_prefix_match()
    test_prefix_equals_full_word()
    test_prefix_longer_than_stored()
    test_duplicate_words_counted_separately()
    test_single_char_prefix()
    test_no_common_prefix()
    test_empty_prefix_returns_zero()
    test_varying_length_words()
    print("All tests passed!")
