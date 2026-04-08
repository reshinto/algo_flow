import importlib
import sys
import os
import math

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("dijkstra")
dijkstra_shortest_path = module.dijkstra_shortest_path


def test_computes_shortest_distances_in_simple_weighted_graph():
    adj = {
        "A": [("B", 4), ("C", 2)],
        "B": [("D", 5)],
        "C": [("B", 1), ("D", 8)],
        "D": [],
    }
    distances = dijkstra_shortest_path(adj, "A")
    assert distances["A"] == 0
    assert distances["B"] == 3
    assert distances["C"] == 2
    assert distances["D"] == 8


def test_returns_zero_distance_for_start_node():
    adj = {"X": [("Y", 10)], "Y": []}
    distances = dijkstra_shortest_path(adj, "X")
    assert distances["X"] == 0


def test_returns_infinity_for_unreachable_nodes():
    adj = {"A": [("B", 1)], "B": [], "C": []}
    distances = dijkstra_shortest_path(adj, "A")
    assert math.isinf(distances["C"])


def test_handles_single_node_graph():
    adj = {"A": []}
    distances = dijkstra_shortest_path(adj, "A")
    assert distances["A"] == 0


def test_finds_shortest_path_through_multiple_hops():
    adj = {
        "A": [("B", 4), ("C", 2)],
        "B": [("D", 5)],
        "C": [("B", 1), ("D", 8), ("E", 10)],
        "D": [("F", 2)],
        "E": [("F", 3)],
        "F": [],
    }
    distances = dijkstra_shortest_path(adj, "A")
    assert distances["A"] == 0
    assert distances["C"] == 2
    assert distances["B"] == 3
    assert distances["D"] == 8
    assert distances["F"] == 10
    assert distances["E"] == 12


def test_uses_lower_weight_path_over_direct_path():
    adj = {
        "A": [("B", 10), ("C", 1)],
        "B": [("D", 1)],
        "C": [("B", 1), ("D", 5)],
        "D": [],
    }
    distances = dijkstra_shortest_path(adj, "A")
    assert distances["D"] == 3


def test_handles_linear_chain_correctly():
    adj = {"A": [("B", 2)], "B": [("C", 3)], "C": [("D", 4)], "D": []}
    distances = dijkstra_shortest_path(adj, "A")
    assert distances["B"] == 2
    assert distances["C"] == 5
    assert distances["D"] == 9


def test_handles_equal_weight_edges():
    adj = {"A": [("B", 1), ("C", 1)], "B": [("D", 1)], "C": [("D", 1)], "D": []}
    distances = dijkstra_shortest_path(adj, "A")
    assert distances["D"] == 2


if __name__ == "__main__":
    test_computes_shortest_distances_in_simple_weighted_graph()
    test_returns_zero_distance_for_start_node()
    test_returns_infinity_for_unreachable_nodes()
    test_handles_single_node_graph()
    test_finds_shortest_path_through_multiple_hops()
    test_uses_lower_weight_path_over_direct_path()
    test_handles_linear_chain_correctly()
    test_handles_equal_weight_edges()
    print("All tests passed!")
