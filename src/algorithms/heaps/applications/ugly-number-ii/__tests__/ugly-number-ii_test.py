import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

ugly_number_ii = importlib.import_module("ugly-number-ii").ugly_number_ii

UGLY_SEQUENCE = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24]


def test_n10():
    assert ugly_number_ii(10) == 12


def test_n1():
    assert ugly_number_ii(1) == 1


def test_n2():
    assert ugly_number_ii(2) == 2


def test_n6():
    assert ugly_number_ii(6) == 6


def test_n15():
    assert ugly_number_ii(15) == 24


def test_known_sequence():
    for position in range(1, len(UGLY_SEQUENCE) + 1):
        expected = UGLY_SEQUENCE[position - 1]
        result = ugly_number_ii(position)
        assert result == expected, f"Position {position}: expected {expected}, got {result}"


def test_only_prime_factors_2_3_5():
    result = ugly_number_ii(10)
    remaining = result
    for factor in [2, 3, 5]:
        while remaining % factor == 0:
            remaining //= factor
    assert remaining == 1, f"Result {result} has prime factors other than 2, 3, 5"


if __name__ == "__main__":
    test_n10()
    test_n1()
    test_n2()
    test_n6()
    test_n15()
    test_known_sequence()
    test_only_prime_factors_2_3_5()
    print("All tests passed!")
