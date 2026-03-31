# main.py
import flask # type: ignore
import os

app = flask.Flask(__name__)

# Route chính /api
@app.route('/api')
def api_root():
    return {'message': 'API is working!'}

# Route root để test nhanh
@app.route('/')
def home():
    return {'message': 'Welcome to my API!'}

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=port)