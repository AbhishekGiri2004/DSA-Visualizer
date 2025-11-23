#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

int queue[MAX];
int front = 0, rear = -1;

void enqueue(int val) {
    if (rear < MAX - 1)
        queue[++rear] = val;
}

void dequeue() {
    if (front <= rear)
        front++;
}

void write_output() {
    FILE *f = fopen("output.txt", "w");
    for (int i = front; i <= rear; i++) {
        fprintf(f, "%d ", queue[i]);
    }
    fclose(f);
}

int main() {
    FILE *f = fopen("input.txt", "r");
    char cmd[10];
    int val;

    while (fscanf(f, "%s", cmd) != EOF) {
        if (strcmp(cmd, "enqueue") == 0) {
            fscanf(f, "%d", &val);
            enqueue(val);
        } else if (strcmp(cmd, "dequeue") == 0) {
            dequeue();
        }
    }

    fclose(f);
    write_output();
    return 0;
}
