import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

word_pattern = importlib.import_module("word-pattern").word_pattern


def test_returns_true_for_abba_dog_cat_cat_dog():
    assert word_pattern("abba", "dog cat cat dog") is True


def test_returns_false_when_char_maps_to_two_words():
    assert word_pattern("abba", "dog cat cat fish") is False


def test_returns_true_for_aabb_dog_dog_cat_cat():
    assert word_pattern("aabb", "dog dog cat cat") is True


def test_returns_false_when_all_same_but_pattern_varied():
    assert word_pattern("aaaa", "dog cat cat dog") is False


def test_returns_false_when_pattern_and_word_count_differ():
    assert word_pattern("abc", "dog cat") is False


def test_returns_true_for_single_char_pattern():
    assert word_pattern("a", "dog") is True


def test_returns_true_for_identical_pattern_same_word():
    assert word_pattern("aa", "dog dog") is True


def test_returns_false_when_bijection_violated_word_to_char():
    assert word_pattern("ab", "dog dog") is False


def test_handles_all_unique_chars_and_words():
    assert word_pattern("abcd", "one two three four") is True


if __name__ == "__main__":
    test_returns_true_for_abba_dog_cat_cat_dog()
    test_returns_false_when_char_maps_to_two_words()
    test_returns_true_for_aabb_dog_dog_cat_cat()
    test_returns_false_when_all_same_but_pattern_varied()
    test_returns_false_when_pattern_and_word_count_differ()
    test_returns_true_for_single_char_pattern()
    test_returns_true_for_identical_pattern_same_word()
    test_returns_false_when_bijection_violated_word_to_char()
    test_handles_all_unique_chars_and_words()
    print("All tests passed!")
