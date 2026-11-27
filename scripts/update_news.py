#!/usr/bin/env python3
"""Fetch a small daily set of English news headlines and Arabic translations."""
import json, re, time, urllib.parse, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html import unescape

FEEDS = {
    "egypt": ("Egypt OR world news", "https://news.google.com/rss/search?q=Egypt+OR+world+when:1d&hl=en-US&gl=US&ceid=US:en"),
    "tech": ("Technology", "https://news.google.com/rss/search?q=technology+when:1d&hl=en-US&gl=US&ceid=US:en"),
    "football": ("Football", "https://news.google.com/rss/search?q=football+OR+soccer+when:1d&hl=en-US&gl=US&ceid=US:en"),
}

def clean(value):
    value = re.sub(r"<[^>]+>", " ", value or "")
    return re.sub(r"\\s+", " ", unescape(value)).strip()

def translate(text):
    if not text:
        return ""
    url = "https://translate.googleapis.com/translate_a/single?" + urllib.parse.urlencode({
        "client": "gtx", "sl": "en", "tl": "ar", "dt": "t", "q": text[:900]
    })
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            data = json.loads(response.read().decode("utf-8"))
        return "".join(part[0] for part in data[0] if part and part[0])
    except Exception:
        return "تعذرت الترجمة الآلية لهذا النص حاليًا."

def fetch_category(category, feed_url, updated_label):
    request = urllib.request.Request(feed_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=25) as response:
        root = ET.fromstring(response.read())
    items = []
    for node in root.findall("./channel/item")[:4]:
        title = clean(node.findtext("title", ""))
        description = clean(node.findtext("description", ""))
        link = node.findtext("link", "")
        source_node = node.find("source")
        source = clean(source_node.text if source_node is not None else "Google News")
        published = node.findtext("pubDate", "")
        try:
            dt = parsedate_to_datetime(published).astimezone(timezone.utc)
            date_label = dt.strftime("%Y-%m-%d %H:%M UTC")
        except Exception:
            date_label = ""
        if not title or not link:
            continue
        summary = description[:380] if description else title
        items.append({
            "category": category, "title_en": title, "summary_en": summary,
            "title_ar": translate(title), "summary_ar": translate(summary),
            "source": source, "url": link, "date_label": date_label,
            "updated_label": updated_label
        })
        time.sleep(0.25)
    return items

def main():
    now = datetime.now(timezone.utc)
    updated = now.strftime("%Y-%m-%d %H:%M UTC")
    all_items = []
    for category, (_, feed) in FEEDS.items():
        try:
            all_items.extend(fetch_category(category, feed, updated))
        except Exception as exc:
            print(f"Could not update {category}: {exc}")
    if not all_items:
        raise SystemExit("No news items fetched; keeping the previous published file.")
    with open("news-data.json", "w", encoding="utf-8") as output:
        json.dump({"updated_at": updated, "items": all_items}, output, ensure_ascii=False, indent=2)
    print(f"Saved {len(all_items)} news items.")

if __name__ == "__main__":
    main()
