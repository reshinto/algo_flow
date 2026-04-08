import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

k_closest_points = importlib.import_module("k-closest-points").k_closest_points


def dist_sq(point):
    return point[0] * point[0] + point[1] * point[1]


def test_returns_k_closest():
    points = [[3, 3], [5, -1], [-2, 4], [1, 1], [0, 2], [-1, -1], [4, 0]]
    result = k_closest_points(points, 3)
    assert len(result) == 3, f"Expected 3 points, got {len(result)}"
    all_dists = sorted([dist_sq(p) for p in points])
    third_smallest = all_dists[2]
    for point in result:
        assert dist_sq(point) <= third_smallest, f"Point {point} is not among the 3 closest"


def test_returns_exactly_k():
    points = [[1, 0], [0, 1], [2, 2], [3, 3], [0, 5]]
    result = k_closest_points(points, 2)
    assert len(result) == 2, f"Expected 2 points, got {len(result)}"


def test_k_equals_1():
    points = [[10, 10], [1, 0], [5, 5]]
    result = k_closest_points(points, 1)
    assert len(result) == 1, f"Expected 1 point, got {len(result)}"
    assert dist_sq(result[0]) == 1, f"Expected point with dist^2=1, got {result[0]}"


def test_k_equals_all():
    points = [[1, 2], [3, 4], [0, 1]]
    result = k_closest_points(points, 3)
    assert len(result) == 3, f"Expected 3 points, got {len(result)}"


def test_negative_coordinates():
    points = [[-3, -4], [-1, -1], [0, -2]]
    result = k_closest_points(points, 1)
    assert len(result) == 1, f"Expected 1 point, got {len(result)}"
    assert dist_sq(result[0]) == 2, f"Expected point with dist^2=2, got {result[0]}"


def test_origin_point():
    points = [[0, 0], [1, 1], [2, 2]]
    result = k_closest_points(points, 1)
    assert dist_sq(result[0]) == 0, f"Expected [0,0] at origin, got {result[0]}"


if __name__ == "__main__":
    test_returns_k_closest()
    test_returns_exactly_k()
    test_k_equals_1()
    test_k_equals_all()
    test_negative_coordinates()
    test_origin_point()
    print("All tests passed!")
