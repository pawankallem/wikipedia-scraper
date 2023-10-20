import requests
from flask import jsonify, request, render_template
from app import app
from bs4 import BeautifulSoup

@app.route('/')
def index():
    return jsonify("server listening now .... ")
    # return render_template("index.html")

@app.post('/execute_url')
def execute_url():
    req = request.json
    url = req.get("url")
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        paragraphs = soup.find_all('p')

        first_paragraph = None
        for paragraph in paragraphs:
            if paragraph.text.strip():
                first_paragraph = paragraph
                break

        if first_paragraph:
            return jsonify({"data": str(first_paragraph)})
        else:
            return "No suitable content found on the page."

    except Exception as e:
        return str(e)

