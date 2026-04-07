import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("hungarian-bipartite")
hungarian_matching = module.hungarian_matching


def test_finds_perfect_matching_for_fully_matchable_bipartite_graph():
    adjacency_list = {
        "L1": ["R1", "R2"], "L2": ["R2", "R3"], "L3": ["R1", "R3"],
        "R1": ["L1", "L3"], "R2": ["L1", "L2"], "R3": ["L2", "L3"],
    }
    result = hungarian_matching(adjacency_list, ["L1", "L2", "L3"], ["R1", "R2", "R3"])
    assert len(result) == 3
    assert result.get("L1") is not None
    assert result.get("L2") is not None
    assert result.get("L3") is not None
    right_values = list(result.values())
    assert len(set(right_values)) == len(right_values)


def test_returns_partial_matching_when_not_all_left_nodes_can_be_matched():
    adjacency_list = {"L1": ["R1"], "L2": ["R1"], "R1": ["L1", "L2"]}
    result = hungarian_matching(adjacency_list, ["L1", "L2"], ["R1"])
    assert len(result) == 1
    matched_left = list(result.keys())[0]
    assert result[matched_left] == "R1"


def test_returns_empty_matching_for_graph_with_no_edges():
    adjacency_list = {"L1": [], "L2": [], "R1": [], "R2": []}
    result = hungarian_matching(adjacency_list, ["L1", "L2"], ["R1", "R2"])
    assert len(result) == 0


def test_matches_single_left_right_pair_correctly():
    adjacency_list = {"L1": ["R1"], "R1": ["L1"]}
    result = hungarian_matching(adjacency_list, ["L1"], ["R1"])
    assert result.get("L1") == "R1"
    assert len(result) == 1


def test_finds_augmenting_path_to_reroute_existing_match():
    adjacency_list = {"L1": ["R1", "R2"], "L2": ["R1"], "R1": ["L1", "L2"], "R2": ["L1"]}
    result = hungarian_matching(adjacency_list, ["L1", "L2"], ["R1", "R2"])
    assert len(result) == 2
    right_values = list(result.values())
    assert len(set(right_values)) == 2


def test_handles_one_to_one_bipartite_graph_with_guaranteed_perfect_matching():
    adjacency_list = {
        "L1": ["R1"], "L2": ["R2"], "L3": ["R3"],
        "R1": ["L1"], "R2": ["L2"], "R3": ["L3"],
    }
    result = hungarian_matching(adjacency_list, ["L1", "L2", "L3"], ["R1", "R2", "R3"])
    assert result.get("L1") == "R1"
    assert result.get("L2") == "R2"
    assert result.get("L3") == "R3"


def test_returns_empty_matching_for_empty_graph_with_no_nodes():
    result = hungarian_matching({}, [], [])
    assert len(result) == 0


if __name__ == "__main__":
    test_finds_perfect_matching_for_fully_matchable_bipartite_graph()
    test_returns_partial_matching_when_not_all_left_nodes_can_be_matched()
    test_returns_empty_matching_for_graph_with_no_edges()
    test_matches_single_left_right_pair_correctly()
    test_finds_augmenting_path_to_reroute_existing_match()
    test_handles_one_to_one_bipartite_graph_with_guaranteed_perfect_matching()
    test_returns_empty_matching_for_empty_graph_with_no_nodes()
    print("All tests passed!")
