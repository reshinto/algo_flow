import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("bipartite-check")
bipartite_check = module.bipartite_check


def test_identifies_simple_two_node_graph_as_bipartite():
    result = bipartite_check({"A": ["B"], "B": ["A"]}, ["A", "B"])
    assert result["is_bipartite"] is True


def test_identifies_even_cycle_as_bipartite():
    adj = {"A": ["B", "D"], "B": ["A", "C"], "C": ["B", "D"], "D": ["C", "A"]}
    result = bipartite_check(adj, ["A", "B", "C", "D"])
    assert result["is_bipartite"] is True


def test_identifies_odd_cycle_triangle_as_not_bipartite():
    adj = {"A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B"]}
    result = bipartite_check(adj, ["A", "B", "C"])
    assert result["is_bipartite"] is False


def test_identifies_default_6_node_bipartite_graph_correctly():
    adj = {
        "A": ["D", "E"], "B": ["D", "F"], "C": ["E", "F"],
        "D": ["A", "B"], "E": ["A", "C"], "F": ["B", "C"],
    }
    result = bipartite_check(adj, ["A", "B", "C", "D", "E", "F"])
    assert result["is_bipartite"] is True
    coloring = result["coloring"]
    assert coloring["A"] != coloring["D"]
    assert coloring["A"] != coloring["E"]


def test_produces_valid_2_coloring_for_bipartite_graph():
    adj = {"A": ["C", "D"], "B": ["C", "D"], "C": ["A", "B"], "D": ["A", "B"]}
    result = bipartite_check(adj, ["A", "B", "C", "D"])
    assert result["is_bipartite"] is True
    coloring = result["coloring"]
    for node_id, neighbors in adj.items():
        for neighbor_id in neighbors:
            assert coloring[node_id] != coloring[neighbor_id]


def test_handles_disconnected_graph_where_all_components_are_bipartite():
    adj = {"A": ["B"], "B": ["A"], "C": ["D"], "D": ["C"]}
    result = bipartite_check(adj, ["A", "B", "C", "D"])
    assert result["is_bipartite"] is True


def test_handles_single_isolated_node_as_bipartite():
    result = bipartite_check({"A": []}, ["A"])
    assert result["is_bipartite"] is True
    assert result["coloring"]["A"] == 0


def test_identifies_5_cycle_as_not_bipartite():
    adj = {"A": ["B", "E"], "B": ["A", "C"], "C": ["B", "D"], "D": ["C", "E"], "E": ["D", "A"]}
    result = bipartite_check(adj, ["A", "B", "C", "D", "E"])
    assert result["is_bipartite"] is False


if __name__ == "__main__":
    test_identifies_simple_two_node_graph_as_bipartite()
    test_identifies_even_cycle_as_bipartite()
    test_identifies_odd_cycle_triangle_as_not_bipartite()
    test_identifies_default_6_node_bipartite_graph_correctly()
    test_produces_valid_2_coloring_for_bipartite_graph()
    test_handles_disconnected_graph_where_all_components_are_bipartite()
    test_handles_single_isolated_node_as_bipartite()
    test_identifies_5_cycle_as_not_bipartite()
    print("All tests passed!")
