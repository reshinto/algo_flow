"""Correctness tests for the longest_word_in_trie function."""

import importlib

module = importlib.import_module("longest-word-in-trie")
longest_word_in_trie = module.longest_word_in_trie


def test_full_chain():
    assert longest_word_in_trie(["w", "wo", "wor", "worl", "world"]) == "world"


def test_empty_list():
    assert longest_word_in_trie([]) == ""


def test_single_char_word():
    assert longest_word_in_trie(["a"]) == "a"


def test_no_word_with_all_prefixes():
    assert longest_word_in_trie(["world"]) == ""


def test_full_apple_chain():
    assert longest_word_in_trie(["a", "ap", "app", "appl", "apple"]) == "apple"


def test_lexicographically_smallest_on_tie():
    assert longest_word_in_trie(["b", "ba", "c", "ca"]) == "ba"


def test_skips_incomplete_chain():
    assert longest_word_in_trie(["d", "dog"]) == "d"


def test_empty_words_with_no_prefixes():
    assert longest_word_in_trie(["abc", "def", "ghi"]) == ""


def test_picks_longer_competing_chain():
    assert longest_word_in_trie(["a", "ab", "abc", "x", "xy"]) == "abc"


def test_duplicate_words():
    assert longest_word_in_trie(["a", "a", "ab", "ab"]) == "ab"


def test_lexicographically_smallest_single_chars():
    assert longest_word_in_trie(["b", "c"]) == "b"


if __name__ == "__main__":
    test_full_chain()
    test_empty_list()
    test_single_char_word()
    test_no_word_with_all_prefixes()
    test_full_apple_chain()
    test_lexicographically_smallest_on_tie()
    test_skips_incomplete_chain()
    test_empty_words_with_no_prefixes()
    test_picks_longer_competing_chain()
    test_duplicate_words()
    test_lexicographically_smallest_single_chars()
    print("All tests passed!")
