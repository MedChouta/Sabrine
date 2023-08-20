from faster_whisper import WhisperModel

class Transcribe(WhisperModel):
    """
        Inherits the WhisperModel class

        This class will handle every aspect of the audio transcription 

    """
    def __init__(self, filename, model_size="medium", device="cpu", compute_type="int8"):
        self.filename = filename
        self.model_size = model_size
        self.device = device
        self.compute_type = compute_type

        super().__init__(self.model_size, device=self.device, compute_type=self.compute_type)

    
    def transcribe(self, b_size=5):

        """
            returns the full transcript of the mp3 file
            
            uses the original transcribe method from the WhisperModel class
        """

        transcript = ""
        segments, info = super().transcribe(self.filename, beam_size=b_size)

        print("Detected language '%s' with probability %f" % (info.language, info.language_probability))

        for segment in segments:
            transcript += "[%.2fs -> %.2fs] %s\n" % (segment.start, segment.end, segment.text)

        return transcript
        