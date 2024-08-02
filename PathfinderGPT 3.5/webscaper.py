import requests
from bs4 import BeautifulSoup
import json

def scrape_to_jsonl(url, output_jsonl):
    # Send a request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code != 200:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
        return
    
    # Parse the content of the webpage
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract text from the webpage
    text = soup.get_text(separator='\n', strip=True)
    
    # Create a dictionary to hold the scraped data
    scraped_data = {
        'url': url,
        'content': text
    }
    
    # Save the data to a JSONL file
    with open(output_jsonl, 'a', encoding='utf-8') as jsonl_file:
        jsonl_file.write(json.dumps(scraped_data, ensure_ascii=False) + '\n')
    
    print(f"Data appended to {output_jsonl}")

# Example usage
url = '' # look up a website with the steps to join a job and input it here 
output_jsonl = 'Lawyer3.jsonl' # name the file with the job and with the endname jsonL
scrape_to_jsonl(url, output_jsonl)
