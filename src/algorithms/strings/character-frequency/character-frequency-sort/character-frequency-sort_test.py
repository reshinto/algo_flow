"""Correctness tests for the character_frequency_sort function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
import sys

module = importlib.import_module("character-frequency-sort")
character_frequency_sort = module.character_frequency_sort


def test_empty_string():
    assert character_frequency_sort("") == ""


def test_tree_starts_with_ee():
    result = character_frequency_sort("tree")
    assert result.startswith("ee")
    assert len(result) == 4


def test_cccaaa_grouped_blocks():
    result = character_frequency_sort("cccaaa")
    assert len(result) == 6
    assert result[:3] in ("ccc", "aaa")
    assert result[3:] in ("ccc", "aaa")
    assert result[:3] != result[3:]


def test_aab_starts_with_aa():
    result = character_frequency_sort("aab")
    assert result.startswith("aa")
    assert len(result) == 3


def test_single_character():
    assert character_frequency_sort("z") == "z"


def test_all_same_characters():
    assert character_frequency_sort("aaaa") == "aaaa"


def test_preserves_all_characters():
    input_text = "programming"
    result = character_frequency_sort(input_text)
    assert len(result) == len(input_text)
    for char in set(input_text):
        assert result.count(char) == input_text.count(char)


def test_eeebba_starts_with_eee():
    result = character_frequency_sort("eeebba")
    assert result.startswith("eee")


def test_aabbcc_contiguous_blocks():
    result = character_frequency_sort("aabbcc")
    assert len(result) == 6
    for block_start in range(0, 6, 2):
        assert result[block_start] == result[block_start + 1]


def test_uppercase_lowercase_distinct():
    result = character_frequency_sort("Aabb")
    assert result.startswith("bb")
    assert len(result) == 4


if __name__ == "__main__":
    test_empty_string()
    test_tree_starts_with_ee()
    test_cccaaa_grouped_blocks()
    test_aab_starts_with_aa()
    test_single_character()
    test_all_same_characters()
    test_preserves_all_characters()
    test_eeebba_starts_with_eee()
    test_aabbcc_contiguous_blocks()
    test_uppercase_lowercase_distinct()
    print("All tests passed!")
