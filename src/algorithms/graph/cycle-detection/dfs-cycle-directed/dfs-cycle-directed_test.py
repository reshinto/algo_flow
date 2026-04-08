import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("dfs-cycle-directed")
dfs_cycle_directed = module.dfs_cycle_directed


def test_detects_simple_back_edge_cycle():
    adjacency_list = {"A": ["B"], "B": ["C"], "C": ["A"]}
    assert dfs_cycle_directed(adjacency_list, ["A", "B", "C"]) is True


def test_returns_false_for_simple_dag():
    adjacency_list = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}
    assert dfs_cycle_directed(adjacency_list, ["A", "B", "C", "D"]) is False


def test_detects_self_loop():
    adjacency_list = {"A": ["A"], "B": []}
    assert dfs_cycle_directed(adjacency_list, ["A", "B"]) is True


def test_returns_false_for_single_node_with_no_edges():
    assert dfs_cycle_directed({"A": []}, ["A"]) is False


def test_detects_cycle_in_default_5_node_graph():
    adjacency_list = {"A": ["B"], "B": ["C"], "C": ["D"], "D": ["B"], "E": ["A"]}
    assert dfs_cycle_directed(adjacency_list, ["A", "B", "C", "D", "E"]) is True


def test_returns_false_for_linear_directed_chain():
    adjacency_list = {"A": ["B"], "B": ["C"], "C": ["D"], "D": []}
    assert dfs_cycle_directed(adjacency_list, ["A", "B", "C", "D"]) is False


def test_returns_false_for_disconnected_acyclic_graph():
    adjacency_list = {"A": ["B"], "B": [], "C": ["D"], "D": []}
    assert dfs_cycle_directed(adjacency_list, ["A", "B", "C", "D"]) is False


def test_detects_cycle_in_disconnected_graph_where_only_one_component_has_cycle():
    adjacency_list = {"A": ["B"], "B": [], "C": ["D"], "D": ["C"]}
    assert dfs_cycle_directed(adjacency_list, ["A", "B", "C", "D"]) is True


def test_handles_cross_edge_correctly_no_false_positive():
    adjacency_list = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}
    assert dfs_cycle_directed(adjacency_list, ["A", "B", "C", "D"]) is False


if __name__ == "__main__":
    test_detects_simple_back_edge_cycle()
    test_returns_false_for_simple_dag()
    test_detects_self_loop()
    test_returns_false_for_single_node_with_no_edges()
    test_detects_cycle_in_default_5_node_graph()
    test_returns_false_for_linear_directed_chain()
    test_returns_false_for_disconnected_acyclic_graph()
    test_detects_cycle_in_disconnected_graph_where_only_one_component_has_cycle()
    test_handles_cross_edge_correctly_no_false_positive()
    print("All tests passed!")
