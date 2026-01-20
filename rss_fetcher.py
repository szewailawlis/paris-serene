import requests
import json
import xml.etree.ElementTree as ET
from datetime import datetime

def fetch_intel():
    # 源 1: Google News (搜索巴黎安全，非常稳定)
    # 源 2: 一个更强大的 RSSHub 节点抓取 X 关键词
    sources = [
        "https://news.google.com/rss/search?q=Paris+security+alert+when:24h&hl=en-US&gl=US&ceid=US:en",
        "https://rss.lilywhite.cc/twitter/keyword/Paris%20Safety"
    ]
    
    headers = {'User-Agent': 'Mozilla/5.0'}
    news_items = []

    print(f"[{datetime.now()}] 启动情报搜集...")

    for url in sources:
        try:
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                root = ET.fromstring(response.content)
                for item in root.findall('./channel/item'):
                    title = item.find('title').text
                    # 只要包含巴黎相关的词就抓进来
                    news_items.append({
                        "title": f"[Intel] {title[:100]}",
                        "level": "Caution", # 默认黄色
                        "date": "LIVE"
                    })
                if news_items: break 
        except Exception as e:
            print(f"尝试源失败: {e}")

    # 最终保险：如果所有源都挂了，才给一条“系统自检”信息
    if not news_items:
        news_items.append({"title": "[System] Monitoring Paris security grid... No new alerts.", "level": "Safe", "date": "LIVE"})

    with open("intel.json", "w", encoding="utf-8") as f:
        json.dump(news_items, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    fetch_intel()
