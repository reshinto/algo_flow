"""Correctness tests for the longest_common_prefix function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("longest-common-prefix")
longest_common_prefix = module.longest_common_prefix


def test_flower_flow_flight():
    assert longest_common_prefix(["flower", "flow", "flight"]) == "fl"


def test_no_common_prefix():
    assert longest_common_prefix(["dog", "racecar", "car"]) == ""


def test_single_empty_string():
    assert longest_common_prefix([""]) == ""


def test_single_element():
    assert longest_common_prefix(["hello"]) == "hello"


def test_empty_array():
    assert longest_common_prefix([]) == ""


def test_one_empty_string():
    assert longest_common_prefix(["abc", ""]) == ""


def test_all_identical():
    assert longest_common_prefix(["abc", "abc", "abc"]) == "abc"


def test_prefix_is_shortest():
    assert longest_common_prefix(["ab", "abc", "abcd"]) == "ab"


def test_a_ab():
    assert longest_common_prefix(["ab", "a"]) == "a"


def test_partial_overlap():
    assert longest_common_prefix(["interview", "internal"]) == "inter"


if __name__ == "__main__":
    test_flower_flow_flight()
    test_no_common_prefix()
    test_single_empty_string()
    test_single_element()
    test_empty_array()
    test_one_empty_string()
    test_all_identical()
    test_prefix_is_shortest()
    test_a_ab()
    test_partial_overlap()
    print("All tests passed!")
