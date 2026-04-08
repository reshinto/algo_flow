"""Correctness tests for the jaro_winkler_similarity function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
import math

module = importlib.import_module("jaro-winkler-similarity")
jaro_winkler_similarity = module.jaro_winkler_similarity


def test_martha_marhta():
    assert abs(jaro_winkler_similarity("martha", "marhta") - 0.9611) < 0.0001


def test_identical_strings():
    assert jaro_winkler_similarity("abc", "abc") == 1.0


def test_two_empty_strings():
    assert jaro_winkler_similarity("", "") == 1.0


def test_source_empty():
    assert jaro_winkler_similarity("", "abc") == 0.0


def test_target_empty():
    assert jaro_winkler_similarity("abc", "") == 0.0


def test_completely_different():
    assert jaro_winkler_similarity("abc", "xyz") == 0.0


def test_crate_trace():
    score = jaro_winkler_similarity("CRATE", "TRACE")
    assert 0.7 < score < 0.8


def test_dwayne_duane():
    score = jaro_winkler_similarity("DwAyNE", "DuANE")
    assert score >= 0.84


def test_identical_single_chars():
    assert jaro_winkler_similarity("a", "a") == 1.0


def test_value_in_range():
    score = jaro_winkler_similarity("algorithm", "logarithm")
    assert 0.0 <= score <= 1.0


def test_symmetric():
    forward = jaro_winkler_similarity("martha", "marhta")
    backward = jaro_winkler_similarity("marhta", "martha")
    assert forward == backward


def test_prefix_bonus():
    with_prefix = jaro_winkler_similarity("JOHNSON", "JHNSON")
    without_prefix = jaro_winkler_similarity("AOHNSON", "JHNSON")
    assert with_prefix > without_prefix


def test_prefix_capped_at_four():
    four_prefix_score = jaro_winkler_similarity("abcdefgh", "abcdXXXX")
    three_prefix_score = jaro_winkler_similarity("abcXefgh", "abcdXXXX")
    assert four_prefix_score > three_prefix_score


if __name__ == "__main__":
    test_martha_marhta()
    test_identical_strings()
    test_two_empty_strings()
    test_source_empty()
    test_target_empty()
    test_completely_different()
    test_crate_trace()
    test_dwayne_duane()
    test_identical_single_chars()
    test_value_in_range()
    test_symmetric()
    test_prefix_bonus()
    test_prefix_capped_at_four()
    print("All tests passed!")
