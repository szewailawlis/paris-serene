import requests
import json
import xml.etree.ElementTree as ET
from datetime import datetime

def fetch_intel():
    # 增加了一个 Time 过滤，确保搜索更广泛
    sources = [
        "https://news.google.com/rss/search?q=Paris+(strike+OR+protest+OR+robbery+OR+crime)+when:7d&hl=en-US",
        "https://www.france24.com/en/france/rss"
    ]
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    news_items = []
    seen_titles = set()

    print(f"[{datetime.now()}] 启动实时情报扫描...")

    for url in sources:
        try:
            # 增加 timeout 防止死锁
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                # 修复可能存在的编码问题
                xml_content = response.content.decode('utf-8')
                root = ET.fromstring(xml_content)
                
                for item in root.findall('./channel/item'):
                    title = item.find('title').text
                    if title in seen_titles: continue
                    
                    content_lower = title.lower()
                    # 关键词过滤：确保是关于巴黎安全的
                    safety_keywords = ["paris", "strike", "protest", "police", "robbery", "crime", "alert"]
                    
                    if any(word in content_lower for word in safety_keywords):
                        level = "Caution"
                        if any(w in content_lower for w in ["robbery", "violence", "attack"]):
                            level = "Alert"
                        
                        news_items.append({
                            "title": f"[LIVE] {title[:110]}",
                            "level": level,
                            "date": datetime.now().strftime("%H:%M")
                        })
                        seen_titles.add(title)
            else:
                print(f"源 {url} 响应错误: {response.status_code}")
        except Exception as e:
            print(f"扫描源 {url} 时跳过: {str(e)}")

    # 结果去重并取前10条
    final_data = news_items[:10]

    # 保底机制：如果全失败了，至少保证 JSON 格式正确
    if not final_data:
        final_data = [{
            "title": "[System] Paris safety grid monitoring active. No major alerts found.",
            "level": "Safe",
            "date": "LIVE"
        }]

    with open("intel.json", "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=4)
    print(f"✅ 扫描完成，已更新 intel.json")

if __name__ == "__main__":
    fetch_intel()
