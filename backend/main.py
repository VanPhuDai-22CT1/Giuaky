# main.py
# Entry point for backend (Python Flask example)
from flask import Flask
import os

app = Flask(__name__)

@app.route('/api')
def api_root():
    return {'message': 'API is working!'}

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=port)
