"""Correctness tests for the reverse_words function."""

import importlib

module = importlib.import_module("reverse-words")
reverse_words = module.reverse_words


def test_the_sky_is_blue():
    assert reverse_words("the sky is blue") == "blue is sky the"


def test_leading_trailing_spaces():
    assert reverse_words("  hello world  ") == "world hello"


def test_multiple_spaces():
    assert reverse_words("a   good   example") == "example good a"


def test_single_word():
    assert reverse_words("hello") == "hello"


def test_single_word_with_spaces():
    assert reverse_words("   spaces   ") == "spaces"


def test_two_words():
    assert reverse_words("foo bar") == "bar foo"


def test_three_words():
    assert reverse_words("one two three") == "three two one"


def test_longer_sentence():
    assert reverse_words("let us practice") == "practice us let"


def test_leading_spaces_only():
    assert reverse_words("   word") == "word"


def test_trailing_spaces_only():
    assert reverse_words("word   ") == "word"


if __name__ == "__main__":
    test_the_sky_is_blue()
    test_leading_trailing_spaces()
    test_multiple_spaces()
    test_single_word()
    test_single_word_with_spaces()
    test_two_words()
    test_three_words()
    test_longer_sentence()
    test_leading_spaces_only()
    test_trailing_spaces_only()
    print("All tests passed!")
