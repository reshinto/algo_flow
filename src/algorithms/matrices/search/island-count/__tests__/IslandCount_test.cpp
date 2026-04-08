// g++ -std=c++17 -o island_count_test IslandCount_test.cpp && ./island_count_test
#include "../sources/IslandCount.cpp"
#include <cassert>
#include <iostream>

int main() {
    // test: counts 2 islands in standard grid
    {
        std::vector<std::vector<int>> grid = {{1, 1, 0, 0}, {1, 0, 0, 1}, {0, 0, 1, 1}, {0, 0, 0, 0}};
        assert(islandCount(grid) == 2);
    }

    // test: returns 0 when no islands
    {
        std::vector<std::vector<int>> grid = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
        assert(islandCount(grid) == 0);
    }

    // test: counts 1 island when entire grid is land
    {
        std::vector<std::vector<int>> grid = {{1, 1, 1}, {1, 1, 1}, {1, 1, 1}};
        assert(islandCount(grid) == 1);
    }

    // test: handles 1x1 grid with island
    {
        std::vector<std::vector<int>> grid = {{1}};
        assert(islandCount(grid) == 1);
    }

    // test: handles 1x1 grid with no island
    {
        std::vector<std::vector<int>> grid = {{0}};
        assert(islandCount(grid) == 0);
    }

    // test: diagonally adjacent cells not connected
    {
        std::vector<std::vector<int>> grid = {{1, 0, 1}, {0, 1, 0}, {1, 0, 1}};
        assert(islandCount(grid) == 5);
    }

    // test: L-shaped island counts as one
    {
        std::vector<std::vector<int>> grid = {{1, 0}, {1, 0}, {1, 1}};
        assert(islandCount(grid) == 1);
    }

    // test: handles single row grid
    {
        std::vector<std::vector<int>> grid = {{1, 0, 1, 1, 0, 1}};
        assert(islandCount(grid) == 3);
    }

    // test: handles single column grid
    {
        std::vector<std::vector<int>> grid = {{1}, {0}, {1}, {1}, {0}};
        assert(islandCount(grid) == 2);
    }

    // test: counts 3 islands in default input
    {
        std::vector<std::vector<int>> grid = {
            {1, 1, 0, 0, 0},
            {1, 1, 0, 0, 0},
            {0, 0, 1, 0, 0},
            {0, 0, 0, 1, 1},
        };
        assert(islandCount(grid) == 3);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
