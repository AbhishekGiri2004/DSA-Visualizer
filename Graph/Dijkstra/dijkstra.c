#include <stdio.h>
#include <limits.h>

#define MAX 100
#define INF 99999

int n, source;
int graph[MAX][MAX], dist[MAX];
int visited[MAX];

void dijkstra() {
    for (int i = 0; i < n; i++) {
        dist[i] = INF;
        visited[i] = 0;
    }
    dist[source] = 0;

    for (int count = 0; count < n - 1; count++) {
        int min = INF, u = -1;
        for (int v = 0; v < n; v++)
            if (!visited[v] && dist[v] < min)
                min = dist[v], u = v;

        visited[u] = 1;
        for (int v = 0; v < n; v++)
            if (!visited[v] && graph[u][v] && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }

    FILE *fout = fopen("output.txt", "w");
    for (int i = 0; i < n; i++) {
        if (dist[i] == INF)
            fprintf(fout, "0 to %d = INF\n", i);
        else
            fprintf(fout, "0 to %d = %d\n", i, dist[i]);
    }
    fclose(fout);
}

int main() {
    FILE *fin = fopen("input.txt", "r");
    fscanf(fin, "%d", &n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            fscanf(fin, "%d", &graph[i][j]);
    fscanf(fin, "%d", &source);
    fclose(fin);

    dijkstra();
    return 0;
}
