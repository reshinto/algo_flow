import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

roman_to_integer = importlib.import_module("roman-to-integer").roman_to_integer


def test_converts_mcmxciv_to_1994():
    assert roman_to_integer("MCMXCIV") == 1994


def test_converts_iii_to_3():
    assert roman_to_integer("III") == 3


def test_converts_iv_to_4():
    assert roman_to_integer("IV") == 4


def test_converts_ix_to_9():
    assert roman_to_integer("IX") == 9


def test_converts_lviii_to_58():
    assert roman_to_integer("LVIII") == 58


def test_converts_m_to_1000():
    assert roman_to_integer("M") == 1000


def test_converts_mmmdccxlix_to_3749():
    assert roman_to_integer("MMMDCCXLIX") == 3749


def test_converts_xl_to_40():
    assert roman_to_integer("XL") == 40


def test_converts_cd_to_400():
    assert roman_to_integer("CD") == 400


def test_converts_mmmcmxcix_to_3999():
    assert roman_to_integer("MMMCMXCIX") == 3999


if __name__ == "__main__":
    test_converts_mcmxciv_to_1994()
    test_converts_iii_to_3()
    test_converts_iv_to_4()
    test_converts_ix_to_9()
    test_converts_lviii_to_58()
    test_converts_m_to_1000()
    test_converts_mmmdccxlix_to_3749()
    test_converts_xl_to_40()
    test_converts_cd_to_400()
    test_converts_mmmcmxcix_to_3999()
    print("All tests passed!")
