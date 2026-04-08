import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

sqrt_binary_search_module = importlib.import_module("sqrt-binary-search")
sqrt_binary_search = sqrt_binary_search_module.sqrt_binary_search


def test_computes_exact_square_root_of_perfect_square():
    assert sqrt_binary_search(49) == 7


def test_computes_floor_square_root_of_non_perfect_square():
    assert sqrt_binary_search(8) == 2


def test_returns_zero_for_input_zero():
    assert sqrt_binary_search(0) == 0


def test_returns_one_for_input_one():
    assert sqrt_binary_search(1) == 1


def test_computes_sqrt_of_4():
    assert sqrt_binary_search(4) == 2


def test_computes_sqrt_of_9():
    assert sqrt_binary_search(9) == 3


def test_computes_sqrt_of_16():
    assert sqrt_binary_search(16) == 4


def test_computes_floor_sqrt_of_2():
    assert sqrt_binary_search(2) == 1


def test_computes_floor_sqrt_of_3():
    assert sqrt_binary_search(3) == 1


def test_computes_sqrt_of_100():
    assert sqrt_binary_search(100) == 10


def test_computes_floor_sqrt_of_99():
    assert sqrt_binary_search(99) == 9


def test_computes_sqrt_of_144():
    assert sqrt_binary_search(144) == 12


def test_computes_floor_sqrt_of_10():
    assert sqrt_binary_search(10) == 3


if __name__ == "__main__":
    test_computes_exact_square_root_of_perfect_square()
    test_computes_floor_square_root_of_non_perfect_square()
    test_returns_zero_for_input_zero()
    test_returns_one_for_input_one()
    test_computes_sqrt_of_4()
    test_computes_sqrt_of_9()
    test_computes_sqrt_of_16()
    test_computes_floor_sqrt_of_2()
    test_computes_floor_sqrt_of_3()
    test_computes_sqrt_of_100()
    test_computes_floor_sqrt_of_99()
    test_computes_sqrt_of_144()
    test_computes_floor_sqrt_of_10()
    print("All tests passed!")
