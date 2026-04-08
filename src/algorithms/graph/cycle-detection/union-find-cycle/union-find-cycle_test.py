import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("union-find-cycle")
union_find_cycle = module.union_find_cycle


def edge(source, target):
    return {"source": source, "target": target}


def test_detects_triangle_cycle():
    edges = [edge("A", "B"), edge("B", "C"), edge("C", "A")]
    assert union_find_cycle(edges, ["A", "B", "C"]) is True


def test_returns_false_for_tree_with_no_cycle():
    edges = [edge("A", "B"), edge("A", "C"), edge("B", "D")]
    assert union_find_cycle(edges, ["A", "B", "C", "D"]) is False


def test_returns_false_for_empty_edge_list():
    assert union_find_cycle([], ["A", "B", "C"]) is False


def test_returns_false_for_single_node_with_no_edges():
    assert union_find_cycle([], ["A"]) is False


def test_detects_cycle_in_default_5_node_graph():
    edges = [edge("A", "B"), edge("B", "C"), edge("C", "D"), edge("D", "A"), edge("D", "E")]
    assert union_find_cycle(edges, ["A", "B", "C", "D", "E"]) is True


def test_returns_false_for_linear_undirected_chain():
    edges = [edge("A", "B"), edge("B", "C"), edge("C", "D")]
    assert union_find_cycle(edges, ["A", "B", "C", "D"]) is False


def test_detects_cycle_when_cycle_forming_edge_is_last():
    edges = [edge("A", "B"), edge("B", "C"), edge("C", "D"), edge("D", "E"), edge("E", "A")]
    assert union_find_cycle(edges, ["A", "B", "C", "D", "E"]) is True


def test_correctly_handles_star_graph_no_cycle():
    edges = [edge("A", "B"), edge("A", "C"), edge("A", "D"), edge("A", "E")]
    assert union_find_cycle(edges, ["A", "B", "C", "D", "E"]) is False


def test_detects_multi_component_graph_where_only_one_component_has_cycle():
    edges = [edge("A", "B"), edge("C", "D"), edge("D", "E"), edge("E", "C")]
    assert union_find_cycle(edges, ["A", "B", "C", "D", "E"]) is True


if __name__ == "__main__":
    test_detects_triangle_cycle()
    test_returns_false_for_tree_with_no_cycle()
    test_returns_false_for_empty_edge_list()
    test_returns_false_for_single_node_with_no_edges()
    test_detects_cycle_in_default_5_node_graph()
    test_returns_false_for_linear_undirected_chain()
    test_detects_cycle_when_cycle_forming_edge_is_last()
    test_correctly_handles_star_graph_no_cycle()
    test_detects_multi_component_graph_where_only_one_component_has_cycle()
    print("All tests passed!")
