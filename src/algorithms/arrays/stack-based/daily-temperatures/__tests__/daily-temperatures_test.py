import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("daily-temperatures")
daily_temperatures = module.daily_temperatures


def test_default_input():
    result = daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])
    assert result == [1, 1, 4, 2, 1, 1, 0, 0]


def test_strictly_decreasing():
    result = daily_temperatures([5, 4, 3, 2, 1])
    assert result == [0, 0, 0, 0, 0]


def test_strictly_increasing():
    result = daily_temperatures([1, 2, 3, 4, 5])
    assert result == [1, 1, 1, 1, 0]


def test_all_equal():
    result = daily_temperatures([5, 5, 5, 5])
    assert result == [0, 0, 0, 0]


def test_single_day():
    result = daily_temperatures([72])
    assert result == [0]


def test_empty_array():
    result = daily_temperatures([])
    assert result == []


def test_two_days_second_warmer():
    result = daily_temperatures([60, 70])
    assert result == [1, 0]


def test_two_days_second_cooler():
    result = daily_temperatures([70, 60])
    assert result == [0, 0]


def test_increasing_sequence():
    result = daily_temperatures([30, 40, 50, 60])
    assert result == [1, 1, 1, 0]


def test_short_increasing_sequence():
    result = daily_temperatures([30, 60, 90])
    assert result == [1, 1, 0]


if __name__ == "__main__":
    test_default_input()
    test_strictly_decreasing()
    test_strictly_increasing()
    test_all_equal()
    test_single_day()
    test_empty_array()
    test_two_days_second_warmer()
    test_two_days_second_cooler()
    test_increasing_sequence()
    test_short_increasing_sequence()
    print("All tests passed!")
