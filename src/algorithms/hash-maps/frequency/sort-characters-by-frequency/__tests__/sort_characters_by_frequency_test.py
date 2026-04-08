import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

sort_characters_by_frequency = importlib.import_module("sort-characters-by-frequency").sort_characters_by_frequency


def test_sorts_tree_so_e_appears_first():
    result = sort_characters_by_frequency("tree")
    assert result[:2] == "ee"
    assert len(result) == 4
    assert "t" in result
    assert "r" in result


def test_handles_string_where_one_char_dominates():
    result = sort_characters_by_frequency("aabb")
    assert result[:2] in ("aa", "bb")
    assert len(result) == 4


def test_returns_single_char_unchanged():
    assert sort_characters_by_frequency("z") == "z"


def test_places_most_frequent_char_first_in_cccaab():
    result = sort_characters_by_frequency("cccaab")
    assert result[:3] == "ccc"
    assert len(result) == 6


def test_handles_all_identical_characters():
    assert sort_characters_by_frequency("aaaa") == "aaaa"


def test_handles_two_char_equal_frequency():
    result = sort_characters_by_frequency("ab")
    assert len(result) == 2
    assert "a" in result
    assert "b" in result


def test_handles_digits_as_characters():
    result = sort_characters_by_frequency("2211")
    assert result[:2] in ("22", "11")
    assert len(result) == 4


def test_preserves_all_characters_in_output():
    text = "mississippi"
    result = sort_characters_by_frequency(text)
    assert len(result) == len(text)
    assert sorted(result) == sorted(text)


if __name__ == "__main__":
    test_sorts_tree_so_e_appears_first()
    test_handles_string_where_one_char_dominates()
    test_returns_single_char_unchanged()
    test_places_most_frequent_char_first_in_cccaab()
    test_handles_all_identical_characters()
    test_handles_two_char_equal_frequency()
    test_handles_digits_as_characters()
    test_preserves_all_characters_in_output()
    print("All tests passed!")
