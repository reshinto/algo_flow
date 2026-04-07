import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bfs")
breadth_first_search = module.breadth_first_search


def test_traverses_linear_graph_in_order():
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": []}
    assert breadth_first_search(adj, "A") == ["A", "B", "C", "D"]


def test_traverses_tree_graph_level_by_level():
    adj = {"A": ["B","C"], "B": ["D","E"], "C": ["F"], "D": [], "E": [], "F": []}
    assert breadth_first_search(adj, "A") == ["A", "B", "C", "D", "E", "F"]


def test_handles_disconnected_graph_visiting_only_reachable_nodes():
    adj = {"A": ["B"], "B": [], "C": ["D"], "D": []}
    result = breadth_first_search(adj, "A")
    assert result == ["A", "B"]
    assert "C" not in result
    assert "D" not in result


def test_handles_single_node_graph():
    adj = {"A": []}
    assert breadth_first_search(adj, "A") == ["A"]


def test_does_not_visit_same_node_twice_in_cyclic_graph():
    adj = {"A": ["B"], "B": ["C"], "C": ["A"]}
    result = breadth_first_search(adj, "A")
    assert result == ["A", "B", "C"]


def test_visits_neighbors_in_order_they_appear():
    adj = {"A": ["C", "B"], "B": [], "C": []}
    result = breadth_first_search(adj, "A")
    assert result == ["A", "C", "B"]


def test_handles_node_with_no_neighbors_in_adjacency_list():
    adj = {"A": ["B"]}
    result = breadth_first_search(adj, "A")
    assert result == ["A", "B"]


def test_traverses_fully_connected_graph():
    adj = {
        "A": ["B","C","D"], "B": ["A","C","D"],
        "C": ["A","B","D"], "D": ["A","B","C"],
    }
    result = breadth_first_search(adj, "A")
    assert len(result) == 4
    assert result[0] == "A"
    assert set(result) == {"A","B","C","D"}


if __name__ == "__main__":
    test_traverses_linear_graph_in_order()
    test_traverses_tree_graph_level_by_level()
    test_handles_disconnected_graph_visiting_only_reachable_nodes()
    test_handles_single_node_graph()
    test_does_not_visit_same_node_twice_in_cyclic_graph()
    test_visits_neighbors_in_order_they_appear()
    test_handles_node_with_no_neighbors_in_adjacency_list()
    test_traverses_fully_connected_graph()
    print("All tests passed!")
