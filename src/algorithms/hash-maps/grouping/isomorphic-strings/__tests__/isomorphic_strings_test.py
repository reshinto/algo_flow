import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

isomorphic_strings = importlib.import_module("isomorphic-strings").isomorphic_strings


def test_returns_true_for_egg_add():
    assert isomorphic_strings("egg", "add") is True


def test_returns_false_for_foo_bar():
    assert isomorphic_strings("foo", "bar") is False


def test_returns_true_for_paper_title():
    assert isomorphic_strings("paper", "title") is True


def test_returns_false_for_different_lengths():
    assert isomorphic_strings("ab", "abc") is False


def test_returns_true_for_empty_strings():
    assert isomorphic_strings("", "") is True


def test_returns_true_for_single_character_strings():
    assert isomorphic_strings("a", "b") is True


def test_returns_false_for_badc_baba():
    assert isomorphic_strings("badc", "baba") is False


def test_returns_true_for_identical_strings():
    assert isomorphic_strings("abc", "abc") is True


if __name__ == "__main__":
    test_returns_true_for_egg_add()
    test_returns_false_for_foo_bar()
    test_returns_true_for_paper_title()
    test_returns_false_for_different_lengths()
    test_returns_true_for_empty_strings()
    test_returns_true_for_single_character_strings()
    test_returns_false_for_badc_baba()
    test_returns_true_for_identical_strings()
    print("All tests passed!")
