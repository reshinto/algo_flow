#include "../sources/BestTimeBuySell.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // [7,1,5,3,6,4] -> profit=5, buyDay=1, sellDay=4
    {
        auto [profit, buyDay, sellDay] = bestTimeBuySell({7, 1, 5, 3, 6, 4});
        assert(profit == 5);
        assert(buyDay == 1);
        assert(sellDay == 4);
    }

    // Always decreasing -> profit=0
    assert(std::get<0>(bestTimeBuySell({7, 6, 4, 3, 1})) == 0);

    // Strictly increasing
    {
        auto [profit, buyDay, sellDay] = bestTimeBuySell({1, 2, 3, 4, 5});
        assert(profit == 4 && buyDay == 0 && sellDay == 4);
    }

    // Empty
    {
        auto [profit, buyDay, sellDay] = bestTimeBuySell({});
        assert(profit == 0 && buyDay == -1 && sellDay == -1);
    }

    // Price spike
    {
        auto [profit, buyDay, sellDay] = bestTimeBuySell({1, 100, 2, 3});
        assert(profit == 99 && buyDay == 0 && sellDay == 1);
    }

    // Best at end
    {
        auto [profit, buyDay, sellDay] = bestTimeBuySell({9, 8, 7, 1, 10});
        assert(profit == 9 && buyDay == 3 && sellDay == 4);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
