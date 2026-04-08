#include "../sources/FindPeakElement.cpp"
#include <cassert>
#include <vector>
#include <climits>

int main() {
    assert(findPeakElement({1, 3, 20, 4, 1, 0}) == 2);
    assert(findPeakElement({5, 4, 3, 2, 1}) == 0);
    assert(findPeakElement({1, 2, 3, 4, 5}) == 4);
    assert(findPeakElement({42}) == 0);
    assert(findPeakElement({10, 5}) == 0);
    assert(findPeakElement({5, 10}) == 1);
    assert(findPeakElement({1, 2, 3, 5, 3, 2, 1}) == 3);
    assert(findPeakElement({3, 2, 1}) == 0);

    // Verify a valid peak is returned for a multiple-peak array
    std::vector<int> multiplePeakArray = {1, 5, 2, 7, 3};
    int peakIndex = findPeakElement(multiplePeakArray);
    int peakValue = multiplePeakArray[peakIndex];
    int leftNeighbor = peakIndex > 0 ? multiplePeakArray[peakIndex - 1] : INT_MIN;
    int rightNeighbor = peakIndex < static_cast<int>(multiplePeakArray.size()) - 1
        ? multiplePeakArray[peakIndex + 1] : INT_MIN;
    assert(peakValue > leftNeighbor);
    assert(peakValue > rightNeighbor);

    return 0;
}
