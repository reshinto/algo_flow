import importlib

module = importlib.import_module("container-with-most-water")
container_with_most_water = module.container_with_most_water


def test_default_input():
    result = container_with_most_water([1, 8, 6, 2, 5, 4, 8, 3, 7])
    assert result["max_area"] == 49


def test_two_equal_bars():
    result = container_with_most_water([1, 1])
    assert result["max_area"] == 1


def test_all_equal_bars():
    result = container_with_most_water([5, 5, 5, 5])
    assert result["max_area"] == 15


def test_single_element():
    result = container_with_most_water([7])
    assert result["max_area"] == 0


def test_empty_array():
    result = container_with_most_water([])
    assert result["max_area"] == 0


def test_monotonically_increasing():
    result = container_with_most_water([1, 2, 3, 4, 5])
    assert result["max_area"] == 6


def test_monotonically_decreasing():
    result = container_with_most_water([5, 4, 3, 2, 1])
    assert result["max_area"] == 6


def test_area_at_indices_matches_max():
    heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    result = container_with_most_water(heights)
    computed_area = min(heights[result["left_index"]], heights[result["right_index"]]) * (result["right_index"] - result["left_index"])
    assert computed_area == result["max_area"]


if __name__ == "__main__":
    test_default_input()
    test_two_equal_bars()
    test_all_equal_bars()
    test_single_element()
    test_empty_array()
    test_monotonically_increasing()
    test_monotonically_decreasing()
    test_area_at_indices_matches_max()
    print("All tests passed!")
