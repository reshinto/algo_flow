import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("trapping-rain-water")
trapping_rain_water = module.trapping_rain_water


def test_classic_example():
    result = trapping_rain_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
    assert result["total_water"] == 6


def test_empty_array():
    result = trapping_rain_water([])
    assert result["total_water"] == 0
    assert result["water_per_index"] == []


def test_increasing_no_water():
    result = trapping_rain_water([1, 2, 3, 4, 5])
    assert result["total_water"] == 0


def test_decreasing_no_water():
    result = trapping_rain_water([5, 4, 3, 2, 1])
    assert result["total_water"] == 0


def test_simple_valley():
    result = trapping_rain_water([3, 0, 3])
    assert result["total_water"] == 3
    assert result["water_per_index"][1] == 3


def test_asymmetric_walls():
    result = trapping_rain_water([3, 0, 1])
    assert result["total_water"] == 1


def test_all_zeros():
    result = trapping_rain_water([0, 0, 0])
    assert result["total_water"] == 0


def test_single_element():
    result = trapping_rain_water([5])
    assert result["total_water"] == 0


def test_per_index_water():
    result = trapping_rain_water([0, 1, 0, 2])
    assert result["water_per_index"][2] == 1
    assert result["total_water"] == 1


def test_multiple_valleys():
    result = trapping_rain_water([4, 2, 0, 3, 2, 5])
    assert result["total_water"] == 9


if __name__ == "__main__":
    test_classic_example()
    test_empty_array()
    test_increasing_no_water()
    test_decreasing_no_water()
    test_simple_valley()
    test_asymmetric_walls()
    test_all_zeros()
    test_single_element()
    test_per_index_water()
    test_multiple_valleys()
    print("All tests passed!")
