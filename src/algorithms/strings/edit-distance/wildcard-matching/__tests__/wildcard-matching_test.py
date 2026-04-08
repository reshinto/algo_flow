"""Correctness tests for the wildcard_matching function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("wildcard-matching")
wildcard_matching = module.wildcard_matching


def test_adceb_star_a_star_b():
    assert wildcard_matching("adceb", "*a*b") is True


def test_aa_a_false():
    assert wildcard_matching("aa", "a") is False


def test_aa_star():
    assert wildcard_matching("aa", "*") is True


def test_empty_matches_empty():
    assert wildcard_matching("", "") is True


def test_abc_a_question_c():
    assert wildcard_matching("abc", "a?c") is True


def test_abc_a_question_b_false():
    assert wildcard_matching("abc", "a?b") is False


def test_any_string_star():
    assert wildcard_matching("anylongstring", "*") is True


def test_empty_triple_star():
    assert wildcard_matching("", "***") is True


def test_cb_question_a_false():
    assert wildcard_matching("cb", "?a") is False


def test_adceb_star_a_star():
    assert wildcard_matching("adceb", "*a*") is True


def test_empty_a_false():
    assert wildcard_matching("", "a") is False


def test_abc_star_bc():
    assert wildcard_matching("abc", "*bc") is True


def test_abc_abc():
    assert wildcard_matching("abc", "abc") is True


def test_abc_abcd_false():
    assert wildcard_matching("abc", "abcd") is False


def test_single_char_question():
    assert wildcard_matching("a", "?") is True


if __name__ == "__main__":
    test_adceb_star_a_star_b()
    test_aa_a_false()
    test_aa_star()
    test_empty_matches_empty()
    test_abc_a_question_c()
    test_abc_a_question_b_false()
    test_any_string_star()
    test_empty_triple_star()
    test_cb_question_a_false()
    test_adceb_star_a_star()
    test_empty_a_false()
    test_abc_star_bc()
    test_abc_abc()
    test_abc_abcd_false()
    test_single_char_question()
    print("All tests passed!")
