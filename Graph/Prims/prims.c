#include <stdio.h>
#include <limits.h>

#define MAX 100

int parent[MAX];
int key[MAX];
int visited[MAX];
int graph[MAX][MAX];
int n;

int minKey() {
    int min = INT_MAX, min_index;
    for (int v = 0; v < n; v++)
        if (!visited[v] && key[v] < min)
            min = key[v], min_index = v;
    return min_index;
}

void primMST() {
    for (int i = 0; i < n; i++) {
        key[i] = INT_MAX;
        visited[i] = 0;
    }
    key[0] = 0;
    parent[0] = -1;

    for (int count = 0; count < n - 1; count++) {
        int u = minKey();
        visited[u] = 1;

        for (int v = 0; v < n; v++)
            if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
    }

    FILE *fout = fopen("output.txt", "w");
    for (int i = 1; i < n; i++)
        fprintf(fout, "%d - %d : %d\n", parent[i], i, graph[i][parent[i]]);
    fclose(fout);
}

int main() {
    FILE *fin = fopen("input.txt", "r");
    fscanf(fin, "%d", &n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            fscanf(fin, "%d", &graph[i][j]);
    fclose(fin);

    primMST();
    return 0;
}
