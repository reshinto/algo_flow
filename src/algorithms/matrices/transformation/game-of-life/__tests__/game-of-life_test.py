import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
import copy

game_of_life_mod = importlib.import_module("game-of-life")
game_of_life = game_of_life_mod.game_of_life


def test_simulates_one_step_standard_4x3_example():
    board = copy.deepcopy([[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]])
    assert game_of_life(board) == [[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 1, 0]]


def test_all_dead_board_stays_unchanged():
    board = copy.deepcopy([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    assert game_of_life(board) == [[0, 0, 0], [0, 0, 0], [0, 0, 0]]


def test_all_alive_3x3_overpopulation():
    board = copy.deepcopy([[1, 1, 1], [1, 1, 1], [1, 1, 1]])
    assert game_of_life(board) == [[1, 0, 1], [0, 0, 0], [1, 0, 1]]


def test_1x1_dead_stays_dead():
    board = copy.deepcopy([[0]])
    assert game_of_life(board) == [[0]]


def test_1x1_live_dies_from_underpopulation():
    board = copy.deepcopy([[1]])
    assert game_of_life(board) == [[0]]


def test_2x2_still_life_block():
    board = copy.deepcopy([[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]])
    assert game_of_life(board) == [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]


def test_vertical_blinker_becomes_horizontal():
    board = copy.deepcopy([[0, 1, 0], [0, 1, 0], [0, 1, 0]])
    assert game_of_life(board) == [[0, 0, 0], [1, 1, 1], [0, 0, 0]]


def test_reproduction_l_shape():
    board = copy.deepcopy([[1, 1, 0], [1, 0, 0], [0, 0, 0]])
    assert game_of_life(board) == [[1, 1, 0], [1, 1, 0], [0, 0, 0]]


if __name__ == "__main__":
    test_simulates_one_step_standard_4x3_example()
    test_all_dead_board_stays_unchanged()
    test_all_alive_3x3_overpopulation()
    test_1x1_dead_stays_dead()
    test_1x1_live_dies_from_underpopulation()
    test_2x2_still_life_block()
    test_vertical_blinker_becomes_horizontal()
    test_reproduction_l_shape()
    print("All tests passed!")
