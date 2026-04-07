"""Correctness tests for the z_algorithm function."""

import importlib

module = importlib.import_module("z-algorithm")
z_algorithm = module.z_algorithm


def test_pattern_at_start():
    assert z_algorithm("ABCDEF", "ABC") == 0


def test_pattern_in_middle():
    assert z_algorithm("AABXAABXCAABXAABXAY", "AABXAAB") == 0


def test_pattern_near_end():
    assert z_algorithm("XYZAABXAAB", "AABXAAB") == 3


def test_pattern_at_end():
    assert z_algorithm("XYZABC", "ABC") == 3


def test_pattern_not_found():
    assert z_algorithm("ABCDEFG", "XYZ") == -1


def test_single_char_found():
    assert z_algorithm("HELLO", "L") == 2


def test_single_char_not_found():
    assert z_algorithm("HELLO", "Z") == -1


def test_empty_pattern():
    assert z_algorithm("HELLO", "") == 0


def test_text_equals_pattern():
    assert z_algorithm("ABCD", "ABCD") == 0


def test_pattern_longer_than_text():
    assert z_algorithm("AB", "ABCD") == -1


def test_repeated_characters():
    assert z_algorithm("AAAAAB", "AAAB") == 2


def test_first_of_multiple():
    assert z_algorithm("ABABABAB", "ABAB") == 0


if __name__ == "__main__":
    test_pattern_at_start()
    test_pattern_in_middle()
    test_pattern_near_end()
    test_pattern_at_end()
    test_pattern_not_found()
    test_single_char_found()
    test_single_char_not_found()
    test_empty_pattern()
    test_text_equals_pattern()
    test_pattern_longer_than_text()
    test_repeated_characters()
    test_first_of_multiple()
    print("All tests passed!")
