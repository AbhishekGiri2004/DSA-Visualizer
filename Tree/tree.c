#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

struct Node* root = NULL;

struct Node* insert(struct Node* node, int val) {
    if (node == NULL) {
        struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
        temp->data = val;
        temp->left = temp->right = NULL;
        return temp;
    }
    if (val < node->data)
        node->left = insert(node->left, val);
    else if (val > node->data)
        node->right = insert(node->right, val);
    return node;
}

struct Node* findMin(struct Node* node) {
    while (node && node->left != NULL)
        node = node->left;
    return node;
}

struct Node* delete(struct Node* node, int val) {
    if (node == NULL)
        return NULL;
    if (val < node->data)
        node->left = delete(node->left, val);
    else if (val > node->data)
        node->right = delete(node->right, val);
    else {
        if (node->left == NULL) {
            struct Node* temp = node->right;
            free(node);
            return temp;
        } else if (node->right == NULL) {
            struct Node* temp = node->left;
            free(node);
            return temp;
        }
        struct Node* temp = findMin(node->right);
        node->data = temp->data;
        node->right = delete(node->right, temp->data);
    }
    return node;
}

void inorder(struct Node* node, FILE* f) {
    if (node != NULL) {
        inorder(node->left, f);
        fprintf(f, "%d ", node->data);
        inorder(node->right, f);
    }
}

int main() {
    FILE* fin = fopen("input.txt", "r");
    char cmd[10];
    int val;
    while (fscanf(fin, "%s", cmd) != EOF) {
        if (strcmp(cmd, "insert") == 0) {
            fscanf(fin, "%d", &val);
            root = insert(root, val);
        } else if (strcmp(cmd, "delete") == 0) {
            fscanf(fin, "%d", &val);
            root = delete(root, val);
        }
    }
    fclose(fin);

    FILE* fout = fopen("output.txt", "w");
    inorder(root, fout);
    fclose(fout);
    return 0;
}
