"""Correctness tests for the regex_matching function."""

import importlib

module = importlib.import_module("regex-matching")
regex_matching = module.regex_matching


def test_aab_c_star_a_star_b():
    assert regex_matching("aab", "c*a*b") is True


def test_aa_a_false():
    assert regex_matching("aa", "a") is False


def test_ab_dot_star():
    assert regex_matching("ab", ".*") is True


def test_empty_matches_empty():
    assert regex_matching("", "") is True


def test_aa_a_star():
    assert regex_matching("aa", "a*") is True


def test_aa_dot_star():
    assert regex_matching("aa", ".*") is True


def test_aab_c_star_a_star_false():
    assert regex_matching("aab", "c*a*") is False


def test_mississippi():
    assert regex_matching("mississippi", "mis*is*p*.") is False


def test_ab_dot_star_c_false():
    assert regex_matching("ab", ".*c") is False


def test_a_dot():
    assert regex_matching("a", ".") is True


def test_b_a_false():
    assert regex_matching("b", "a") is False


def test_empty_a_star():
    assert regex_matching("", "a*") is True


def test_aaa_a_star_a():
    assert regex_matching("aaa", "a*a") is True


def test_abc_a_dot_c():
    assert regex_matching("abc", "a.c") is True


if __name__ == "__main__":
    test_aab_c_star_a_star_b()
    test_aa_a_false()
    test_ab_dot_star()
    test_empty_matches_empty()
    test_aa_a_star()
    test_aa_dot_star()
    test_aab_c_star_a_star_false()
    test_mississippi()
    test_ab_dot_star_c_false()
    test_a_dot()
    test_b_a_false()
    test_empty_a_star()
    test_aaa_a_star_a()
    test_abc_a_dot_c()
    print("All tests passed!")
