import importlib
import sys
import os
import re

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("huffman-coding-tree")
huffman_coding_tree = module.huffman_coding_tree

DEFAULT_FREQS = [
    {"char": "a", "freq": 5},
    {"char": "b", "freq": 9},
    {"char": "c", "freq": 12},
    {"char": "d", "freq": 13},
    {"char": "e", "freq": 16},
    {"char": "f", "freq": 45},
]


def test_produces_encodings_for_all_characters():
    result = huffman_coding_tree(DEFAULT_FREQS)
    for item in DEFAULT_FREQS:
        assert item["char"] in result
        assert isinstance(result[item["char"]], str)


def test_produces_valid_binary_strings():
    result = huffman_coding_tree(DEFAULT_FREQS)
    for encoding in result.values():
        assert re.fullmatch(r"[01]+", encoding), f"Invalid encoding: {encoding}"


def test_most_frequent_gets_shortest_code():
    result = huffman_coding_tree(DEFAULT_FREQS)
    f_len = len(result["f"])
    other_lengths = [len(enc) for char, enc in result.items() if char != "f"]
    assert f_len <= min(other_lengths)


def test_all_codes_prefix_free():
    result = huffman_coding_tree(DEFAULT_FREQS)
    codes = list(result.values())
    for idx_a, code_a in enumerate(codes):
        for idx_b, code_b in enumerate(codes):
            if idx_a != idx_b:
                assert not (code_a.startswith(code_b) and code_a != code_b), \
                    f"Code {code_a!r} is a prefix of {code_b!r}"


def test_handles_single_character():
    result = huffman_coding_tree([{"char": "x", "freq": 10}])
    assert result["x"] == "0"


if __name__ == "__main__":
    test_produces_encodings_for_all_characters()
    test_produces_valid_binary_strings()
    test_most_frequent_gets_shortest_code()
    test_all_codes_prefix_free()
    test_handles_single_character()
    print("All tests passed!")
