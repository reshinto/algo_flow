// Circle Sort — recursively compare elements from outer edges toward center, repeat until no swaps
fn circle_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    // Repeat full passes until no swaps occur
    let mut swapped = true;
    while swapped {
        swapped = circle_sort_pass(&mut sorted_array, 0, array_length as isize - 1);
    }

    sorted_array // @step:complete
}

// Recursively compare and swap elements from the outer edges inward
fn circle_sort_pass(sorted_array: &mut Vec<i64>, left_index: isize, right_index: isize) -> bool {
    if left_index >= right_index {
        return false;
    }

    let mut swapped = false;
    let mut low = left_index;
    let mut high = right_index;

    while low < high {
        // @step:compare
        if sorted_array[low as usize] > sorted_array[high as usize] {
            // @step:swap
            sorted_array.swap(low as usize, high as usize); // @step:swap
            swapped = true;
        }
        low += 1;
        high -= 1;
    }

    // If the midpoint element is reached (odd-length segment), compare it with one above
    if low == high {
        if sorted_array[low as usize] > sorted_array[(high + 1) as usize] {
            // @step:swap
            sorted_array.swap(low as usize, (high + 1) as usize); // @step:swap
            swapped = true;
        }
    }

    let midpoint = (left_index + right_index) / 2;
    let left_swapped = circle_sort_pass(sorted_array, left_index, midpoint);
    let right_swapped = circle_sort_pass(sorted_array, midpoint + 1, right_index);

    swapped || left_swapped || right_swapped
}
