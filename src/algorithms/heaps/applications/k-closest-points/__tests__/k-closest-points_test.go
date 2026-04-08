package heaps

import (
	"sort"
	"testing"
)

func distSqKCP(point [2]int) int {
	return point[0]*point[0] + point[1]*point[1]
}

func TestKClosestPointsReturnsK(t *testing.T) {
	points := [][2]int{{3, 3}, {5, -1}, {-2, 4}, {1, 1}, {0, 2}, {-1, -1}, {4, 0}}
	result := kClosestPoints(points, 3)
	if len(result) != 3 {
		t.Fatalf("Expected 3 points, got %d", len(result))
	}
	dists := make([]int, len(points))
	for idx, pt := range points {
		dists[idx] = distSqKCP(pt)
	}
	sort.Ints(dists)
	thirdSmallest := dists[2]
	for _, pt := range result {
		if distSqKCP(pt) > thirdSmallest {
			t.Errorf("Point %v is not among the 3 closest", pt)
		}
	}
}

func TestKClosestPointsK1(t *testing.T) {
	points := [][2]int{{10, 10}, {1, 0}, {5, 5}}
	result := kClosestPoints(points, 1)
	if len(result) != 1 {
		t.Fatalf("Expected 1 point, got %d", len(result))
	}
	if distSqKCP(result[0]) != 1 {
		t.Errorf("Expected dist²=1, got %d", distSqKCP(result[0]))
	}
}

func TestKClosestPointsKEqualsAll(t *testing.T) {
	points := [][2]int{{1, 2}, {3, 4}, {0, 1}}
	result := kClosestPoints(points, 3)
	if len(result) != 3 {
		t.Errorf("Expected 3 points, got %d", len(result))
	}
}

func TestKClosestPointsNegativeCoords(t *testing.T) {
	points := [][2]int{{-3, -4}, {-1, -1}, {0, -2}}
	result := kClosestPoints(points, 1)
	if len(result) != 1 {
		t.Fatalf("Expected 1 point, got %d", len(result))
	}
	if distSqKCP(result[0]) != 2 {
		t.Errorf("Expected dist²=2, got %d", distSqKCP(result[0]))
	}
}

func TestKClosestPointsOrigin(t *testing.T) {
	points := [][2]int{{0, 0}, {1, 1}, {2, 2}}
	result := kClosestPoints(points, 1)
	if distSqKCP(result[0]) != 0 {
		t.Errorf("Expected origin with dist²=0, got %d", distSqKCP(result[0]))
	}
}
