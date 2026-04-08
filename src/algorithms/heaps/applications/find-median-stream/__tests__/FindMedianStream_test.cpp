#include "../sources/FindMedianStream.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // Test: default stream produces correct running medians
    {
        std::vector<int> stream = {5, 2, 8, 1, 9, 3, 7};
        std::vector<double> result = findMedianStream(stream);
        std::vector<double> expected = {5.0, 3.5, 5.0, 3.5, 5.0, 4.0, 5.0};
        assert(result == expected);
    }

    // Test: single element
    {
        std::vector<int> stream = {42};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>{42.0});
    }

    // Test: two elements — average for even count
    {
        std::vector<int> stream = {3, 7};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({3.0, 5.0}));
    }

    // Test: all identical elements
    {
        std::vector<int> stream = {4, 4, 4, 4};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({4.0, 4.0, 4.0, 4.0}));
    }

    // Test: ascending stream
    {
        std::vector<int> stream = {1, 2, 3, 4, 5};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({1.0, 1.5, 2.0, 2.5, 3.0}));
    }

    // Test: descending stream
    {
        std::vector<int> stream = {5, 4, 3, 2, 1};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({5.0, 4.5, 4.0, 3.5, 3.0}));
    }

    // Test: negative numbers
    {
        std::vector<int> stream = {-5, -1, -3};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({-5.0, -3.0, -3.0}));
    }

    // Test: mixed negative and positive
    {
        std::vector<int> stream = {-2, 0, 2};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({-2.0, -1.0, 0.0}));
    }

    // Test: odd-length ascending stream
    {
        std::vector<int> stream = {1, 3, 5, 7, 9};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({1.0, 2.0, 3.0, 4.0, 5.0}));
    }

    // Test: two equal values
    {
        std::vector<int> stream = {7, 7};
        std::vector<double> result = findMedianStream(stream);
        assert(result == std::vector<double>({7.0, 7.0}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
