package main

import (
	"reflect"
	"testing"
)

func TestAsteroidCollisionSmallerDestroyed(t *testing.T) {
	if !reflect.DeepEqual(asteroidCollision([]int{5, 10, -5}), []int{5, 10}) {
		t.Errorf("expected [5 10]")
	}
}

func TestAsteroidCollisionBothExplode(t *testing.T) {
	if len(asteroidCollision([]int{8, -8})) != 0 {
		t.Errorf("expected []")
	}
}

func TestAsteroidCollisionLargerSurvives(t *testing.T) {
	if !reflect.DeepEqual(asteroidCollision([]int{10, 2, -5}), []int{10}) {
		t.Errorf("expected [10]")
	}
}

func TestAsteroidCollisionNoCollision(t *testing.T) {
	if !reflect.DeepEqual(asteroidCollision([]int{-2, -1, 1, 2}), []int{-2, -1, 1, 2}) {
		t.Errorf("expected [-2 -1 1 2]")
	}
}

func TestAsteroidCollisionChainEqual(t *testing.T) {
	if len(asteroidCollision([]int{1, -1, 1, -1})) != 0 {
		t.Errorf("expected []")
	}
}

func TestAsteroidCollisionLargeLeftMover(t *testing.T) {
	if !reflect.DeepEqual(asteroidCollision([]int{1, 2, 3, -10}), []int{-10}) {
		t.Errorf("expected [-10]")
	}
}

func TestAsteroidCollisionBothLeftMovers(t *testing.T) {
	if !reflect.DeepEqual(asteroidCollision([]int{-5, -3}), []int{-5, -3}) {
		t.Errorf("expected [-5 -3]")
	}
}

func TestAsteroidCollisionEmpty(t *testing.T) {
	result := asteroidCollision([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}
