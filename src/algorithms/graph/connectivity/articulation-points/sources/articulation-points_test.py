import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
articulation_points_module = importlib.import_module("articulation-points")
find_articulation_points = articulation_points_module.find_articulation_points


def test_finds_two_articulation_points_in_default_7_node_graph():
    adjacency_list = {
        "A": ["B", "C"],
        "B": ["A", "C"],
        "C": ["A", "B", "D"],
        "D": ["C", "E", "F"],
        "E": ["D", "G"],
        "F": ["D", "G"],
        "G": ["E", "F"],
    }
    node_ids = ["A", "B", "C", "D", "E", "F", "G"]
    result = find_articulation_points(adjacency_list, node_ids)
    assert set(result) == {"C", "D"}, f"Expected {{C, D}}, got {set(result)}"


def test_returns_no_articulation_points_for_triangle():
    adjacency_list = {
        "A": ["B", "C"],
        "B": ["A", "C"],
        "C": ["A", "B"],
    }
    result = find_articulation_points(adjacency_list, ["A", "B", "C"])
    assert len(result) == 0, f"Expected empty, got {result}"


def test_finds_single_articulation_point_in_path_graph():
    adjacency_list = {
        "A": ["B"],
        "B": ["A", "C"],
        "C": ["B"],
    }
    result = find_articulation_points(adjacency_list, ["A", "B", "C"])
    assert set(result) == {"B"}, f"Expected {{B}}, got {set(result)}"


def test_finds_multiple_articulation_points_in_longer_path():
    adjacency_list = {
        "A": ["B"],
        "B": ["A", "C"],
        "C": ["B", "D"],
        "D": ["C"],
    }
    result = find_articulation_points(adjacency_list, ["A", "B", "C", "D"])
    assert set(result) == {"B", "C"}, f"Expected {{B, C}}, got {set(result)}"


def test_returns_no_articulation_points_for_single_node():
    result = find_articulation_points({"A": []}, ["A"])
    assert len(result) == 0, f"Expected empty, got {result}"


def test_returns_no_articulation_points_for_fully_connected_graph():
    adjacency_list = {
        "A": ["B", "C", "D"],
        "B": ["A", "C", "D"],
        "C": ["A", "B", "D"],
        "D": ["A", "B", "C"],
    }
    result = find_articulation_points(adjacency_list, ["A", "B", "C", "D"])
    assert len(result) == 0, f"Expected empty, got {result}"


def test_finds_star_center_as_articulation_point():
    adjacency_list = {
        "Center": ["A", "B", "C"],
        "A": ["Center"],
        "B": ["Center"],
        "C": ["Center"],
    }
    result = find_articulation_points(adjacency_list, ["Center", "A", "B", "C"])
    assert set(result) == {"Center"}, f"Expected {{Center}}, got {set(result)}"


def test_handles_disconnected_graphs_with_no_articulation_points():
    adjacency_list = {
        "A": ["B", "C"],
        "B": ["A", "C"],
        "C": ["A", "B"],
        "D": ["E", "F"],
        "E": ["D", "F"],
        "F": ["D", "E"],
    }
    result = find_articulation_points(adjacency_list, ["A", "B", "C", "D", "E", "F"])
    assert len(result) == 0, f"Expected empty, got {result}"


if __name__ == "__main__":
    test_finds_two_articulation_points_in_default_7_node_graph()
    test_returns_no_articulation_points_for_triangle()
    test_finds_single_articulation_point_in_path_graph()
    test_finds_multiple_articulation_points_in_longer_path()
    test_returns_no_articulation_points_for_single_node()
    test_returns_no_articulation_points_for_fully_connected_graph()
    test_finds_star_center_as_articulation_point()
    test_handles_disconnected_graphs_with_no_articulation_points()
    print("All tests passed!")
