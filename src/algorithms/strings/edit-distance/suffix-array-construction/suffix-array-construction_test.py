"""Correctness tests for the suffix_array_construction function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("suffix-array-construction")
suffix_array_construction = module.suffix_array_construction


def test_banana():
    assert suffix_array_construction("banana") == [5, 3, 1, 0, 4, 2]


def test_single_char():
    assert suffix_array_construction("a") == [0]


def test_empty_string():
    assert suffix_array_construction("") == []


def test_ab():
    assert suffix_array_construction("ab") == [0, 1]


def test_ba():
    assert suffix_array_construction("ba") == [1, 0]


def test_aaa():
    assert suffix_array_construction("aaa") == [2, 1, 0]


def test_mississippi():
    assert suffix_array_construction("mississippi") == [10, 7, 4, 1, 0, 9, 8, 6, 3, 5, 2]


def test_length_equals_input():
    result = suffix_array_construction("hello")
    assert len(result) == 5


def test_is_permutation():
    text = "abracadabra"
    result = suffix_array_construction(text)
    assert sorted(result) == list(range(len(text)))


def test_abab():
    assert suffix_array_construction("abab") == [2, 0, 3, 1]


def test_sorted_suffixes():
    text = "banana"
    suffix_array = suffix_array_construction(text)
    for rank_idx in range(len(suffix_array) - 1):
        current_suffix = text[suffix_array[rank_idx]:]
        next_suffix = text[suffix_array[rank_idx + 1]:]
        assert current_suffix <= next_suffix


if __name__ == "__main__":
    test_banana()
    test_single_char()
    test_empty_string()
    test_ab()
    test_ba()
    test_aaa()
    test_mississippi()
    test_length_equals_input()
    test_is_permutation()
    test_abab()
    test_sorted_suffixes()
    print("All tests passed!")
