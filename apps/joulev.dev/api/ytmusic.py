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
        first_history = ytmusic.get_history()[0]
        self.wfile.write(json.dumps(first_history).encode())
        return
