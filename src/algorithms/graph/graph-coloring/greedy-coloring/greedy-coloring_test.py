import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("greedy-coloring")
greedy_coloring = module.greedy_coloring


def test_colors_single_node_with_color_0():
    result = greedy_coloring({"A": []}, ["A"])
    assert result["A"] == 0


def test_colors_two_connected_nodes_with_different_colors():
    result = greedy_coloring({"A": ["B"], "B": ["A"]}, ["A", "B"])
    assert result["A"] != result["B"]


def test_colors_triangle_with_3_distinct_colors():
    adj = {"A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B"]}
    result = greedy_coloring(adj, ["A", "B", "C"])
    assert result["A"] != result["B"]
    assert result["A"] != result["C"]
    assert result["B"] != result["C"]


def test_colors_bipartite_graph_with_at_most_2_colors():
    adj = {"A": ["B", "D"], "B": ["A", "C"], "C": ["B", "D"], "D": ["C", "A"]}
    result = greedy_coloring(adj, ["A", "B", "C", "D"])
    used_colors = set(result.values())
    assert len(used_colors) <= 2


def test_assigns_smallest_available_color():
    adj = {"A": ["B"], "B": ["A", "C"], "C": ["B"]}
    result = greedy_coloring(adj, ["A", "B", "C"])
    assert result["A"] == 0
    assert result["B"] == 1
    assert result["C"] == 0


def test_produces_valid_coloring_no_two_adjacent_nodes_share_color():
    adj = {
        "A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B", "D"],
        "D": ["C", "E", "F"], "E": ["D", "F"], "F": ["D", "E"],
    }
    node_ids = ["A", "B", "C", "D", "E", "F"]
    result = greedy_coloring(adj, node_ids)
    for node_id in node_ids:
        for neighbor_id in adj.get(node_id, []):
            assert result[node_id] != result[neighbor_id]


def test_colors_disconnected_graph_isolated_nodes_get_color_0():
    result = greedy_coloring({"A": [], "B": [], "C": []}, ["A", "B", "C"])
    assert result["A"] == 0
    assert result["B"] == 0
    assert result["C"] == 0


if __name__ == "__main__":
    test_colors_single_node_with_color_0()
    test_colors_two_connected_nodes_with_different_colors()
    test_colors_triangle_with_3_distinct_colors()
    test_colors_bipartite_graph_with_at_most_2_colors()
    test_assigns_smallest_available_color()
    test_produces_valid_coloring_no_two_adjacent_nodes_share_color()
    test_colors_disconnected_graph_isolated_nodes_get_color_0()
    print("All tests passed!")
