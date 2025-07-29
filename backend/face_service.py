from flask import Flask, request, jsonify
import face_recognition
import numpy as np

app = Flask(__name__)

@app.route('/encode', methods=['POST'])
def encode():
    file = request.files['image']
    img = face_recognition.load_image_file(file)
    encodings = face_recognition.face_encodings(img)
    if not encodings:
        return jsonify({'error': 'No face found'}), 400
    return jsonify({'encoding': encodings[0].tolist()})

@app.route('/compare', methods=['POST'])
def compare():
    data = request.json
    known = np.array(data['known'])
    unknown = np.array(data['unknown'])
    distance = np.linalg.norm(known - unknown)
    match = distance < 0.5
    return jsonify({'match': match, 'distance': float(distance)})

if __name__ == '__main__':
    app.run(port=5001) 