from flask import Flask, render_template, request, jsonify
import subprocess, os

app = Flask(__name__)

# --- HOME PAGE ---
@app.route('/')
def home():
    return render_template('index.html')


# --- STACK ---
@app.route('/stack')
def stack_page():
    return render_template('stack.html')

@app.route('/stack/run', methods=['POST'])
def run_stack():
    input_data = request.json['input']
    with open('Stack/input.txt', 'w') as f:
        f.write(input_data)
    subprocess.run(['./Stack/stack_exec'])
    return '', 204

@app.route('/stack/result')
def stack_result():
    with open('Stack/output.txt', 'r') as f:
        output = [line.strip() for line in f.readlines()]
    return jsonify({'output': output})


# --- QUEUE ---
@app.route('/queue')
def queue_page():
    return render_template('queue.html')

@app.route('/queue/run', methods=['POST'])
def run_queue():
    input_data = request.json['input']
    with open('Queue/input.txt', 'w') as f:
        f.write(input_data)
    subprocess.run(['./Queue/queue_exec'])
    return '', 204

@app.route('/queue/result')
def queue_result():
    with open('Queue/output.txt', 'r') as f:
        output = [line.strip() for line in f.readlines()]
    return jsonify({'output': output})


# --- LINKED LIST ---
@app.route('/linkedlist')
def ll_page():
    return render_template('linkedlist.html')

@app.route('/linkedlist/run', methods=['POST'])
def run_ll():
    input_data = request.json['input']
    with open('LinkedList/input.txt', 'w') as f:
        f.write(input_data)
    subprocess.run(['./LinkedList/linkedlist_exec'])
    return '', 204

@app.route('/linkedlist/result')
def ll_result():
    with open('LinkedList/output.txt', 'r') as f:
        output = [line.strip() for line in f.readlines()]
    return jsonify({'output': output})


# --- TREE ---
@app.route('/tree')
def tree_page():
    return render_template('tree.html')

@app.route('/tree/run', methods=['POST'])
def run_tree():
    input_data = request.json['input']
    with open('Tree/input.txt', 'w') as f:
        f.write(input_data)
    subprocess.run(['./Tree/tree_exec'])
    return '', 204

@app.route('/tree/result')
def tree_result():
    with open('Tree/output.txt', 'r') as f:
        output = [line.strip() for line in f.readlines()]
    return jsonify({'output': output})


# --- PRIMS ---
@app.route('/prims')
def prims_page():
    return render_template('prims.html')

@app.route('/prims/run', methods=['POST'])
def run_prims():
    input_data = request.json['input']
    with open('Graph/Prims/input.txt', 'w') as f:
        f.write(input_data)
    subprocess.run(['./Graph/Prims/prims_exec'])
    return '', 204

@app.route('/prims/result')
def prims_result():
    with open('Graph/Prims/output.txt', 'r') as f:
        output = [line.strip() for line in f.readlines()]
    return jsonify({'output': output})


# --- KRUSKAL ---
@app.route('/kruskal')
def kruskal_page():
    return render_template('kruskal.html')

@app.route('/kruskal/run', methods=['POST'])
def run_kruskal():
    input_data = request.json['input']
    with open('Graph/Kruskal/input.txt', 'w') as f:
        f.write(input_data)
    subprocess.run(['./Graph/Kruskal/kruskal_exec'])
    return '', 204

@app.route('/kruskal/result')
def kruskal_result():
    with open('Graph/Kruskal/output.txt', 'r') as f:
        output = [line.strip() for line in f.readlines()]
    return jsonify({'output': output})


# --- DIJKSTRA ---
@app.route('/dijkstra')
def dijkstra_page():
    return render_template('dijkstra.html')

@app.route('/dijkstra/run', methods=['POST'])
def run_dijkstra():
    input_data = request.json['input']
    with open('Graph/Dijkstra/input.txt', 'w') as f:
        f.write(input_data)
    subprocess.run(['./Graph/Dijkstra/dijkstra_exec'])
    return '', 204

@app.route('/dijkstra/result')
def dijkstra_result():
    with open('Graph/Dijkstra/output.txt', 'r') as f:
        output = [line.strip() for line in f.readlines()]
    return jsonify({'output': output})


# --- RUN SERVER ---
if __name__ == '__main__':
    app.run(debug=True)
