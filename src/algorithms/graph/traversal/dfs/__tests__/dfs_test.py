import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("dfs")
depth_first_search = module.depth_first_search


def test_traverses_linear_graph_in_order():
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": []}
    assert depth_first_search(adj, "A") == ["A", "B", "C", "D"]


def test_traverses_tree_graph_depth_first():
    adj = {"A": ["B","C"], "B": ["D","E"], "C": ["F"], "D": [], "E": [], "F": []}
    result = depth_first_search(adj, "A")
    assert result[0] == "A"
    assert set(result) == {"A","B","C","D","E","F"}
    assert len(result) == 6
    idx_a = result.index("A")
    idx_b = result.index("B")
    idx_c = result.index("C")
    assert idx_a < idx_b
    assert idx_a < idx_c


def test_handles_disconnected_graph_visiting_only_reachable_nodes():
    adj = {"A": ["B"], "B": [], "C": ["D"], "D": []}
    result = depth_first_search(adj, "A")
    assert result == ["A", "B"]
    assert "C" not in result
    assert "D" not in result


def test_handles_single_node_graph():
    adj = {"A": []}
    assert depth_first_search(adj, "A") == ["A"]


def test_does_not_visit_same_node_twice_in_cyclic_graph():
    adj = {"A": ["B"], "B": ["C"], "C": ["A"]}
    result = depth_first_search(adj, "A")
    assert len(result) == 3
    assert set(result) == {"A","B","C"}


def test_handles_fully_connected_graph_without_revisiting_nodes():
    adj = {
        "A": ["B","C","D"], "B": ["A","C","D"],
        "C": ["A","B","D"], "D": ["A","B","C"],
    }
    result = depth_first_search(adj, "A")
    assert len(result) == 4
    assert result[0] == "A"
    assert set(result) == {"A","B","C","D"}


def test_handles_node_with_no_neighbors_in_adjacency_list():
    adj = {"A": ["B"]}
    result = depth_first_search(adj, "A")
    assert result == ["A", "B"]


def test_traverses_diamond_shaped_graph_visiting_each_node_exactly_once():
    adj = {"A": ["B","C"], "B": ["D"], "C": ["D"], "D": []}
    result = depth_first_search(adj, "A")
    assert len(result) == 4
    assert result[0] == "A"
    assert set(result) == {"A","B","C","D"}


if __name__ == "__main__":
    test_traverses_linear_graph_in_order()
    test_traverses_tree_graph_depth_first()
    test_handles_disconnected_graph_visiting_only_reachable_nodes()
    test_handles_single_node_graph()
    test_does_not_visit_same_node_twice_in_cyclic_graph()
    test_handles_fully_connected_graph_without_revisiting_nodes()
    test_handles_node_with_no_neighbors_in_adjacency_list()
    test_traverses_diamond_shaped_graph_visiting_each_node_exactly_once()
    print("All tests passed!")
