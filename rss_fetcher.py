import requests
import json
import xml.etree.ElementTree as ET
from datetime import datetime

def fetch_x_intel():
    # 使用公共 RSSHub 实例抓取巴黎安全相关关键词
    # 关键词：Paris safety, Paris alert, Paris danger
    url = "https://rsshub.app/twitter/keyword/Paris%20safety%20alert"
    
    print(f"[{datetime.now()}] 正在从云端情报源抓取数据...")
    
    try:
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            root = ET.fromstring(response.content)
            news_items = []
            
            # 解析 RSS 频道里的每一条推文
            for item in root.findall('./channel/item'):
                title = item.find('title').text if item.find('title') is not None else ""
                link = item.find('link').text if item.find('link') is not None else ""
                
                # --- 智能分类逻辑 ---
                content_lower = title.lower()
                if any(word in content_lower for word in ["danger", "alert", "robbery", "avoid", "attack"]):
                    level = "Alert"    # 红色等级
                elif any(word in content_lower for word in ["caution", "warning", "crowd", "police"]):
                    level = "Caution"  # 黄色等级
                else:
                    level = "Safe"     # 绿色等级
                
                news_items.append({
                    "title": f"[X Intel] {title[:80]}...", # 限制长度方便跑马灯显示
                    "full_text": title,
                    "level": level,
                    "link": link,
                    "date": "LIVE" # 标记为实时
                })
            
            # 如果没抓到任何消息，提供一条保底信息
            if not news_items:
                news_items.append({
                    "title": "[X Intel] Monitoring Paris security channels... No active alerts.",
                    "level": "Safe",
                    "date": "LIVE"
                })

            # --- 关键：保存到根目录的 intel.json ---
            with open("intel.json", "w", encoding="utf-8") as f:
                json.dump(news_items, f, ensure_ascii=False, indent=4)
            
            print(f"成功！已抓取 {len(news_items)} 条情报并更新至 intel.json")
        else:
            print(f"抓取失败，错误码: {response.status_code}")
            
    except Exception as e:
        print(f"运行出错: {str(e)}")

if __name__ == "__main__":
    fetch_x_intel()
