import json
import random
import time
import urllib.request
import urllib.error
from datetime import datetime
import os
from dotenv import load_dotenv

# Try to load .env from the backend folder
load_dotenv(os.path.join(os.path.dirname(__file__), "backend", ".env"))

FIREBASE_URL = os.environ.get("FIREBASE_URL", "https://neurotech-89e25-default-rtdb.firebaseio.com")
FIREBASE_API_KEY = os.environ.get("FIREBASE_API_KEY", "AIzaSyDo9Xel16clG2IaLbHOV1ZnEwLYA2RV0nE")

# Target the new path: /dummy_testing
TARGET_URL = f"{FIREBASE_URL}/dummy_testing.json?auth={FIREBASE_API_KEY}"

print(f"Target URL: {TARGET_URL}")
print("Starting continuous transmission. Press Ctrl+C to stop.")

def send_dummy_data():
    while True:
        try:
            # Generate dummy payload
            payload = {
                "v1": random.randint(1000, 3000),
                "v2": random.randint(1000, 3000),
                "v3": random.randint(1000, 3000),
                "timestamp": datetime.utcnow().isoformat(),
                "status": "testing"
            }
            
            data = json.dumps(payload).encode('utf-8')
            
            # Using POST to continuously append to the list
            req = urllib.request.Request(TARGET_URL, data=data, method='POST')
            req.add_header('Content-Type', 'application/json')
            
            with urllib.request.urlopen(req) as response:
                response_body = response.read().decode('utf-8')
                print(f"[{datetime.now().strftime('%H:%M:%S')}] Success! Sent dummy values. Response: {response_body}")
                
        except urllib.error.URLError as e:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Error sending data: {e}")
        except KeyboardInterrupt:
            print("\nStopped by user.")
            break
        except Exception as e:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Unexpected error: {e}")
            
        # Send approx once per second
        time.sleep(1)

if __name__ == "__main__":
    try:
        send_dummy_data()
    except KeyboardInterrupt:
        print("\nTransmission stopped.")
