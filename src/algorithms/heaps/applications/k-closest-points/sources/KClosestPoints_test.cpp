#include "KClosestPoints.cpp"
#include <cassert>
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    auto distSq = [](std::pair<int,int> pt) -> long long {
        return (long long)pt.first * pt.first + (long long)pt.second * pt.second;
    };

    // Test: returns k=3 closest points
    {
        std::vector<std::pair<int,int>> points = {{3,3},{5,-1},{-2,4},{1,1},{0,2},{-1,-1},{4,0}};
        auto result = kClosestPoints(points, 3);
        assert(result.size() == 3);
        std::vector<long long> dists;
        for (auto& pt : points) dists.push_back(distSq(pt));
        std::sort(dists.begin(), dists.end());
        long long thirdSmallest = dists[2];
        for (auto& pt : result) {
            assert(distSq(pt) <= thirdSmallest);
        }
    }

    // Test: k=1 returns the closest point [1,0] with dist²=1
    {
        std::vector<std::pair<int,int>> points = {{10,10},{1,0},{5,5}};
        auto result = kClosestPoints(points, 1);
        assert(result.size() == 1);
        assert(distSq(result[0]) == 1);
    }

    // Test: k equals total number of points
    {
        std::vector<std::pair<int,int>> points = {{1,2},{3,4},{0,1}};
        auto result = kClosestPoints(points, 3);
        assert(result.size() == 3);
    }

    // Test: negative coordinates — [-1,-1] has dist²=2
    {
        std::vector<std::pair<int,int>> points = {{-3,-4},{-1,-1},{0,-2}};
        auto result = kClosestPoints(points, 1);
        assert(result.size() == 1);
        assert(distSq(result[0]) == 2);
    }

    // Test: origin point [0,0] has dist²=0
    {
        std::vector<std::pair<int,int>> points = {{0,0},{1,1},{2,2}};
        auto result = kClosestPoints(points, 1);
        assert(distSq(result[0]) == 0);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
