import importlib
import sys
import os
import math

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bellman-ford")
bellman_ford = module.bellman_ford


def test_computes_shortest_distances_with_positive_weights():
    adj = {
        "A": [("B", 4), ("C", 2)],
        "B": [("D", 5)],
        "C": [("B", 1), ("D", 8)],
        "D": [],
    }
    distances = bellman_ford(adj, "A", ["A", "B", "C", "D"])
    assert distances["A"] == 0
    assert distances["C"] == 2
    assert distances["B"] == 3
    assert distances["D"] == 8


def test_handles_graph_with_negative_edge_weight():
    adj = {
        "A": [("B", 6), ("C", 7)],
        "B": [("D", 5), ("E", -4)],
        "C": [("D", -3)],
        "D": [("B", -2)],
        "E": [("D", 7)],
    }
    distances = bellman_ford(adj, "A", ["A", "B", "C", "D", "E"])
    assert distances["A"] == 0
    assert isinstance(distances["B"], (int, float))
    assert distances["C"] == 7


def test_returns_zero_for_start_node():
    adj = {"X": [("Y", 3)], "Y": []}
    distances = bellman_ford(adj, "X", ["X", "Y"])
    assert distances["X"] == 0


def test_returns_infinity_for_unreachable_nodes():
    adj = {"A": [("B", 1)], "B": [], "C": []}
    distances = bellman_ford(adj, "A", ["A", "B", "C"])
    assert math.isinf(distances["C"])


def test_handles_single_node_graph():
    adj = {"A": []}
    distances = bellman_ford(adj, "A", ["A"])
    assert distances["A"] == 0


def test_handles_linear_chain_with_mixed_weights():
    adj = {"A": [("B", 3)], "B": [("C", -1)], "C": [("D", 4)], "D": []}
    distances = bellman_ford(adj, "A", ["A", "B", "C", "D"])
    assert distances["B"] == 3
    assert distances["C"] == 2
    assert distances["D"] == 6


def test_marks_nodes_reachable_via_negative_cycle_as_negative_infinity():
    adj = {"A": [("B", 1)], "B": [("C", -3)], "C": [("B", 1)], "D": []}
    distances = bellman_ford(adj, "A", ["A", "B", "C", "D"])
    assert math.isinf(distances["B"]) and distances["B"] < 0


if __name__ == "__main__":
    test_computes_shortest_distances_with_positive_weights()
    test_handles_graph_with_negative_edge_weight()
    test_returns_zero_for_start_node()
    test_returns_infinity_for_unreachable_nodes()
    test_handles_single_node_graph()
    test_handles_linear_chain_with_mixed_weights()
    test_marks_nodes_reachable_via_negative_cycle_as_negative_infinity()
    print("All tests passed!")
