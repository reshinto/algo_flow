#include "sources/MaxProductSubarray.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(std::get<0>(maxProductSubarray({2, 3, -2, 4, -1, 2})) == 96);
    assert(std::get<0>(maxProductSubarray({1, 2, 3, 4})) == 24);
    assert(std::get<0>(maxProductSubarray({2, 3, 0, 4, 5})) == 20);

    {
        auto [product, start, end] = maxProductSubarray({7});
        assert(product == 7 && start == 0 && end == 0);
    }

    assert(std::get<0>(maxProductSubarray({-2, -3})) == 6);
    assert(std::get<0>(maxProductSubarray({-2, 3, -4})) == 24);
    assert(std::get<0>(maxProductSubarray({})) == 0);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
