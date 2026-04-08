// American Flag Sort — in-place MSD radix sort: count digit frequencies, compute offsets, permute in-place
fn american_flag_pass(arr: &mut Vec<i64>, start: usize, end: usize, divisor: i64, base: usize) {
    if end - start <= 1 || divisor < 1 {
        return;
    }

    // Count digit frequencies
    let mut counts = vec![0i64; base]; // @step:count
    for count_index in start..end {
        // @step:extract-digit,compare
        let digit = ((arr[count_index] / divisor) % base as i64) as usize; // @step:extract-digit,compare
        counts[digit] += 1; // @step:count
    }

    // Compute bucket offsets (prefix sums)
    let mut offsets = vec![0usize; base]; // @step:count
    offsets[0] = start; // @step:count
    for offset_index in 1..base {
        offsets[offset_index] = offsets[offset_index - 1] + counts[offset_index - 1] as usize; // @step:count
    }

    // Track bucket boundaries for sub-range recursion
    let boundaries = offsets.clone(); // @step:count

    // Permute elements in-place into correct buckets
    for bucket_digit in 0..base {
        let bucket_end = boundaries[bucket_digit] + counts[bucket_digit] as usize; // @step:swap
        while offsets[bucket_digit] < bucket_end {
            // @step:swap
            let current_pos = offsets[bucket_digit]; // @step:swap
            let digit = ((arr[current_pos] / divisor) % base as i64) as usize; // @step:extract-digit
            if digit == bucket_digit {
                offsets[bucket_digit] += 1; // @step:swap
            } else {
                let swap_target = offsets[digit]; // @step:swap
                arr.swap(current_pos, swap_target); // @step:swap
                offsets[digit] += 1; // @step:swap
            }
        }
    }

    // Recursively sort each bucket by the next digit
    if divisor > 1 {
        let next_divisor = divisor / base as i64; // @step:mark-sorted
        for recursive_digit in 0..base {
            if counts[recursive_digit] > 1 {
                american_flag_pass(
                    arr,
                    boundaries[recursive_digit],
                    boundaries[recursive_digit] + counts[recursive_digit] as usize,
                    next_divisor,
                    base,
                ); // @step:mark-sorted
            }
        }
    }
}

fn american_flag_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:complete
    }

    // Shift all values to be non-negative
    let min_value = *sorted_array.iter().min().unwrap(); // @step:initialize
    let offset = if min_value < 0 { -min_value } else { 0 }; // @step:initialize
    for shift_index in 0..array_length {
        sorted_array[shift_index] += offset; // @step:initialize
    }

    let max_value = *sorted_array.iter().max().unwrap(); // @step:initialize
    let digit_base: usize = 10; // @step:initialize
    let mut digit_divisor = 1i64; // @step:initialize
    while max_value / digit_divisor >= digit_base as i64 {
        digit_divisor *= digit_base as i64; // @step:initialize
    }

    // Process MSD (most significant digit) first, recursively refine
    american_flag_pass(&mut sorted_array, 0, array_length, digit_divisor, digit_base);

    // Shift values back
    for unshift_index in 0..array_length {
        sorted_array[unshift_index] -= offset; // @step:mark-sorted
    }

    sorted_array // @step:complete
}
