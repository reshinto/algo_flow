import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("boruvkas")
boruvkas_algorithm = module.boruvkas_algorithm


def make_edges(triples):
    return [{"source": src, "target": tgt, "weight": w} for src, tgt, w in triples]


def total_weight(edges):
    return sum(edge["weight"] for edge in edges)


def test_finds_correct_mst_for_default_6_node_weighted_graph():
    edges = make_edges([
        ("A", "B", 4), ("A", "C", 2), ("B", "C", 1), ("B", "D", 5),
        ("C", "D", 8), ("C", "E", 10), ("D", "E", 2), ("D", "F", 6), ("E", "F", 3),
    ])
    node_ids = ["A", "B", "C", "D", "E", "F"]
    result = boruvkas_algorithm(edges, node_ids)
    assert len(result) == 5
    assert total_weight(result) == 13


def test_returns_v_minus_1_edges_for_connected_graph():
    edges = make_edges([("A", "B", 3), ("A", "C", 1), ("B", "C", 2)])
    result = boruvkas_algorithm(edges, ["A", "B", "C"])
    assert len(result) == 2


def test_each_component_selects_cheapest_outgoing_edge():
    edges = make_edges([("A", "B", 1), ("B", "C", 5), ("A", "C", 3)])
    result = boruvkas_algorithm(edges, ["A", "B", "C"])
    assert len(result) == 2
    weights = sorted(edge["weight"] for edge in result)
    assert weights[0] == 1
    assert weights[1] == 3


def test_produces_minimum_total_weight_spanning_tree():
    edges = make_edges([("A", "B", 2), ("B", "C", 3), ("A", "C", 10)])
    result = boruvkas_algorithm(edges, ["A", "B", "C"])
    assert total_weight(result) == 5
    assert len(result) == 2


def test_handles_two_node_graph():
    edges = make_edges([("A", "B", 6)])
    result = boruvkas_algorithm(edges, ["A", "B"])
    assert len(result) == 1
    assert result[0]["weight"] == 6


def test_handles_linear_four_node_chain():
    edges = make_edges([("A", "B", 1), ("B", "C", 2), ("C", "D", 3)])
    result = boruvkas_algorithm(edges, ["A", "B", "C", "D"])
    assert len(result) == 3
    assert total_weight(result) == 6


def test_produces_same_total_weight_as_kruskals():
    edges = make_edges([
        ("A", "B", 4), ("A", "C", 2), ("B", "C", 1), ("B", "D", 5),
        ("D", "E", 2), ("E", "F", 3), ("D", "F", 6),
    ])
    result = boruvkas_algorithm(edges, ["A", "B", "C", "D", "E", "F"])
    assert len(result) == 5
    assert total_weight(result) == 13


if __name__ == "__main__":
    test_finds_correct_mst_for_default_6_node_weighted_graph()
    test_returns_v_minus_1_edges_for_connected_graph()
    test_each_component_selects_cheapest_outgoing_edge()
    test_produces_minimum_total_weight_spanning_tree()
    test_handles_two_node_graph()
    test_handles_linear_four_node_chain()
    test_produces_same_total_weight_as_kruskals()
    print("All tests passed!")
