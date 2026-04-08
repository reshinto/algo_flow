import java.util.*;

// Prim's Algorithm — grow MST from start node by always selecting the cheapest outgoing edge
public class Prims {
    record MSTEdge(String source, String target, int weight) {}

    public static List<MSTEdge> primsAlgorithm(
            Map<String, List<Object[]>> adjacencyList,
            String startNodeId) {
        List<MSTEdge> mstEdges = new ArrayList<>(); // @step:initialize
        Set<String> inMstSet = new HashSet<>(); // @step:initialize
        inMstSet.add(startNodeId); // @step:initialize

        // Priority queue stores {weight, sourceId, targetId}
        PriorityQueue<Object[]> priorityQueue = new PriorityQueue<>(
                Comparator.comparingInt(entry -> (Integer) entry[0])); // @step:initialize

        for (Object[] neighborEntry : adjacencyList.getOrDefault(startNodeId, Collections.emptyList())) { // @step:initialize
            priorityQueue.offer(new Object[]{((Number) neighborEntry[1]).intValue(), startNodeId, neighborEntry[0]}); // @step:initialize
        }

        while (!priorityQueue.isEmpty()) {
            Object[] top = priorityQueue.poll(); // @step:dequeue
            int edgeWeight = (Integer) top[0]; // @step:dequeue
            String sourceId = (String) top[1]; // @step:dequeue
            String targetId = (String) top[2]; // @step:dequeue

            if (inMstSet.contains(targetId)) { // @step:dequeue
                continue;
            }

            inMstSet.add(targetId); // @step:visit
            mstEdges.add(new MSTEdge(sourceId, targetId, edgeWeight)); // @step:add-to-mst

            for (Object[] neighborEntry : adjacencyList.getOrDefault(targetId, Collections.emptyList())) { // @step:relax-edge
                if (!inMstSet.contains(neighborEntry[0])) { // @step:relax-edge
                    priorityQueue.offer(new Object[]{ // @step:relax-edge
                        ((Number) neighborEntry[1]).intValue(), targetId, neighborEntry[0]
                    });
                }
            }
        }

        return mstEdges; // @step:complete
    }
}
