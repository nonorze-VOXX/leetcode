    long long putMarbles(vector<int>& weights, int k) {
        std::priority_queue<int, vector<int>, std::greater<int>>
            min_priority_queue;
        std::priority_queue<int> max_priority_queue;
        for (int i = 1; i < weights.size(); i++) {
            auto diff = weights[i] + weights[i - 1];
            max_priority_queue.push(diff);
            min_priority_queue.push(diff);
        }
        auto count = 0;
        for (int i = 0; i < k - 1; i++) {
            count += max_priority_queue.top() - min_priority_queue.top();
            max_priority_queue.pop();
            min_priority_queue.pop();
        }
        return count;
    }
