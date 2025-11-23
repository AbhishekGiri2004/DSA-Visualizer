#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

int stack[MAX];
int top = -1;

void push(int val) {
    if (top >= MAX - 1) return;
    stack[++top] = val;
}

void pop() {
    if (top >= 0) top--;
}

void write_output() {
    FILE *f = fopen("output.txt", "w");
    for (int i = 0; i <= top; i++) {
        fprintf(f, "%d ", stack[i]);
    }
    fclose(f);
}

int main() {
    FILE *f = fopen("input.txt", "r");
    char cmd[10];
    int val;

    while (fscanf(f, "%s", cmd) != EOF) {
        if (strcmp(cmd, "push") == 0) {
            fscanf(f, "%d", &val);
            push(val);
        } else if (strcmp(cmd, "pop") == 0) {
            pop();
        }
    }

    fclose(f);
    write_output();
    return 0;
}
