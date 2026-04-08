import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("kruskals")
kruskals_algorithm = module.kruskals_algorithm


def make_edges(triples):
    return [{"source": src, "target": tgt, "weight": w} for src, tgt, w in triples]


def total_weight(edges):
    return sum(edge["weight"] for edge in edges)


def test_finds_correct_mst_for_default_6_node_weighted_graph():
    edges = make_edges([
        ("A", "B", 4), ("A", "C", 2), ("B", "C", 1), ("B", "D", 5),
        ("C", "D", 8), ("C", "E", 10), ("D", "E", 2), ("D", "F", 6), ("E", "F", 3),
    ])
    result = kruskals_algorithm(edges, ["A", "B", "C", "D", "E", "F"])
    assert len(result) == 5
    assert total_weight(result) == 13


def test_returns_v_minus_1_edges_for_connected_graph():
    edges = make_edges([("A", "B", 3), ("A", "C", 1), ("B", "C", 2)])
    result = kruskals_algorithm(edges, ["A", "B", "C"])
    assert len(result) == 2


def test_selects_edges_in_ascending_weight_order():
    edges = make_edges([("A", "B", 10), ("B", "C", 1), ("A", "C", 5)])
    result = kruskals_algorithm(edges, ["A", "B", "C"])
    assert len(result) == 2
    weights = sorted(edge["weight"] for edge in result)
    assert weights[0] == 1
    assert weights[1] == 5


def test_rejects_edges_that_would_form_cycle():
    edges = make_edges([("A", "B", 1), ("B", "C", 2), ("A", "C", 3)])
    result = kruskals_algorithm(edges, ["A", "B", "C"])
    assert len(result) == 2
    assert total_weight(result) == 3


def test_handles_two_node_graph_with_single_edge():
    edges = make_edges([("A", "B", 7)])
    result = kruskals_algorithm(edges, ["A", "B"])
    assert len(result) == 1
    assert result[0]["weight"] == 7


def test_handles_linear_chain_graph_correctly():
    edges = make_edges([("A", "B", 2), ("B", "C", 4), ("C", "D", 1)])
    result = kruskals_algorithm(edges, ["A", "B", "C", "D"])
    assert len(result) == 3
    assert total_weight(result) == 7


def test_produces_mst_with_minimum_total_weight():
    edges = make_edges([
        ("A", "B", 1), ("B", "C", 1), ("C", "D", 1), ("D", "A", 1), ("A", "C", 10)
    ])
    result = kruskals_algorithm(edges, ["A", "B", "C", "D"])
    assert len(result) == 3
    assert total_weight(result) == 3


if __name__ == "__main__":
    test_finds_correct_mst_for_default_6_node_weighted_graph()
    test_returns_v_minus_1_edges_for_connected_graph()
    test_selects_edges_in_ascending_weight_order()
    test_rejects_edges_that_would_form_cycle()
    test_handles_two_node_graph_with_single_edge()
    test_handles_linear_chain_graph_correctly()
    test_produces_mst_with_minimum_total_weight()
    print("All tests passed!")
