/** Correctness tests for the jaroWinklerSimilarity function. */
#include "JaroWinklerSimilarity.cpp"
#include <cassert>
#include <cmath>
#include <iostream>

int main() {
    assert(std::abs(jaroWinklerSimilarity("martha", "marhta") - 0.9611) < 0.0001);
    assert(jaroWinklerSimilarity("abc", "abc") == 1.0);
    assert(jaroWinklerSimilarity("", "") == 1.0);
    assert(jaroWinklerSimilarity("", "abc") == 0.0);
    assert(jaroWinklerSimilarity("abc", "") == 0.0);
    assert(jaroWinklerSimilarity("abc", "xyz") == 0.0);

    double crateTrace = jaroWinklerSimilarity("CRATE", "TRACE");
    assert(crateTrace > 0.7 && crateTrace < 0.8);

    double dwayneDuane = jaroWinklerSimilarity("DwAyNE", "DuANE");
    assert(dwayneDuane >= 0.84);

    assert(jaroWinklerSimilarity("a", "a") == 1.0);

    double algoScore = jaroWinklerSimilarity("algorithm", "logarithm");
    assert(algoScore >= 0.0 && algoScore <= 1.0);

    double forward = jaroWinklerSimilarity("martha", "marhta");
    double backward = jaroWinklerSimilarity("marhta", "martha");
    assert(forward == backward);

    double withPrefix = jaroWinklerSimilarity("JOHNSON", "JHNSON");
    double withoutPrefix = jaroWinklerSimilarity("AOHNSON", "JHNSON");
    assert(withPrefix > withoutPrefix);

    double fourPrefix = jaroWinklerSimilarity("abcdefgh", "abcdXXXX");
    double threePrefix = jaroWinklerSimilarity("abcXefgh", "abcdXXXX");
    assert(fourPrefix > threePrefix);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
