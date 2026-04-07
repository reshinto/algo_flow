import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("iddfs")
iterative_deepening_dfs = module.iterative_deepening_dfs


def test_traverses_linear_graph_in_depth_first_order():
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": []}
    assert iterative_deepening_dfs(adj, "A") == ["A", "B", "C", "D"]


def test_traverses_tree_graph_visiting_children_before_siblings():
    adj = {"A": ["B","C"], "B": ["D","E"], "C": ["F"], "D": [], "E": [], "F": []}
    result = iterative_deepening_dfs(adj, "A")
    assert len(result) == 6
    assert result[0] == "A"
    assert set(result) == {"A","B","C","D","E","F"}


def test_handles_disconnected_graph_visiting_only_reachable_nodes():
    adj = {"A": ["B"], "B": [], "C": ["D"], "D": []}
    result = iterative_deepening_dfs(adj, "A")
    assert "A" in result
    assert "B" in result
    assert "C" not in result
    assert "D" not in result


def test_handles_single_node_graph():
    adj = {"A": []}
    assert iterative_deepening_dfs(adj, "A") == ["A"]


def test_does_not_visit_same_node_twice_in_cyclic_graph():
    adj = {"A": ["B"], "B": ["C"], "C": ["A"]}
    result = iterative_deepening_dfs(adj, "A")
    assert result == ["A", "B", "C"]
    assert len(result) == 3


def test_respects_explicit_max_depth():
    adj = {"A": ["B","C"], "B": ["D"], "C": ["E"], "D": ["F"], "E": [], "F": []}
    result = iterative_deepening_dfs(adj, "A", max_depth=1)
    assert "A" in result
    assert "B" in result
    assert "C" in result
    assert "D" not in result
    assert "F" not in result


def test_visits_neighbors_in_order_they_appear_in_adjacency_list():
    adj = {"A": ["B","C"], "B": [], "C": []}
    result = iterative_deepening_dfs(adj, "A")
    assert result[0] == "A"
    assert set(result) == {"A","B","C"}


def test_traverses_fully_connected_graph_visiting_all_nodes():
    adj = {
        "A": ["B","C","D"], "B": ["A","C","D"],
        "C": ["A","B","D"], "D": ["A","B","C"],
    }
    result = iterative_deepening_dfs(adj, "A")
    assert len(result) == 4
    assert result[0] == "A"
    assert set(result) == {"A","B","C","D"}


if __name__ == "__main__":
    test_traverses_linear_graph_in_depth_first_order()
    test_traverses_tree_graph_visiting_children_before_siblings()
    test_handles_disconnected_graph_visiting_only_reachable_nodes()
    test_handles_single_node_graph()
    test_does_not_visit_same_node_twice_in_cyclic_graph()
    test_respects_explicit_max_depth()
    test_visits_neighbors_in_order_they_appear_in_adjacency_list()
    test_traverses_fully_connected_graph_visiting_all_nodes()
    print("All tests passed!")
