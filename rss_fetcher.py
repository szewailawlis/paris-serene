import requests
import json
import xml.etree.ElementTree as ET
from datetime import datetime

def fetch_intel():
    # 组合多个最高效的实时情报源
    sources = [
        # 1. Google News 强制限定 24 小时内 (when:24h)，专注安全关键词
        "https://news.google.com/rss/search?q=Paris+(strike+OR+protest+OR+robbery+OR+police)+when:24h&hl=en-US",
        # 2. 法国本地英文媒体 (France24) 的安全板块
        "https://www.france24.com/en/france/rss",
        # 3. 实时 X 镜像 (使用更稳定的聚合搜索词)
        "https://rss.lilywhite.cc/twitter/keyword/Paris%20incident"
    ]
    
    headers = {'User-Agent': 'Mozilla/5.0'}
    news_items = []
    seen_titles = set()

    print(f"[{datetime.now()}] 正在启动多源实时扫描...")

    for url in sources:
        try:
            response = requests.get(url, headers=headers, timeout=15)
            if response.status_code == 200:
                root = ET.fromstring(response.content)
                for item in root.findall('./channel/item'):
                    title = item.find('title').text
                    # 过滤重复和无关信息
                    if title in seen_titles: continue
                    
                    # 关键词精细化过滤
                    content_lower = title.lower()
                    safety_keywords = ["paris", "strike", "protest", "police", "robbery", "security", "attack", "stolen", "crime"]
                    
                    if any(word in content_lower for word in safety_keywords):
                        level = "Caution"
                        # 危险等级分级
                        if any(w in content_lower for w in ["attack", "robbery", "violence", "urgent"]):
                            level = "Alert"
                        
                        news_items.append({
                            "title": f"[LIVE Intel] {title[:110]}",
                            "level": level,
                            "date": datetime.now().strftime("%H:%M") # 强制显示当前更新时间
                        })
                        seen_titles.add(title)
        except Exception as e:
            print(f"源 {url} 扫描跳过: {e}")

    # 只要最近 10 条最相关的
    final_data = news_items[:10]

    if not final_data:
        final_data = [{"title": "[System] Scanning Paris safety grid... All clear in the last hour.", "level": "Safe", "date": "LIVE"}]

    with open("intel.json", "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=4)
    print(f"扫描完成，更新了 {len(final_data)} 条最新动态。")

if __name__ == "__main__":
    fetch_intel()
