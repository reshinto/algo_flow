package main

import (
	"math"
	"testing"
)

func approxEqual(actual, expected, tolerance float64) bool {
	return math.Abs(actual-expected) < tolerance
}

func TestMovingAverageFromStreamDefaultK3(t *testing.T) {
	result := movingAverageFromStream([]float64{1, 10, 3, 5}, 3)
	if !approxEqual(result[0], 1.0, 0.001) {
		t.Errorf("result[0]: expected ~1.0, got %f", result[0])
	}
	if !approxEqual(result[1], 5.5, 0.001) {
		t.Errorf("result[1]: expected ~5.5, got %f", result[1])
	}
	if !approxEqual(result[2], 4.667, 0.01) {
		t.Errorf("result[2]: expected ~4.667, got %f", result[2])
	}
	if !approxEqual(result[3], 6.0, 0.001) {
		t.Errorf("result[3]: expected ~6.0, got %f", result[3])
	}
}

func TestMovingAverageFromStreamK1(t *testing.T) {
	result := movingAverageFromStream([]float64{4, 7, 2}, 1)
	expected := []float64{4, 7, 2}
	for idx, exp := range expected {
		if !approxEqual(result[idx], exp, 0.001) {
			t.Errorf("result[%d]: expected %f, got %f", idx, exp, result[idx])
		}
	}
}

func TestMovingAverageFromStreamSingle(t *testing.T) {
	result := movingAverageFromStream([]float64{42}, 3)
	if !approxEqual(result[0], 42.0, 0.001) {
		t.Errorf("expected 42.0")
	}
}

func TestMovingAverageFromStreamK2(t *testing.T) {
	result := movingAverageFromStream([]float64{10, 20, 30, 40}, 2)
	expected := []float64{10.0, 15.0, 25.0, 35.0}
	for idx, exp := range expected {
		if !approxEqual(result[idx], exp, 0.001) {
			t.Errorf("result[%d]: expected %f, got %f", idx, exp, result[idx])
		}
	}
}

func TestMovingAverageFromStreamIdentical(t *testing.T) {
	result := movingAverageFromStream([]float64{5, 5, 5, 5}, 3)
	for _, avg := range result {
		if !approxEqual(avg, 5.0, 0.001) {
			t.Errorf("expected ~5.0, got %f", avg)
		}
	}
}
