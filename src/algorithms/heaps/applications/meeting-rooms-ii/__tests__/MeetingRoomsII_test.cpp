#include "../sources/MeetingRoomsII.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{0,30},{5,10},{15,20}}) == 2);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{0,30},{5,10},{15,20},{2,7}}) == 3);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{0,5},{5,10},{10,15}}) == 1);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{0,100},{1,99},{2,98}}) == 3);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{}) == 0);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{0,30}}) == 1);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{15,20},{5,10},{0,30}}) == 2);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{0,10},{10,20},{10,30}}) == 2);
    assert(meetingRoomsII(std::vector<std::pair<int,int>>{{0,5},{0,5}}) == 2);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
