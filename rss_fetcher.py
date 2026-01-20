import requests
import json
import xml.etree.ElementTree as ET

def fetch_x_intel():
    # 使用公共 RSSHub 实例，不需要开电脑
    url = "https://rsshub.app/twitter/keyword/Paris%20safety%20alert"
    try:
        response = requests.get(url, timeout=20)
        if response.status_code == 200:
            root = ET.fromstring(response.content)
            news_items = []
            for item in root.findall('./channel/item'):
                content = item.find('title').text
                # 简单的 AI 逻辑：根据关键词判断颜色灯
                level = "Safe"
                if any(word in content.lower() for word in ["alert", "danger", "robbery"]):
                    level = "Alert"
                elif "caution" in content.lower():
                    level = "Caution"
                
                news_items.append({
                    "title": "[X Intel] " + content[:60] + "...",
                    "full_text": content,
                    "level": level,
                    "date": "LIVE" 
                })
            
            with open('intel.json', 'w', encoding='utf-8') as f:
                json.dump(news_items[:10], f, ensure_ascii=False, indent=2)
            print("✅ 数据已更新")
    except Exception as e:
        print(f"❌ 抓取失败: {e}")

if __name__ == "__main__":
    fetch_x_intel()
