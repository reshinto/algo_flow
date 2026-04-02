# Cuckoo Filter — probabilistic membership data structure using fingerprint-based cuckoo hashing.
# Elements are stored as fingerprints in a bucket array. Each element maps to 2 candidate buckets.
# If both buckets are full, an existing element is evicted and re-inserted at its alternate bucket.
# Time: O(1) amortized per insert/query, Space: O(n)


def fingerprint(value: int) -> int:
    return ((value * 2654435761) & 0xFFFFFFFF) & 0xFF


def primary_bucket(value: int, bucket_count: int) -> int:
    return abs(value) % bucket_count


def alternate_bucket(bucket_idx: int, fp: int, bucket_count: int) -> int:
    result = bucket_idx ^ (fp * 0x5BD1E995)
    return abs(result) % bucket_count


def cuckoo_filter(
    elements: list[int], queries: list[int], bucket_count: int
) -> dict[str, list[dict[str, object]]]:
    buckets: list[int | None] = [None] * bucket_count  # @step:initialize
    max_evictions = 500

    # Insert phase
    for element in elements:
        fp = fingerprint(element)  # @step:hash-element
        primary = primary_bucket(element, bucket_count)
        alternate = alternate_bucket(primary, fp, bucket_count)

        if buckets[primary] is None:
            buckets[primary] = fp  # @step:insert-bucket
        elif buckets[alternate] is None:
            buckets[alternate] = fp  # @step:insert-bucket
        else:
            # Evict from primary and re-insert the displaced fingerprint
            current_bucket = primary
            displaced_fp = fp

            for _ in range(max_evictions):
                evicted = buckets[current_bucket] if buckets[current_bucket] is not None else 0
                buckets[current_bucket] = displaced_fp  # @step:evict-element
                displaced_fp = evicted
                current_bucket = alternate_bucket(current_bucket, displaced_fp, bucket_count)

                if buckets[current_bucket] is None:
                    buckets[current_bucket] = displaced_fp  # @step:insert-bucket
                    break

    # Query phase
    results = []

    for query in queries:
        fp = fingerprint(query)  # @step:hash-element
        primary = primary_bucket(query, bucket_count)
        alternate = alternate_bucket(primary, fp, bucket_count)

        found = buckets[primary] == fp or buckets[alternate] == fp

        if found:
            pass  # @step:member-found
        else:
            pass  # @step:member-not-found

        results.append({"value": query, "found": found})

    return {"results": results}  # @step:complete
