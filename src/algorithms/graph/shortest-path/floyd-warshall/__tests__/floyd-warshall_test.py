import importlib
import sys
import os
import math

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("floyd-warshall")
floyd_warshall = module.floyd_warshall


def test_computes_all_pairs_shortest_paths_in_4_node_graph():
    adj = {
        "A": [("B", 3), ("D", -4)],
        "B": [],
        "C": [("B", -5)],
        "D": [("C", 6)],
    }
    distances = floyd_warshall(adj, ["A", "B", "C", "D"])
    assert distances["A"]["A"] == 0
    assert distances["A"]["B"] == -3
    assert distances["A"]["C"] == 2
    assert distances["B"]["B"] == 0


def test_sets_diagonal_entries_to_zero():
    adj = {"X": [("Y", 2)], "Y": [("Z", 3)], "Z": []}
    distances = floyd_warshall(adj, ["X", "Y", "Z"])
    assert distances["X"]["X"] == 0
    assert distances["Y"]["Y"] == 0
    assert distances["Z"]["Z"] == 0


def test_returns_infinity_for_unreachable_node_pairs():
    adj = {"A": [("B", 1)], "B": [], "C": []}
    distances = floyd_warshall(adj, ["A", "B", "C"])
    assert math.isinf(distances["A"]["C"])
    assert math.isinf(distances["C"]["A"])


def test_handles_single_node_graph():
    adj = {"A": []}
    distances = floyd_warshall(adj, ["A"])
    assert distances["A"]["A"] == 0


def test_finds_shorter_indirect_paths_over_direct_edges():
    adj = {"A": [("B", 1), ("C", 10)], "B": [("C", 2)], "C": []}
    distances = floyd_warshall(adj, ["A", "B", "C"])
    assert distances["A"]["C"] == 3


def test_computes_correct_bidirectional_distances():
    adj = {"A": [("B", 4)], "B": [("A", 4), ("C", 3)], "C": [("B", 3)]}
    distances = floyd_warshall(adj, ["A", "B", "C"])
    assert distances["A"]["C"] == 7
    assert distances["C"]["A"] == 7


def test_handles_negative_edge_weights_without_negative_cycles():
    adj = {"A": [("B", 5)], "B": [("C", -2)], "C": []}
    distances = floyd_warshall(adj, ["A", "B", "C"])
    assert distances["A"]["C"] == 3
    assert distances["A"]["B"] == 5


if __name__ == "__main__":
    test_computes_all_pairs_shortest_paths_in_4_node_graph()
    test_sets_diagonal_entries_to_zero()
    test_returns_infinity_for_unreachable_node_pairs()
    test_handles_single_node_graph()
    test_finds_shorter_indirect_paths_over_direct_edges()
    test_computes_correct_bidirectional_distances()
    test_handles_negative_edge_weights_without_negative_cycles()
    print("All tests passed!")
