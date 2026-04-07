import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("a-star")
a_star_search = module.a_star_search


def test_finds_shortest_path_in_simple_weighted_graph():
    adjacency_list = {
        "A": [("B", 4), ("C", 2)],
        "B": [("D", 5)],
        "C": [("B", 1)],
        "D": [],
    }
    heuristic = {"A": 10, "B": 5, "C": 7, "D": 0}
    result = a_star_search(adjacency_list, "A", "D", heuristic)
    assert result is not None
    assert result[0] == "A"
    assert result[-1] == "D"


def test_returns_single_element_path_when_start_equals_target():
    adjacency_list = {"A": [("B", 3)], "B": []}
    heuristic = {"A": 0, "B": 0}
    result = a_star_search(adjacency_list, "A", "A", heuristic)
    assert result == ["A"]


def test_returns_none_when_no_path_exists_to_target():
    adjacency_list = {"A": [("B", 1)], "B": [], "C": []}
    heuristic = {"A": 5, "B": 3, "C": 0}
    result = a_star_search(adjacency_list, "A", "C", heuristic)
    assert result is None


def test_finds_path_with_lower_total_cost_when_multiple_paths_exist():
    adjacency_list = {
        "A": [("B", 10), ("C", 1)],
        "B": [("D", 1)],
        "C": [("B", 1), ("D", 5)],
        "D": [],
    }
    heuristic = {"A": 10, "B": 5, "C": 8, "D": 0}
    result = a_star_search(adjacency_list, "A", "D", heuristic)
    assert result is not None
    assert result[0] == "A"
    assert result[-1] == "D"
    assert len(result) >= 3


def test_handles_two_node_graph_correctly():
    adjacency_list = {"Start": [("End", 7)], "End": []}
    heuristic = {"Start": 7, "End": 0}
    result = a_star_search(adjacency_list, "Start", "End", heuristic)
    assert result == ["Start", "End"]


def test_finds_path_through_6_node_graph():
    adjacency_list = {
        "A": [("B", 4), ("C", 2)],
        "B": [("D", 5)],
        "C": [("B", 1), ("E", 10)],
        "D": [("F", 2)],
        "E": [("F", 3)],
        "F": [],
    }
    heuristic = {"A": 20, "B": 10, "C": 12, "D": 5, "E": 8, "F": 0}
    result = a_star_search(adjacency_list, "A", "F", heuristic)
    assert result is not None
    assert result[0] == "A"
    assert result[-1] == "F"


def test_correctly_prefers_heuristic_guided_path():
    adjacency_list = {
        "A": [("B", 1), ("C", 3)],
        "B": [("D", 10)],
        "C": [("D", 1)],
        "D": [],
    }
    heuristic = {"A": 4, "B": 10, "C": 1, "D": 0}
    result = a_star_search(adjacency_list, "A", "D", heuristic)
    assert result == ["A", "C", "D"]


if __name__ == "__main__":
    test_finds_shortest_path_in_simple_weighted_graph()
    test_returns_single_element_path_when_start_equals_target()
    test_returns_none_when_no_path_exists_to_target()
    test_finds_path_with_lower_total_cost_when_multiple_paths_exist()
    test_handles_two_node_graph_correctly()
    test_finds_path_through_6_node_graph()
    test_correctly_prefers_heuristic_guided_path()
    print("All tests passed!")
