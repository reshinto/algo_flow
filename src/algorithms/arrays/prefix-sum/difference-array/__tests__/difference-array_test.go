package differencearray

import (
	"reflect"
	"testing"
)

func TestSingleRangeUpdate(t *testing.T) {
	result := differenceArray(5, [][3]int{{1, 3, 3}})
	if !reflect.DeepEqual(result, []int{0, 3, 3, 3, 0}) {
		t.Errorf("got %v", result)
	}
}

func TestOverlappingUpdates(t *testing.T) {
	result := differenceArray(5, [][3]int{{0, 4, 1}, {1, 3, 2}})
	if !reflect.DeepEqual(result, []int{1, 3, 3, 3, 1}) {
		t.Errorf("got %v", result)
	}
}

func TestFullRangeUpdate(t *testing.T) {
	result := differenceArray(4, [][3]int{{0, 3, 5}})
	if !reflect.DeepEqual(result, []int{5, 5, 5, 5}) {
		t.Errorf("got %v", result)
	}
}

func TestSingleElementUpdate(t *testing.T) {
	result := differenceArray(4, [][3]int{{2, 2, 7}})
	if !reflect.DeepEqual(result, []int{0, 0, 7, 0}) {
		t.Errorf("got %v", result)
	}
}

func TestNoUpdates(t *testing.T) {
	result := differenceArray(5, [][3]int{})
	if !reflect.DeepEqual(result, []int{0, 0, 0, 0, 0}) {
		t.Errorf("got %v", result)
	}
}

func TestNegativeDelta(t *testing.T) {
	result := differenceArray(5, [][3]int{{1, 3, -4}})
	if !reflect.DeepEqual(result, []int{0, -4, -4, -4, 0}) {
		t.Errorf("got %v", result)
	}
}

func TestDefaultInput(t *testing.T) {
	result := differenceArray(8, [][3]int{{1, 4, 3}, {2, 6, -1}, {0, 3, 2}})
	if !reflect.DeepEqual(result, []int{2, 5, 4, 4, 2, -1, -1, 0}) {
		t.Errorf("got %v", result)
	}
}
