import requests
import json
import xml.etree.ElementTree as ET
from datetime import datetime
import time

def fetch_x_intel():
    # 替换为更稳定的 RSSHub 节点 (或者你也可以尝试 https://rsshub.app)
    # 关键词：Paris (safety OR alert OR security OR police)
    url = "https://rss.lilywhite.cc/twitter/keyword/Paris%20safety%20alert"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    print(f"[{datetime.now()}] 正在连接巴黎情报源...")
    
    try:
        # 增加重试机制
        response = requests.get(url, headers=headers, timeout=30)
        
        if response.status_code == 200:
            root = ET.fromstring(response.content)
            items = root.findall('./channel/item')
            
            real_news = []
            for item in items:
                title = item.find('title').text if item.find('title') is not None else ""
                # 过滤掉一些无关杂讯
                if len(title) < 5: continue
                
                content_lower = title.lower()
                level = "Safe"
                if any(w in content_lower for w in ["alert", "danger", "robbery", "avoid", "attack", "stolen"]):
                    level = "Alert"
                elif any(w in content_lower for w in ["caution", "warning", "police", "protest", "strike"]):
                    level = "Caution"
                
                real_news.append({
                    "title": f"[X Real-time] {title[:100]}",
                    "level": level,
                    "date": datetime.now().strftime("%H:%M")
                })

            if real_news:
                # 成功抓到真实数据，保存！
                with open("intel.json", "w", encoding="utf-8") as f:
                    json.dump(real_news, f, ensure_ascii=False, indent=4)
                print(f"✅ 成功！抓取到 {len(real_news)} 条真实巴黎情报。")
            else:
                print("⚠️ 没抓到推文，可能是该关键词下半小时内没有新动态。")
        else:
            print(f"❌ 抓取失败，服务器返回状态码: {response.status_code}")

    except Exception as e:
        print(f"💥 运行崩溃: {str(e)}")

if __name__ == "__main__":
    fetch_x_intel()
