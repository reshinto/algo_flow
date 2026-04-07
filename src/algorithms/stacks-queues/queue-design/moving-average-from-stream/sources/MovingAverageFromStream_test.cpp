// g++ -o MovingAverageFromStream_test MovingAverageFromStream_test.cpp && ./MovingAverageFromStream_test
#include "MovingAverageFromStream.cpp"
#include <cassert>
#include <cmath>
#include <iostream>
#include <vector>

bool approx(double actual, double expected, double tolerance = 0.001) {
    return std::abs(actual - expected) < tolerance;
}

int main() {
    auto result = movingAverageFromStream({1.0, 10.0, 3.0, 5.0}, 3);
    assert(approx(result[0], 1.0));
    assert(approx(result[1], 5.5));
    assert(approx(result[2], 4.667, 0.01));
    assert(approx(result[3], 6.0));

    auto resultK1 = movingAverageFromStream({4.0, 7.0, 2.0}, 1);
    assert(approx(resultK1[0], 4.0));
    assert(approx(resultK1[1], 7.0));
    assert(approx(resultK1[2], 2.0));

    auto resultK2 = movingAverageFromStream({10.0, 20.0, 30.0, 40.0}, 2);
    assert(approx(resultK2[0], 10.0));
    assert(approx(resultK2[1], 15.0));
    assert(approx(resultK2[2], 25.0));
    assert(approx(resultK2[3], 35.0));

    auto singleResult = movingAverageFromStream({42.0}, 3);
    assert(approx(singleResult[0], 42.0));

    auto identicalResult = movingAverageFromStream({5.0, 5.0, 5.0, 5.0}, 3);
    for (double avg : identicalResult) {
        assert(approx(avg, 5.0));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
