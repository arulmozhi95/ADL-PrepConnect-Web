from flask import Flask, request, render_template_string
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

app = Flask(__name__)
CORS(app)

BASE_URL = "https://www.geeksforgeeks.org"
COMPANY_PAGES = {
    "Amazon": f"{BASE_URL}/Amazon-topics-interview-preparation/",
    "Oracle": f"{BASE_URL}/oracle-topics-for-interview-preparation/",
    "Google": f"{BASE_URL}/google-topics-interview-preparation/",
    "Microsoft": f"{BASE_URL}/Microsoft-topics-interview-preparation/",
    "Morgan Stanley": f"{BASE_URL}/morgan-stanley-topics-interview-preparation/",
    "DE Shaw": f"{BASE_URL}/d-e-shaw-topics-interview-preparation/",
    "Adobe": f"{BASE_URL}/adobe-topics-interview-preparation/",
    "Cisco": f"{BASE_URL}/cisco-topics-interview-preparation/",
    "Directi": f"{BASE_URL}/directi-topics-interview-preparation/",
    "Facebook": f"{BASE_URL}/facebook-topics-interview-preparation/",
    "Flipkart": f"{BASE_URL}/flipkart-topics-interview-preparation/",
    "Goldman Sachs": f"{BASE_URL}/goldman-sachs-topics-interview-preparation/",
    "Paytm": f"{BASE_URL}/paytm-topics-interview-preparation/",
    "SAP Labs": f"{BASE_URL}/sap-labs-topics-interview-preparation/",
    "Visa": f"{BASE_URL}/visa-topics-for-interview-preparation/",
    "VMware": f"{BASE_URL}/vmware-topics-for-interview-preparation/",
    "Samsung": f"{BASE_URL}/samsung-topics-interview-preparation/",
    "MAQ Software": f"{BASE_URL}/maq-software-topics-interview-preparation/"
}

UNWANTED_ITEMS = {
    "Amazon": ["Easy Level", "Follow", "Medium Level", "Hard Level"],
    "Oracle": ["Medium Level"],
    "Google": ["Hard Level"],
    "Microsoft": [],  # Microsoft has no specific unwanted items
    "Morgan Stanley": [],
    "DE Shaw": [],
    "Adobe": [],
    "Cisco": [],
    "Directi": [],
    "Facebook": [],
    "Flipkart": [],
    "Goldman Sachs": [],
    "Paytm": [],
    "SAP Labs": [],
    "Visa": [],
    "VMware": [],
    "Samsung": [],
    "MAQ Software": []
}

def safe_scrape(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Accept-Encoding": "gzip, deflate"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"Scrape error: {str(e)}")
        return None

def extract_main_content(html, company):
    print(f"Extracting content for company: {company}")
    soup = BeautifulSoup(html, "lxml")
    main_content = soup.find("article") or soup.find("div", class_="content")
    if not main_content:
        return "Content not found"

    # Remove unwanted sections
    for element in main_content.select("header, footer, script, style"):
        element.decompose()

    # Identify the unwanted section starting with "Master Data Structures and Algorithms"
    unwanted_section = main_content.find(string=lambda s: s and s.startswith("Master Data Structures and Algorithms"))

    if unwanted_section:
        # Find the parent element of the unwanted section
        parent_element = unwanted_section.find_parent()

        # If parent element is found, remove all its following siblings
        if parent_element:
            for sibling in parent_element.find_all_next():
                sibling.decompose()
            parent_element.decompose()  # Also remove the parent element itself

    # Remove unwanted items
    unwanted_items = UNWANTED_ITEMS.get(company, [])  # Get company-specific unwanted items. If not found, default is an empty list

    print(f"Unwanted items for {company}: {unwanted_items}")

    for unwanted_item in unwanted_items:
        print(f"Looking for unwanted item: {unwanted_item}")
        # Use CSS selectors to find elements containing the unwanted text
        selector = f":contains('{unwanted_item}')"
        unwanted_elements = main_content.select(selector)

        for element in unwanted_elements:
            print(f"Found element containing: {unwanted_item}")
            element.decompose()

    return str(main_content)

def filter_links(links, company):
    filtered_links = []
    remove_after_challenge = False
    unwanted_texts = {"Follow", "Easy Level", "Medium Level", "Hard Level"}

    for text, url in links:
        if "Take the Three 90 Challenge today." in text and not remove_after_challenge:
            remove_after_challenge = True
        elif not remove_after_challenge and text not in unwanted_texts:
            filtered_links.append((text, url))

    return filtered_links

@app.route("/")
def home():
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Interview Preparation</title>
        <style>
            .container { max-width: 600px; margin: auto; }
            h1 { color: #2c3e50; }
            .company-list { list-style: none; padding: 0; }
            .company-item { margin: 15px 0; }
            .btn { display: inline-block; padding: 10px 20px; background: #3498db; color: #fff; border-radius: 5px; text-decoration: none; }
            .btn:hover { background: #2980b9; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Select a Company</h1>
            <ul class="company-list">
                {% for name, url in companies.items() %}
                    <li class="company-item"><a href="/scrape?company={{ name }}" class="btn">{{ name }}</a></li>
                {% endfor %}
            </ul>
        </div>
    </body>
    </html>
    ''', companies=COMPANY_PAGES)

@app.route("/scrape")
def scrape():
    company = request.args.get("company")
    if company not in COMPANY_PAGES:
        return "Invalid company selected", 400

    target_url = COMPANY_PAGES[company]
    html = safe_scrape(target_url)
    if not html:
        return "Failed to fetch initial page", 500

    soup = BeautifulSoup(html, "lxml")
    main_content = soup.find("article") or soup.find("div", class_="content")
    if not main_content:
        return "Content not found", 404

    links = []
    for link in main_content.select("a[href]"):
        href = urljoin(BASE_URL, link["href"])
        text = link.get_text(strip=True)
        if href and text:
            links.append((text, href))

    filtered_links = filter_links(links, company)

    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>{{ company }} Interview Questions</title>
        <style>
            h1 { color: #2c3e50; }
            .link-list { list-style: none; padding: 0; }
            .link-item { margin: 10px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
            a { color: #1a0dab; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .back { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 5px; }
            .back:hover { background: #2980b9; }
        </style>
    </head>
    <body>
        <h1>{{ company }} Interview Questions</h1>
        <ul class="link-list">
            {% for text, url in links %}
                <li class="link-item">
                    <a href="/view?url={{ url }}&company={{ company }}">{{ text }}</a>
                </li>
            {% endfor %}
        </ul>
    </body>
    </html>
    ''', company=company, links=filtered_links)

@app.route("/view")
def view_page():
    target_url = request.args.get("url")
    company = request.args.get("company")

    if not target_url:
        return "Missing URL parameter", 400

    if urlparse(target_url).netloc not in urlparse(BASE_URL).netloc:
        return "External links not allowed", 403

    html = safe_scrape(target_url)
    if not html:
        return "Failed to fetch page content", 500

    main_content = extract_main_content(html, company)
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Scraped Content</title>
        <style>
            .content { padding: 20px; border: 1px solid #eee; }
            .back { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 5px; }
            .back:hover { background: #2980b9; }
        </style>
    </head>
    <body>
        <div class="content">
            {{ content|safe }}
        </div>
    </body>
    </html>
    ''', content=main_content)  
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
