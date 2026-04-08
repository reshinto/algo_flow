import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

floyd_module = importlib.import_module("floyd-cycle-detection")
floyd_cycle_detection = floyd_module.floyd_cycle_detection


def test_default_input():
    result = floyd_cycle_detection([1, 3, 4, 2, 2])
    assert result["has_cycle"] is True, "Expected has_cycle=True"
    assert result["cycle_start"] == 2, f"Expected cycle_start=2, got {result['cycle_start']}"


def test_cycle_start_3():
    result = floyd_cycle_detection([3, 1, 3, 4, 2])
    assert result["has_cycle"] is True, "Expected has_cycle=True"
    assert result["cycle_start"] == 3, f"Expected cycle_start=3, got {result['cycle_start']}"


def test_minimal_cycle():
    result = floyd_cycle_detection([1, 1])
    assert result["has_cycle"] is True, "Expected has_cycle=True"
    assert result["cycle_start"] == 1, f"Expected cycle_start=1, got {result['cycle_start']}"


def test_empty_array():
    result = floyd_cycle_detection([])
    assert result["has_cycle"] is False, "Expected has_cycle=False"
    assert result["cycle_start"] == -1, f"Expected cycle_start=-1, got {result['cycle_start']}"


def test_cycle_start_is_valid_index():
    test_cases = [
        [1, 3, 4, 2, 2],
        [3, 1, 3, 4, 2],
        [1, 1],
    ]
    for test_case in test_cases:
        result = floyd_cycle_detection(test_case)
        assert result["has_cycle"] is True
        assert 0 <= result["cycle_start"] < len(test_case)


if __name__ == "__main__":
    test_default_input()
    test_cycle_start_3()
    test_minimal_cycle()
    test_empty_array()
    test_cycle_start_is_valid_index()
    print("All tests passed!")
