import requests
import json
import xml.etree.ElementTree as ET
from datetime import datetime

def fetch_x_intel():
    # 使用 3 个不同的备用镜像源，只要有一个通了就行
    sources = [
        "https://rss.lilywhite.cc/twitter/keyword/Paris%20safety",
        "https://rss.owo.nz/twitter/keyword/Paris%20police",
        "https://rsshub.app/twitter/keyword/Paris%20security"
    ]
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36'}
    news_items = []

    print(f"[{datetime.now()}] 开始多源抓取...")

    for url in sources:
        try:
            print(f"尝试抓取源: {url}")
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                root = ET.fromstring(response.content)
                items = root.findall('./channel/item')
                for item in items:
                    title = item.find('title').text if item.find('title') is not None else ""
                    if len(title) > 5:
                        news_items.append({
                            "title": f"[X Live] {title[:100]}",
                            "level": "Alert" if "danger" in title.lower() or "avoid" in title.lower() else "Safe",
                            "date": datetime.now().strftime("%H:%M")
                        })
                if news_items:
                    print(f"✅ 从源 {url} 成功抓取到 {len(news_items)} 条真实情报！")
                    break # 抓到了就跳出循环
        except Exception as e:
            print(f"❌ 该源抓取失败: {e}")

    # --- 写入文件 ---
    with open("intel.json", "w", encoding="utf-8") as f:
        json.dump(news_items, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    fetch_x_intel()
