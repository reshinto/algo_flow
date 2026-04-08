import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("dfs-cycle-undirected")
dfs_cycle_undirected = module.dfs_cycle_undirected


def test_detects_triangle_cycle():
    adjacency_list = {"A": ["B", "C"], "B": ["A", "C"], "C": ["B", "A"]}
    assert dfs_cycle_undirected(adjacency_list, ["A", "B", "C"]) is True


def test_returns_false_for_tree():
    adjacency_list = {"A": ["B", "C"], "B": ["A", "D"], "C": ["A"], "D": ["B"]}
    assert dfs_cycle_undirected(adjacency_list, ["A", "B", "C", "D"]) is False


def test_returns_false_for_single_node():
    assert dfs_cycle_undirected({"A": []}, ["A"]) is False


def test_returns_false_for_two_disconnected_nodes():
    assert dfs_cycle_undirected({"A": [], "B": []}, ["A", "B"]) is False


def test_detects_cycle_in_default_5_node_graph():
    adjacency_list = {
        "A": ["B", "D"], "B": ["A", "C"], "C": ["B", "D"], "D": ["C", "A", "E"], "E": ["D"],
    }
    assert dfs_cycle_undirected(adjacency_list, ["A", "B", "C", "D", "E"]) is True


def test_returns_false_for_linear_undirected_chain():
    adjacency_list = {"A": ["B"], "B": ["A", "C"], "C": ["B", "D"], "D": ["C"]}
    assert dfs_cycle_undirected(adjacency_list, ["A", "B", "C", "D"]) is False


def test_detects_cycle_in_disconnected_graph_where_one_component_has_cycle():
    adjacency_list = {
        "A": ["B"], "B": ["A"],
        "C": ["D", "E"], "D": ["C", "E"], "E": ["C", "D"],
    }
    assert dfs_cycle_undirected(adjacency_list, ["A", "B", "C", "D", "E"]) is True


def test_does_not_treat_direct_parent_edge_as_back_edge():
    adjacency_list = {"A": ["B"], "B": ["A"]}
    assert dfs_cycle_undirected(adjacency_list, ["A", "B"]) is False


if __name__ == "__main__":
    test_detects_triangle_cycle()
    test_returns_false_for_tree()
    test_returns_false_for_single_node()
    test_returns_false_for_two_disconnected_nodes()
    test_detects_cycle_in_default_5_node_graph()
    test_returns_false_for_linear_undirected_chain()
    test_detects_cycle_in_disconnected_graph_where_one_component_has_cycle()
    test_does_not_treat_direct_parent_edge_as_back_edge()
    print("All tests passed!")
