#include "../sources/BestTimeBuySellUnlimited.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // Default input -> profit=7
    assert(bestTimeBuySellUnlimited({7, 1, 5, 3, 6, 4}).first == 7);

    // Empty -> profit=0
    {
        auto [profit, txns] = bestTimeBuySellUnlimited({});
        assert(profit == 0);
        assert(txns.empty());
    }

    // Single price -> profit=0
    assert(bestTimeBuySellUnlimited({5}).first == 0);

    // Always falling -> profit=0
    assert(bestTimeBuySellUnlimited({5, 4, 3, 2, 1}).first == 0);

    // Strictly increasing [1,2,3,4,5] -> profit=4
    assert(bestTimeBuySellUnlimited({1, 2, 3, 4, 5}).first == 4);

    // Alternating -> profit=12
    assert(bestTimeBuySellUnlimited({1, 5, 1, 5, 1, 5}).first == 12);

    // All equal -> profit=0
    assert(bestTimeBuySellUnlimited({3, 3, 3, 3}).first == 0);

    // [1,7] -> profit=6
    assert(bestTimeBuySellUnlimited({1, 7}).first == 6);

    // [1,5,3,7] -> profit=8, two transactions
    {
        auto [profit, txns] = bestTimeBuySellUnlimited({1, 5, 3, 7});
        assert(profit == 8);
        assert(txns.size() == 2);
        assert(txns[0].first == 0 && txns[0].second == 1);
        assert(txns[1].first == 2 && txns[1].second == 3);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
