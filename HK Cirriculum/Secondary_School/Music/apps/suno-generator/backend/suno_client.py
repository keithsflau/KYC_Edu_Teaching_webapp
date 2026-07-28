import requests
import json
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SunoClient:
    BASE_URL = "https://studio-api.prod.suno.com/api"

    def __init__(self, cookie: str):
        self.cookie = cookie
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Content-Type": "text/plain;charset=UTF-8",
            "Origin": "https://suno.com",
            "Referer": "https://suno.com/"
        }
        
        # Smart detection: Cookie vs Bearer Token
        if "Bearer " in cookie or cookie.startswith("eyJ"):
            token = cookie if "Bearer " in cookie else f"Bearer {cookie}"
            self.headers["Authorization"] = token
        else:
            self.headers["Cookie"] = cookie

    def generate(self, prompt: str, is_instrumental: bool = False, tags: str = "", title: str = ""):
        url = f"{self.BASE_URL}/generate/v2/"
        payload = {
            "gpt_description_prompt": prompt,
            "mv": "chirp-v3-5", 
            "prompt": "", # Custom mode vs Description mode differences
            "make_instrumental": is_instrumental
        }
        
        # If custom mode (tags/title provided), different payload structure usually
        if tags or title:
            payload = {
                "prompt": prompt, # Lyrics
                "tags": tags,
                "title": title,
                "mv": "chirp-v3-5",
                "make_instrumental": is_instrumental,
                "continue_clip_id": None,
                "continue_at": None
            }

        logger.info(f"Generating with payload: {payload}")
        
        response = requests.post(url, headers=self.headers, data=json.dumps(payload))
        if response.status_code != 200:
            logger.error(f"Error generating: {response.text}")
            return {"error": response.text}
        
        return response.json()

    def get_feed(self):
        url = f"{self.BASE_URL}/feed/?page=0"
        response = requests.get(url, headers=self.headers)
        return response.json()
        
    def get_ids(self, ids: list):
        url = f"{self.BASE_URL}/feed/?ids={','.join(ids)}"
        response = requests.get(url, headers=self.headers)
        return response.json()
