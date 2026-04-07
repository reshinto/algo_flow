import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("bidirectional-bfs")
bidirectional_bfs = module.bidirectional_bfs


def test_finds_shortest_path_in_simple_linear_graph():
    adj = {"A": ["B"], "B": ["C"], "C": ["D"], "D": []}
    result = bidirectional_bfs(adj, "A", "D")
    assert result == ["A", "B", "C", "D"]


def test_finds_path_in_branching_graph():
    adj = {"A": ["B","C"], "B": ["D"], "C": ["E"], "D": ["F"], "E": ["F"], "F": []}
    result = bidirectional_bfs(adj, "A", "F")
    assert result is not None
    assert result[0] == "A"
    assert result[-1] == "F"


def test_returns_none_when_no_path_exists_between_disconnected_nodes():
    adj = {"A": ["B"], "B": [], "C": ["D"], "D": []}
    result = bidirectional_bfs(adj, "A", "C")
    assert result is None


def test_returns_single_element_path_when_start_and_target_are_same():
    adj = {"A": ["B"], "B": []}
    result = bidirectional_bfs(adj, "A", "A")
    assert result == ["A"]


def test_finds_shortest_path_not_longer_one():
    adj = {"A": ["B"], "B": ["C", "E"], "C": ["D"], "D": ["E"], "E": []}
    result = bidirectional_bfs(adj, "A", "E")
    assert result is not None
    assert len(result) == 3
    assert result[0] == "A"
    assert result[-1] == "E"


def test_handles_adjacent_start_and_target_nodes():
    adj = {"A": ["B"], "B": []}
    result = bidirectional_bfs(adj, "A", "B")
    assert result == ["A", "B"]


def test_treats_graph_as_undirected_for_backward_frontier():
    adj = {"A": ["B"], "B": []}
    result = bidirectional_bfs(adj, "B", "A")
    assert result is not None
    assert len(result) == 2


def test_returns_none_for_isolated_start_node():
    adj = {"A": [], "B": ["C"], "C": []}
    result = bidirectional_bfs(adj, "A", "C")
    assert result is None


if __name__ == "__main__":
    test_finds_shortest_path_in_simple_linear_graph()
    test_finds_path_in_branching_graph()
    test_returns_none_when_no_path_exists_between_disconnected_nodes()
    test_returns_single_element_path_when_start_and_target_are_same()
    test_finds_shortest_path_not_longer_one()
    test_handles_adjacent_start_and_target_nodes()
    test_treats_graph_as_undirected_for_backward_frontier()
    test_returns_none_for_isolated_start_node()
    print("All tests passed!")
