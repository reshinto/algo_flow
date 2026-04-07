// Happy Number — detect happy numbers using digit-square-sum cycling with a hash set
#include <unordered_set>

int digitSquareSum(int num) {
    int total = 0; // @step:initialize
    while (num > 0) {
        int digit = num % 10;
        total += digit * digit;
        num /= 10;
    }
    return total;
}

bool happyNumber(int startNumber) {
    std::unordered_set<int> seen; // @step:initialize
    int current = startNumber;
    while (current != 1) {
        seen.insert(current); // @step:insert-key
        current = digitSquareSum(current); // @step:process-element
        if (seen.count(current)) {
            // @step:check-duplicate
            return false; // @step:key-found
        }
    }
    return true; // @step:complete
}
