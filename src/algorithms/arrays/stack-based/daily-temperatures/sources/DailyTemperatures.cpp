// Daily Temperatures — monotonic stack: for each day, find how many days until a warmer temperature (0 if none)
#include <vector>
#include <stack>

std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
    int arrayLength = (int)temperatures.size();
    std::vector<int> waitDays(arrayLength, 0); // @step:initialize
    std::stack<int> pendingStack; // @step:initialize

    for (int dayIndex = 0; dayIndex < arrayLength; dayIndex++) {
        int todayTemp = temperatures[dayIndex]; // @step:visit

        while (!pendingStack.empty()) {
            int stackTop = pendingStack.top(); // @step:compare
            if (temperatures[stackTop] < todayTemp) { // @step:compare
                pendingStack.pop(); // @step:compare
                waitDays[stackTop] = dayIndex - stackTop; // @step:compare
            } else {
                break;
            }
        }

        pendingStack.push(dayIndex); // @step:visit
    }

    return waitDays; // @step:complete
}
