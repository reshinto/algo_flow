// Meeting Rooms II — find minimum number of meeting rooms required using a min-heap of end times
#include <vector>
#include <algorithm>

int meetingRoomsII(const std::vector<std::pair<int,int>>& intervals) {
    if (intervals.empty()) return 0; // @step:initialize

    // Sort meetings by start time
    std::vector<std::pair<int,int>> sorted = intervals; // @step:initialize
    std::sort(sorted.begin(), sorted.end()); // @step:initialize

    // Min-heap tracking end times of active meetings
    std::vector<int> endTimeHeap; // @step:initialize

    for (auto& meeting : sorted) {
        int startTime = meeting.first;
        int endTime = meeting.second;

        if (!endTimeHeap.empty() && endTimeHeap[0] <= startTime) {
            // A room is free — extract its end time and reuse the room
            endTimeHeap[0] = endTimeHeap.back(); // @step:heap-extract
            endTimeHeap.pop_back(); // @step:heap-extract
            // Sift down to restore min-heap property
            int parentIdx = 0; // @step:sift-down
            while (true) {
                int smallestIdx = parentIdx; // @step:sift-down
                int leftIdx = 2 * parentIdx + 1; // @step:sift-down
                int rightIdx = 2 * parentIdx + 2; // @step:sift-down
                if (leftIdx < (int)endTimeHeap.size() && endTimeHeap[leftIdx] < endTimeHeap[smallestIdx]) {
                    // @step:compare
                    smallestIdx = leftIdx;
                }
                if (rightIdx < (int)endTimeHeap.size() && endTimeHeap[rightIdx] < endTimeHeap[smallestIdx]) {
                    // @step:compare
                    smallestIdx = rightIdx;
                }
                if (smallestIdx == parentIdx) break; // @step:sift-down
                std::swap(endTimeHeap[parentIdx], endTimeHeap[smallestIdx]); // @step:heap-swap
                parentIdx = smallestIdx; // @step:sift-down
            }
        }

        // Insert current meeting's end time into the heap (allocate room)
        endTimeHeap.push_back(endTime); // @step:heap-insert
        int currentIdx = (int)endTimeHeap.size() - 1; // @step:heap-insert
        // Sift up to restore min-heap property
        while (currentIdx > 0) {
            // @step:sift-up
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (endTimeHeap[currentIdx] >= endTimeHeap[parentIdx]) break; // @step:compare
            std::swap(endTimeHeap[currentIdx], endTimeHeap[parentIdx]); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
    }

    return (int)endTimeHeap.size(); // @step:complete
}
