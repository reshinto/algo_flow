"""Correctness tests for the trie_insert_search function."""

import importlib

module = importlib.import_module("trie-insert-search")
trie_insert_search = module.trie_insert_search


def test_finds_exact_word():
    assert trie_insert_search(["apple", "app"], "app") is True


def test_prefix_not_full_word():
    assert trie_insert_search(["apple"], "ap") is False


def test_finds_longer_word():
    assert trie_insert_search(["apple", "app"], "apple") is True


def test_not_in_trie():
    assert trie_insert_search(["apple", "app", "apricot"], "banana") is False


def test_empty_trie():
    assert trie_insert_search([], "app") is False


def test_single_word_found():
    assert trie_insert_search(["hello"], "hello") is True


def test_extends_beyond_inserted():
    assert trie_insert_search(["app"], "apple") is False


def test_no_common_prefix_found():
    assert trie_insert_search(["cat", "dog", "bird"], "dog") is True


def test_no_common_prefix_miss():
    assert trie_insert_search(["cat", "dog", "bird"], "fox") is False


def test_duplicate_words():
    assert trie_insert_search(["apple", "apple"], "apple") is True


def test_single_char_words():
    assert trie_insert_search(["a", "b", "c"], "b") is True


def test_empty_search_no_empty_word():
    assert trie_insert_search(["apple", "app"], "") is False


if __name__ == "__main__":
    test_finds_exact_word()
    test_prefix_not_full_word()
    test_finds_longer_word()
    test_not_in_trie()
    test_empty_trie()
    test_single_word_found()
    test_extends_beyond_inserted()
    test_no_common_prefix_found()
    test_no_common_prefix_miss()
    test_duplicate_words()
    test_single_char_words()
    test_empty_search_no_empty_word()
    print("All tests passed!")
