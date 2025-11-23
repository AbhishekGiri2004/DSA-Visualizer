#include <stdio.h>
#include <stdlib.h>

#define MAX 100

typedef struct {
    int u, v, w;
} Edge;

Edge edges[MAX], result[MAX];
int parent[MAX];
int n, e;

int cmp(const void* a, const void* b) {
    Edge* e1 = (Edge*)a;
    Edge* e2 = (Edge*)b;
    return e1->w - e2->w;
}

int find(int i) {
    while (i != parent[i])
        i = parent[i];
    return i;
}

void union_set(int u, int v) {
    int pu = find(u);
    int pv = find(v);
    parent[pu] = pv;
}

void kruskal() {
    FILE* fout = fopen("output.txt", "w");

    int cost = 0, count = 0;
    for (int i = 0; i < n; i++) parent[i] = i;

    qsort(edges, e, sizeof(Edge), cmp);

    for (int i = 0; i < e && count < n - 1; i++) {
        int u = edges[i].u;
        int v = edges[i].v;
        if (find(u) != find(v)) {
            result[count++] = edges[i];
            union_set(u, v);
            cost += edges[i].w;
        }
    }

    for (int i = 0; i < count; i++) {
        fprintf(fout, "%d - %d : %d\n", result[i].u, result[i].v, result[i].w);
    }
    fprintf(fout, "Total Cost: %d\n", cost);
    fclose(fout);
}

int main() {
    FILE* fin = fopen("input.txt", "r");
    fscanf(fin, "%d %d", &n, &e);
    for (int i = 0; i < e; i++) {
        fscanf(fin, "%d %d %d", &edges[i].u, &edges[i].v, &edges[i].w);
    }
    fclose(fin);
    kruskal();
    return 0;
}
