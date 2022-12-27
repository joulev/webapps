import os
import json
from http.server import BaseHTTPRequestHandler
from ytmusicapi import YTMusic

auth = YTMusic.setup(headers_raw=os.environ['YTMUSIC_HEADERS_RAW'])
ytmusic = YTMusic(auth)


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        # We do not get the currently played song, only the last played song
        # I found it to reflect what I *actually* play more accurately
        # as I sometimes just stop playing after a few seconds of the next song
        # due to whatever reasons.
        first_history = ytmusic.get_history()[1]
        message = {
            'videoId': first_history['videoId'],
            'title': first_history['title'],
            'artists': first_history['artists']
        }
        self.wfile.write(json.dumps(message).encode())
        return
