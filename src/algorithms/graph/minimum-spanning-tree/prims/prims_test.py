import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("prims")
prims_algorithm = module.prims_algorithm


def total_weight(edges):
    return sum(edge["weight"] for edge in edges)


def test_finds_correct_mst_for_default_6_node_weighted_graph():
    adjacency_list = {
        "A": [("B", 4), ("C", 2)],
        "B": [("A", 4), ("C", 1), ("D", 5)],
        "C": [("A", 2), ("B", 1), ("D", 8), ("E", 10)],
        "D": [("B", 5), ("C", 8), ("E", 2), ("F", 6)],
        "E": [("C", 10), ("D", 2), ("F", 3)],
        "F": [("D", 6), ("E", 3)],
    }
    result = prims_algorithm(adjacency_list, "A")
    assert len(result) == 5
    assert total_weight(result) == 13


def test_returns_v_minus_1_edges_for_fully_connected_graph():
    adjacency_list = {
        "A": [("B", 3), ("C", 1)],
        "B": [("A", 3), ("C", 2)],
        "C": [("A", 1), ("B", 2)],
    }
    result = prims_algorithm(adjacency_list, "A")
    assert len(result) == 2


def test_selects_minimum_weight_edge_at_each_step():
    adjacency_list = {
        "A": [("B", 10), ("C", 1)],
        "B": [("A", 10), ("C", 2)],
        "C": [("A", 1), ("B", 2)],
    }
    result = prims_algorithm(adjacency_list, "A")
    assert len(result) == 2
    assert total_weight(result) == 3


def test_does_not_revisit_already_included_nodes():
    adjacency_list = {
        "A": [("B", 1), ("C", 2)],
        "B": [("A", 1), ("C", 3)],
        "C": [("A", 2), ("B", 3)],
    }
    result = prims_algorithm(adjacency_list, "A")
    target_nodes = [edge["target"] for edge in result]
    assert len(target_nodes) == len(set(target_nodes))


def test_handles_linear_chain_graph_from_start_to_end():
    adjacency_list = {
        "A": [("B", 5)],
        "B": [("A", 5), ("C", 3)],
        "C": [("B", 3), ("D", 7)],
        "D": [("C", 7)],
    }
    result = prims_algorithm(adjacency_list, "A")
    assert len(result) == 3
    assert total_weight(result) == 15


def test_produces_correct_mst_starting_from_non_first_node():
    adjacency_list = {
        "A": [("B", 1), ("C", 4)],
        "B": [("A", 1), ("C", 2)],
        "C": [("A", 4), ("B", 2)],
    }
    result_from_b = prims_algorithm(adjacency_list, "B")
    result_from_a = prims_algorithm(adjacency_list, "A")
    assert total_weight(result_from_b) == total_weight(result_from_a)


def test_handles_two_node_graph():
    adjacency_list = {
        "A": [("B", 9)],
        "B": [("A", 9)],
    }
    result = prims_algorithm(adjacency_list, "A")
    assert len(result) == 1
    assert result[0]["weight"] == 9


if __name__ == "__main__":
    test_finds_correct_mst_for_default_6_node_weighted_graph()
    test_returns_v_minus_1_edges_for_fully_connected_graph()
    test_selects_minimum_weight_edge_at_each_step()
    test_does_not_revisit_already_included_nodes()
    test_handles_linear_chain_graph_from_start_to_end()
    test_produces_correct_mst_starting_from_non_first_node()
    test_handles_two_node_graph()
    print("All tests passed!")
