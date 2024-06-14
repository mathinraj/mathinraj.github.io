from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    df = pd.read_excel(file)

    # Process the DataFrame to generate the required table data
    departments = df['Duty Department'].unique()
    data = {dept: {'count': 0, 'failures': {}} for dept in departments}
    
    for _, row in df.iterrows():
        dept = row['Duty Department']
        failure_desc = row['Failure Description']
        
        data[dept]['count'] += 1
        if failure_desc in data[dept]['failures']:
            data[dept]['failures'][failure_desc] += 1
        else:
            data[dept]['failures'][failure_desc] = 1
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
