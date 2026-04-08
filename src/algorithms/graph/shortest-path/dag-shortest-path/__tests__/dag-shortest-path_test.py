import importlib
import sys
import os
import math

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("dag-shortest-path")
dag_shortest_path = module.dag_shortest_path


def test_computes_shortest_distances_in_simple_dag():
    adj = {
        "A": [("B", 2), ("C", 6)],
        "B": [("D", 1), ("E", 4)],
        "C": [("E", 2)],
        "D": [("F", 5)],
        "E": [("F", 1)],
        "F": [],
    }
    distances = dag_shortest_path(adj, "A", ["A", "B", "C", "D", "E", "F"])
    assert distances["A"] == 0
    assert distances["B"] == 2
    assert distances["C"] == 6
    assert distances["D"] == 3
    assert distances["E"] == 6
    assert distances["F"] == 7


def test_returns_zero_distance_for_start_node():
    adj = {"Start": [("End", 5)], "End": []}
    distances = dag_shortest_path(adj, "Start", ["Start", "End"])
    assert distances["Start"] == 0


def test_returns_infinity_for_unreachable_nodes():
    adj = {"A": [("B", 3)], "B": [], "C": [("D", 2)], "D": []}
    distances = dag_shortest_path(adj, "A", ["A", "B", "C", "D"])
    assert distances["A"] == 0
    assert distances["B"] == 3
    assert math.isinf(distances["C"])
    assert math.isinf(distances["D"])


def test_handles_single_node_graph():
    adj = {"A": []}
    distances = dag_shortest_path(adj, "A", ["A"])
    assert distances["A"] == 0


def test_handles_linear_chain_correctly():
    adj = {"A": [("B", 3)], "B": [("C", 4)], "C": [("D", 2)], "D": []}
    distances = dag_shortest_path(adj, "A", ["A", "B", "C", "D"])
    assert distances["B"] == 3
    assert distances["C"] == 7
    assert distances["D"] == 9


def test_handles_negative_edge_weights_correctly():
    adj = {"A": [("B", 2), ("C", 4)], "B": [("C", -3)], "C": []}
    distances = dag_shortest_path(adj, "A", ["A", "B", "C"])
    assert distances["A"] == 0
    assert distances["B"] == 2
    assert distances["C"] == -1


def test_selects_shorter_of_two_converging_paths():
    adj = {"A": [("B", 1), ("C", 10)], "B": [("D", 2)], "C": [("D", 1)], "D": []}
    distances = dag_shortest_path(adj, "A", ["A", "B", "C", "D"])
    assert distances["D"] == 3


def test_handles_multiple_source_adjacent_nodes():
    adj = {
        "S": [("X", 1), ("Y", 4), ("Z", 2)],
        "X": [("T", 5)],
        "Y": [("T", 1)],
        "Z": [("T", 3)],
        "T": [],
    }
    distances = dag_shortest_path(adj, "S", ["S", "X", "Y", "Z", "T"])
    assert distances["T"] == 5


if __name__ == "__main__":
    test_computes_shortest_distances_in_simple_dag()
    test_returns_zero_distance_for_start_node()
    test_returns_infinity_for_unreachable_nodes()
    test_handles_single_node_graph()
    test_handles_linear_chain_correctly()
    test_handles_negative_edge_weights_correctly()
    test_selects_shorter_of_two_converging_paths()
    test_handles_multiple_source_adjacent_nodes()
    print("All tests passed!")
