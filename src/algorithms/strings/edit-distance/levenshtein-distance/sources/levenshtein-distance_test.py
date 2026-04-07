"""Correctness tests for the levenshtein_distance function."""

import importlib

module = importlib.import_module("levenshtein-distance")
levenshtein_distance = module.levenshtein_distance


def test_kitten_to_sitting():
    assert levenshtein_distance("kitten", "sitting") == 3


def test_source_empty():
    assert levenshtein_distance("", "abc") == 3


def test_target_empty():
    assert levenshtein_distance("abc", "") == 3


def test_identical_strings():
    assert levenshtein_distance("abc", "abc") == 0


def test_two_empty_strings():
    assert levenshtein_distance("", "") == 0


def test_single_insertion():
    assert levenshtein_distance("cat", "cats") == 1


def test_single_deletion():
    assert levenshtein_distance("cats", "cat") == 1


def test_single_replacement():
    assert levenshtein_distance("cat", "bat") == 1


def test_completely_different():
    assert levenshtein_distance("abc", "xyz") == 3


def test_sunday_to_saturday():
    assert levenshtein_distance("sunday", "saturday") == 3


def test_single_char_match():
    assert levenshtein_distance("a", "a") == 0


def test_single_char_differ():
    assert levenshtein_distance("a", "b") == 1


def test_repeated_characters():
    assert levenshtein_distance("aaa", "aa") == 1


if __name__ == "__main__":
    test_kitten_to_sitting()
    test_source_empty()
    test_target_empty()
    test_identical_strings()
    test_two_empty_strings()
    test_single_insertion()
    test_single_deletion()
    test_single_replacement()
    test_completely_different()
    test_sunday_to_saturday()
    test_single_char_match()
    test_single_char_differ()
    test_repeated_characters()
    print("All tests passed!")
