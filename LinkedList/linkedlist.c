#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void insert(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (head == NULL) {
        head = newNode;
    } else {
        struct Node* temp = head;
        while (temp->next != NULL) temp = temp->next;
        temp->next = newNode;
    }
}

void delete(int val) {
    struct Node *temp = head, *prev = NULL;
    while (temp != NULL && temp->data != val) {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) return;
    if (prev == NULL) {
        head = temp->next;
    } else {
        prev->next = temp->next;
    }
    free(temp);
}

void write_output() {
    FILE* f = fopen("output.txt", "w");
    struct Node* temp = head;
    while (temp != NULL) {
        fprintf(f, "%d ", temp->data);
        temp = temp->next;
    }
    fclose(f);
}

int main() {
    FILE* f = fopen("input.txt", "r");
    char cmd[10];
    int val;

    while (fscanf(f, "%s", cmd) != EOF) {
        if (strcmp(cmd, "insert") == 0) {
            fscanf(f, "%d", &val);
            insert(val);
        } else if (strcmp(cmd, "delete") == 0) {
            fscanf(f, "%d", &val);
            delete(val);
        }
    }

    fclose(f);
    write_output();
    return 0;
}
