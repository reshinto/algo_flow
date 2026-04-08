import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

integer_to_roman = importlib.import_module("integer-to-roman").integer_to_roman


def test_converts_1994_to_mcmxciv():
    assert integer_to_roman(1994) == "MCMXCIV"


def test_converts_3_to_iii():
    assert integer_to_roman(3) == "III"


def test_converts_58_to_lviii():
    assert integer_to_roman(58) == "LVIII"


def test_converts_1_to_i():
    assert integer_to_roman(1) == "I"


def test_converts_3999_to_mmmcmxcix():
    assert integer_to_roman(3999) == "MMMCMXCIX"


def test_converts_9_to_ix():
    assert integer_to_roman(9) == "IX"


def test_converts_40_to_xl():
    assert integer_to_roman(40) == "XL"


def test_converts_1000_to_m():
    assert integer_to_roman(1000) == "M"


if __name__ == "__main__":
    test_converts_1994_to_mcmxciv()
    test_converts_3_to_iii()
    test_converts_58_to_lviii()
    test_converts_1_to_i()
    test_converts_3999_to_mmmcmxcix()
    test_converts_9_to_ix()
    test_converts_40_to_xl()
    test_converts_1000_to_m()
    print("All tests passed!")
