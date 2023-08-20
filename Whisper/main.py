from flask import Flask, request
from transcribe import Transcribe

app = Flask(__name__)

@app.route("/", methods=['GET'])
def transcribe():

    print(request.args)

    transcript = ""
    filename = request.args.get("audio_file")

    with open("../tmp/" + filename, "r") as audio_file:
        t = Transcribe(audio_file.name)

        transcript = t.transcribe()

    return transcript