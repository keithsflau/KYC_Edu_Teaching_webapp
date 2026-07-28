#!/usr/bin/env python3
"""CEO F3 correction: renumber 01-18, generate Book 12 apps 01-06, placeholders 07-18."""
import importlib.util
import json
import os
import re

_DIR = os.path.dirname(__file__)
BASE = os.path.join(_DIR, "..", "Secondary_School", "Junior Science", "Form 3")

# --- Book 12 full LGER configs (PPT-faithful, no generic distractors) ---
BOOK12 = [
    {
        "folder": "01_Healthy_Lifestyle",
        "appId": "f3_healthy_lifestyle",
        "titleEn": "Healthy Lifestyle",
        "titleZh": "健康生活",
        "unit": "Form 3 · Book 12 Health & Biotechnology",
        "accent": "#10b981",
        "experiment": "healthy_lifestyle",
        "pptSource": "scicent_ppt_12_1_e.ppt",
        "learn": [
            {"titleEn": "What is health?", "titleZh": "甚麼是健康？",
             "bodyEn": "World Health Organization (WHO): A healthy person should have good physical health, mental health and social well-being.",
             "bodyZh": "聯合國世界衞生組織(WHO) 指出：要在生理、心理及社交三方面都達至良好狀況，才稱得上健康。",
             "qEn": "According to WHO, health includes…", "qZh": "根據 WHO，健康包括…",
             "opts": ["Physical, mental and social well-being 生理、心理及社交良好", "Only physical fitness 只有體能", "Only absence of disease 只有沒有病", "Only mental happiness 只有心理快樂"],
             "a": "Physical, mental and social well-being 生理、心理及社交良好",
             "why": "WHO defines health holistically. WHO 從三方面定義健康。"},
            {"titleEn": "Healthy habits", "titleZh": "健康習慣",
             "bodyEn": "Do regular exercise, have a balanced diet, go to bed early, do not smoke, do not drink alcohol or take drugs.",
             "bodyZh": "要有適量運動、均衡膳食、早睡早起、避免吸煙飲酒或濫藥。",
             "qEn": "Which habit supports a healthy lifestyle?", "qZh": "哪項習慣有助健康的生活模式？",
             "opts": ["Regular exercise and balanced diet 適量運動及均衡膳食", "Smoking to relieve stress 吸煙減壓", "Skipping sleep for gaming 熬夜打機", "Heavy alcohol use 大量飲酒"],
             "a": "Regular exercise and balanced diet 適量運動及均衡膳食",
             "why": "Slides list positive habits. 簡報列出正面習慣。"},
            {"titleEn": "Balanced diet", "titleZh": "均衡膳食",
             "bodyEn": "A balanced diet helps us grow, support daily activities, maintain body functions and control body mass.",
             "bodyZh": "均衡膳食有助我們生長、支持身體進行各項活動、維持身體功能及控制體重。",
             "qEn": "A balanced diet helps us…", "qZh": "均衡膳食有助我們…",
             "opts": ["Grow and maintain body functions 生長及維持身體功能", "Avoid all physical activity 避免所有活動", "Replace sleep entirely 完全取代睡眠", "Eliminate the need for water 不需要喝水"],
             "a": "Grow and maintain body functions 生長及維持身體功能",
             "why": "Four benefits from PPT Ch1. 課本第1章四項好處。"},
            {"titleEn": "Sleep for young people", "titleZh": "青少年睡眠",
             "bodyEn": "Young people need 8–10 hours of sleep each day. Sleep helps us grow, repair body cells and resist diseases.",
             "bodyZh": "青少年每天需要有8至10小時的睡眠。睡眠有助我們生長、修補身體細胞及抵抗疾病。",
             "qEn": "How much sleep do young people need daily?", "qZh": "青少年每天需要多少睡眠？",
             "opts": ["8–10 hours 8至10小時", "2–3 hours 2至3小時", "12–14 hours 12至14小時", "No sleep needed 不需要睡眠"],
             "a": "8–10 hours 8至10小時",
             "why": "PPT recommendation for adolescents. 簡報對青少年的建議。"},
            {"titleEn": "Physical activity", "titleZh": "體能活動",
             "bodyEn": "Appropriate physical activities control body mass, strengthen body functions and help resist diseases.",
             "bodyZh": "適量的體能活動有助控制體重、增強身體各項功能及抵抗疾病。",
             "qEn": "Physical activity benefits include…", "qZh": "體能活動的好處包括…",
             "opts": ["Control body mass and resist diseases 控制體重及抵抗疾病", "Weaken heart function 削弱心臟功能", "Increase smoking risk 增加吸煙風險", "Reduce bone strength 減弱骨骼"],
             "a": "Control body mass and resist diseases 控制體重及抵抗疾病",
             "why": "Three benefits from teaching slides. 教學簡報三項好處。"},
            {"titleEn": "Avoid harmful substances", "titleZh": "避免有害物質",
             "bodyEn": "Smoking harms lungs, heart and blood vessels. Abusing alcohol or drugs badly affects brain function and damages organs.",
             "bodyZh": "吸煙對肺、心臟和血管造成損害。酗酒和濫藥嚴重影響腦部功能及損害器官。",
             "qEn": "Smoking mainly harms…", "qZh": "吸煙主要損害…",
             "opts": ["Lungs, heart and blood vessels 肺、心臟和血管", "Hair and nails only 只有頭髮和指甲", "Digestive enzymes only 只有消化酶", "Bone marrow only 只有骨髓"],
             "a": "Lungs, heart and blood vessels 肺、心臟和血管",
             "why": "PPT lists smoking harms. 簡報列出吸煙危害。"},
        ],
    },
    {
        "folder": "02_Food_Substances",
        "appId": "f3_food_substances",
        "titleEn": "Food Substances",
        "titleZh": "食物物質",
        "unit": "Form 3 · Book 12 Health & Biotechnology",
        "accent": "#059669",
        "experiment": "food_substances",
        "pptSource": "scicent_ppt_12_2_r_e.ppt",
        "learn": [
            {"titleEn": "Primary food substances", "titleZh": "基本食物物質",
             "bodyEn": "Primary food substances include carbohydrates, lipids and proteins.",
             "bodyZh": "基本食物物質包括碳水化合物、脂質和蛋白質。",
             "qEn": "Which group are primary food substances?", "qZh": "哪組屬於基本食物物質？",
             "opts": ["Carbohydrates, lipids, proteins 碳水化合物、脂質、蛋白質", "Vitamins, minerals, fibre only 只有維生素、礦物質、纖維", "Water and salt only 只有水和鹽", "Starch and sugar only 只有澱粉和糖"],
             "a": "Carbohydrates, lipids, proteins 碳水化合物、脂質、蛋白質",
             "why": "PPT Ch2 classification. 第2章分類。"},
            {"titleEn": "Carbohydrates", "titleZh": "碳水化合物",
             "bodyEn": "Carbohydrates are the main source of energy for our bodies.",
             "bodyZh": "碳水化合物是身體主要的能量來源。",
             "qEn": "Carbohydrates mainly provide…", "qZh": "碳水化合物主要提供…",
             "opts": ["Energy for body activities 身體活動的能量", "Cell membrane structure only 只有細胞膜結構", "Genetic information 遺傳資訊", "Oxygen transport 運送氧氣"],
             "a": "Energy for body activities 身體活動的能量",
             "why": "Main energy source in slides. 簡報指出主要能量來源。"},
            {"titleEn": "Lipids", "titleZh": "脂質",
             "bodyEn": "The functions of lipids include energy storage, keeping warm, protecting organs, and forming cell membranes.",
             "bodyZh": "脂質在人體內的功能包括：能量儲備、保持體温、保護器官，以及合成細胞膜。",
             "qEn": "Lipids stored under the skin…", "qZh": "儲存在皮膚下的脂質…",
             "opts": ["Act as heat insulator 作為隔熱層", "Produce digestive enzymes 製造消化酶", "Carry oxygen in blood 在血液中運氧", "Conduct nerve impulses 傳導神經衝動"],
             "a": "Act as heat insulator 作為隔熱層",
             "why": "Keeping warm function from PPT. 簡報「保持體温」功能。"},
            {"titleEn": "Proteins", "titleZh": "蛋白質",
             "bodyEn": "Proteins are a major component of muscles, bones, skin, hair and blood. They are especially important for growth and repair.",
             "bodyZh": "蛋白質是肌肉、骨骼、皮膚、毛髮和血液等組織的主要成分，對生長和修補組織非常重要。",
             "qEn": "Proteins are especially important for…", "qZh": "蛋白質對…特別重要",
             "opts": ["Growth and repair of body tissues 生長和修補身體組織", "Storing starch only 只儲存澱粉", "Filtering light in the eye 在眼中過濾光線", "Producing carbon dioxide 製造二氧化碳"],
             "a": "Growth and repair of body tissues 生長和修補身體組織",
             "why": "Growth/repair role in PPT. 簡報中生長修補角色。"},
            {"titleEn": "Protective substances", "titleZh": "保護性食物物質",
             "bodyEn": "Protective food substances include vitamins, minerals and dietary fibre (plus water).",
             "bodyZh": "保護性食物物質包括維生素、礦物質和膳食纖維（以及水）。",
             "qEn": "Protective food substances include…", "qZh": "保護性食物物質包括…",
             "opts": ["Vitamins, minerals and fibre 維生素、礦物質和纖維", "Carbohydrates and lipids only 只有碳水化合物和脂質", "Proteins only 只有蛋白質", "Starch and sugar only 只有澱粉和糖"],
             "a": "Vitamins, minerals and fibre 維生素、礦物質和纖維",
             "why": "Protective group from PPT. 簡報保護性組別。"},
            {"titleEn": "Same nutrients, different dishes", "titleZh": "不同菜式，相同營養",
             "bodyEn": "Different dishes can provide the same food substances — e.g. rice, bread and noodles all supply carbohydrates.",
             "bodyZh": "不同的菜式可為我們提供相同的食物物質，例如飯、麵包和麵都提供碳水化合物。",
             "qEn": "Different dishes may…", "qZh": "不同的菜式可能…",
             "opts": ["Provide the same food substances 提供相同的食物物質", "Contain no carbohydrates 不含碳水化合物", "Replace all proteins 取代所有蛋白質", "Eliminate the need for water 不需要水"],
             "a": "Provide the same food substances 提供相同的食物物質",
             "why": "Opening concept of Ch2. 第2章開首概念。"},
        ],
    },
    {
        "folder": "03_Digestion",
        "appId": "f3_digestion",
        "titleEn": "Digestion & Absorption",
        "titleZh": "消化與吸收",
        "unit": "Form 3 · Book 12 Health & Biotechnology",
        "accent": "#14b8a6",
        "experiment": "digestion",
        "pptSource": "scicent_ppt_12_3_e.ppt",
        "learn": [
            {"titleEn": "What is digestion?", "titleZh": "甚麼是消化？",
             "bodyEn": "Food needs to be broken down into small, simple and soluble substances by a process called digestion, so body cells can absorb and use them.",
             "bodyZh": "食物須分解成細小、簡單且可溶的物質，這個過程稱為消化，以便身體細胞吸收和使用。",
             "qEn": "Digestion breaks food into…", "qZh": "消化把食物分解成…",
             "opts": ["Small, simple, soluble substances 細小、簡單、可溶的物質", "Large complex molecules only 只有大型複合分子", "Gases only 只有氣體", "Undigested fibre only 只有未消化纖維"],
             "a": "Small, simple, soluble substances 細小、簡單、可溶的物質",
             "why": "Core definition Ch3. 第3章核心定義。"},
            {"titleEn": "Digestive system", "titleZh": "消化系統",
             "bodyEn": "Digestion and absorption take place in the digestive system, made up of the alimentary canal and digestive glands.",
             "bodyZh": "食物的消化和吸收在消化系統內進行，由消化道和消化腺組成。",
             "qEn": "The digestive system includes…", "qZh": "消化系統包括…",
             "opts": ["Alimentary canal and digestive glands 消化道和消化腺", "Lungs and trachea only 只有肺和氣管", "Heart and blood vessels only 只有心臟和血管", "Bones and muscles only 只有骨骼和肌肉"],
             "a": "Alimentary canal and digestive glands 消化道和消化腺",
             "why": "System components from PPT. 簡報系統組成。"},
            {"titleEn": "Mechanical digestion", "titleZh": "機械消化",
             "bodyEn": "Mechanical digestion breaks food into smaller pieces without forming new substances — e.g. chewing in the mouth.",
             "bodyZh": "機械消化把食物變成碎塊，過程中不會生成新的物質，例如在口腔咀嚼。",
             "qEn": "Mechanical digestion…", "qZh": "機械消化…",
             "opts": ["Breaks food into pieces without new substances 把食物變成碎塊而不生成新物質", "Uses enzymes to build proteins 用酶製造蛋白質", "Absorbs nutrients in the stomach 在胃吸收營養", "Filters blood in the liver 在肝過濾血液"],
             "a": "Breaks food into pieces without new substances 把食物變成碎塊而不生成新物質",
             "why": "Mechanical vs chemical distinction. 機械與化學消化區別。"},
            {"titleEn": "Chemical digestion", "titleZh": "化學消化",
             "bodyEn": "Chemical digestion uses enzymes to break complex food substances into simpler ones — e.g. saliva enzymes break starch into sugar.",
             "bodyZh": "化學消化利用消化酶把複雜食物物質分解成簡單物質，例如唾液中的酶把澱粉分解成糖。",
             "qEn": "Chemical digestion requires…", "qZh": "化學消化需要…",
             "opts": ["Digestive enzymes 消化酶", "Only teeth 只有牙齒", "Sunlight 陽光", "Magnetic fields 磁場"],
             "a": "Digestive enzymes 消化酶",
             "why": "Enzymes essential for chemical digestion. 化學消化需要酶。"},
            {"titleEn": "In the mouth", "titleZh": "在口腔",
             "bodyEn": "In the mouth: teeth chew food (mechanical digestion) and saliva enzymes digest starch (chemical digestion).",
             "bodyZh": "在口腔內：牙齒咀嚼食物（機械消化），唾液中的酶分解澱粉（化學消化）。",
             "qEn": "In the mouth, starch is broken down by…", "qZh": "在口腔，澱粉被…分解",
             "opts": ["Saliva enzymes 唾液中的酶", "Hydrochloric acid only 只有鹽酸", "Bile only 只有膽汁", "No digestion occurs 沒有消化"],
             "a": "Saliva enzymes 唾液中的酶",
             "why": "Mouth processes from PPT. 簡報口腔過程。"},
            {"titleEn": "Absorption", "titleZh": "吸收",
             "bodyEn": "Most absorption of digested food occurs in the small intestine, where nutrients pass into the blood.",
             "bodyZh": "大部分已消化食物的吸收在小腸進行，營養素進入血液。",
             "qEn": "Most nutrient absorption occurs in the…", "qZh": "大部分營養吸收在…進行",
             "opts": ["Small intestine 小腸", "Mouth 口腔", "Oesophagus 食道", "Large intestine only 只有大腸"],
             "a": "Small intestine 小腸",
             "why": "Absorption site Ch3. 第3章吸收位置。"},
        ],
    },
    {
        "folder": "04_Balanced_Diet",
        "appId": "f3_balanced_diet",
        "titleEn": "Balanced Diet",
        "titleZh": "均衡飲食",
        "unit": "Form 3 · Book 12 Health & Biotechnology",
        "accent": "#0d9488",
        "experiment": "balanced_diet",
        "pptSource": "scicent_ppt_12_4_r_e.ppt",
        "learn": [
            {"titleEn": "Balanced diet definition", "titleZh": "均衡膳食定義",
             "bodyEn": "A balanced diet includes six main types of food substances in the right amounts and proportions.",
             "bodyZh": "均衡膳食應包括六種主要食物物質，而每種食物物質的分量與比例都要適當。",
             "qEn": "A balanced diet requires…", "qZh": "均衡膳食需要…",
             "opts": ["Six food types in right amounts 六種食物物質分量適當", "Only one food type 只有一種食物", "Maximum fat only 只有最多脂質", "No carbohydrates 不含碳水化合物"],
             "a": "Six food types in right amounts 六種食物物質分量適當",
             "why": "Definition from PPT Ch4. 第4章定義。"},
            {"titleEn": "Food pyramid", "titleZh": "食物金字塔",
             "bodyEn": "The food pyramid helps us plan a balanced diet — grains at the base, fats/oils/sugar at the top in small amounts.",
             "bodyZh": "食物金字塔幫助我們設計均衡膳食——穀物在底層，脂肪/油/糖在頂層且分量少。",
             "qEn": "At the base of the food pyramid we find…", "qZh": "食物金字塔底層是…",
             "opts": ["Grains (4–6 bowls) 穀物（4–6碗）", "Fat and sugar 脂肪和糖", "Soft drinks only 只有汽水", "Processed snacks only 只有零食"],
             "a": "Grains (4–6 bowls) 穀物（4–6碗）",
             "why": "HK food pyramid layout. 香港食物金字塔。"},
            {"titleEn": "Balanced plate", "titleZh": "均衡餐盒",
             "bodyEn": "A balanced diet can also be shown on a plate — helping us decide proportions for each meal.",
             "bodyZh": "均衡膳食也可用餐盒表示，使我們容易知道不同種類食物在一餐中應佔的比例。",
             "qEn": "The 'balanced plate' model helps us…", "qZh": "「均衡餐盒」模型幫助我們…",
             "opts": ["Plan proportions for each meal 計劃每餐比例", "Eliminate vegetables 取消蔬菜", "Avoid all grains 避免所有穀物", "Skip breakfast 不吃早餐"],
             "a": "Plan proportions for each meal 計劃每餐比例",
             "why": "Plate model from slides. 簡報餐盒模型。"},
            {"titleEn": "Energy values", "titleZh": "能量值",
             "bodyEn": "Different foods have different energy values, measured in kilojoules per gram (kJ/g) or kilocalories per gram (kcal/g).",
             "bodyZh": "不同種類的食物有不同的能量值，以每克千焦耳 (kJ/g) 或每克千卡路里 (kcal/g) 量度。",
             "qEn": "Energy value of food is measured in…", "qZh": "食物能量值以…量度",
             "opts": ["kJ/g or kcal/g 每克千焦耳或千卡路里", "Metres per second 米每秒", "Degrees Celsius only 只有攝氏度", "Volts only 只有伏特"],
             "a": "kJ/g or kcal/g 每克千焦耳或千卡路里",
             "why": "Units from PPT Ch4. 第4章單位。"},
            {"titleEn": "High energy foods", "titleZh": "高能量食物",
             "bodyEn": "Foods with the highest energy value per 100 g often contain the largest amount of fat/lipids.",
             "bodyZh": "每100 g能量值最高的食品通常含有最多的脂肪/脂質。",
             "qEn": "A snack with highest energy per 100 g likely has…", "qZh": "每100 g能量最高的零食可能含…",
             "opts": ["Most fat/lipids 最多脂肪/脂質", "Most water only 只有最多水", "No lipids at all 完全不含脂質", "Most dietary fibre only 只有最多纖維"],
             "a": "Most fat/lipids 最多脂肪/脂質",
             "why": "Exp 12.10 conclusion in PPT. 簡報實驗12.10結論。"},
            {"titleEn": "Malnutrition", "titleZh": "營養不良",
             "bodyEn": "Malnutrition includes overnutrition (too much) and undernutrition (too little) — both harm health.",
             "bodyZh": "營養不良包括營養過剩（過量）和營養不足（過少），兩者都損害健康。",
             "qEn": "Malnutrition can mean…", "qZh": "營養不良可以指…",
             "opts": ["Too much or too little nutrients 營養過多或過少", "Only eating vegetables 只吃蔬菜", "Perfect balanced diet 完美均衡膳食", "Drinking enough water only 只喝足夠的水"],
             "a": "Too much or too little nutrients 營養過多或過少",
             "why": "Over/under nutrition from curriculum. 課程中過剩/不足。"},
        ],
    },
    {
        "folder": "05_Disease_Prevention",
        "appId": "f3_disease_prevention",
        "titleEn": "Disease Prevention",
        "titleZh": "疾病預防",
        "unit": "Form 3 · Book 12 Health & Biotechnology",
        "accent": "#f43f5e",
        "experiment": "disease_prevention",
        "pptSource": "scicent_ppt_12_5_r_e.ppt",
        "learn": [
            {"titleEn": "Types of disease", "titleZh": "疾病類型",
             "bodyEn": "Diseases can be classified into infectious diseases (can spread) and non-infectious diseases (cannot spread).",
             "bodyZh": "疾病可分為傳染病（可傳播）和非傳染病（不可傳播）兩類。",
             "qEn": "Infectious diseases…", "qZh": "傳染病…",
             "opts": ["Can spread from person to person 可在人與人之間傳播", "Never affect others 不會影響他人", "Only affect plants 只影響植物", "Are always genetic 一定是遺傳"],
             "a": "Can spread from person to person 可在人與人之間傳播",
             "why": "Classification from PPT Ch5. 第5章分類。"},
            {"titleEn": "Pathogens", "titleZh": "病原體",
             "bodyEn": "Infectious diseases are caused by microorganisms called pathogens. When pathogens enter our bodies, we may become sick.",
             "bodyZh": "傳染病是由微生物引起的，能致病的微生物稱為病原體。病原體入侵身體時可能令我們生病。",
             "qEn": "Pathogens are…", "qZh": "病原體是…",
             "opts": ["Microorganisms that cause disease 能致病的微生物", "Vitamins in food 食物中的維生素", "Healthy body cells only 只有健康細胞", "Digestive enzymes 消化酶"],
             "a": "Microorganisms that cause disease 能致病的微生物",
             "why": "Pathogen definition in slides. 簡報病原體定義。"},
            {"titleEn": "Influenza example", "titleZh": "流感例子",
             "bodyEn": "Influenza is caused by the influenza virus, spread by droplets when infected people cough, sneeze or talk.",
             "bodyZh": "流感由流感病毒引起，經患者咳嗽、打噴嚏或說話時產生的飛沫傳播。",
             "qEn": "Influenza spreads mainly through…", "qZh": "流感主要經…傳播",
             "opts": ["Droplets from coughs/sneezes 咳嗽/打噴嚏飛沫", "Sunlight exposure 陽光照射", "Balanced diet alone 只靠均衡膳食", "Heavy exercise only 只有劇烈運動"],
             "a": "Droplets from coughs/sneezes 咳嗽/打噴嚏飛沫",
             "why": "Influenza transmission from PPT. 簡報流感傳播。"},
            {"titleEn": "Prevention methods", "titleZh": "預防方法",
             "bodyEn": "Influenza can be prevented by washing hands frequently, maintaining good ventilation and receiving vaccination.",
             "bodyZh": "勤洗手、保持空氣流通及接種疫苗都可預防流感。",
             "qEn": "Which helps prevent influenza spread?", "qZh": "哪項有助預防流感傳播？",
             "opts": ["Hand washing and vaccination 勤洗手和接種疫苗", "Sharing utensils when ill 生病時共用餐具", "Closing all windows permanently 永久關窗", "Avoiding all food 不吃任何食物"],
             "a": "Hand washing and vaccination 勤洗手和接種疫苗",
             "why": "Expert advice in PPT. 簡報專家建議。"},
            {"titleEn": "Transmission routes", "titleZh": "傳播途徑",
             "bodyEn": "Infectious diseases spread through air/droplets, contact with secretions, contaminated food/water, and vectors like mosquitoes.",
             "bodyZh": "傳染病可經空氣/飛沫、接觸分泌物、受污染的食物/水，以及蚊子等媒介傳播。",
             "qEn": "Diseases may spread through…", "qZh": "疾病可能經…傳播",
             "opts": ["Air, contact, food/water, vectors 空氣、接觸、食物/水、媒介", "Only genetic inheritance 只有遺傳", "Photosynthesis 光合作用", "Reflection of light 光的反射"],
             "a": "Air, contact, food/water, vectors 空氣、接觸、食物/水、媒介",
             "why": "Multiple routes in Ch5. 第5章多種途徑。"},
            {"titleEn": "Lifestyle diseases", "titleZh": "生活方式疾病",
             "bodyEn": "Non-infectious diseases like cardiovascular disease and diabetes can be prevented by healthy lifestyle choices.",
             "bodyZh": "非傳染病如心血管疾病和糖尿病可透過健康的生活模式預防。",
             "qEn": "Cardiovascular disease is…", "qZh": "心血管疾病是…",
             "opts": ["A non-infectious disease 非傳染病", "Caused by influenza virus 由流感病毒引起", "Spread by droplets only 只經飛沫傳播", "Always contagious 一定具傳染性"],
             "a": "A non-infectious disease 非傳染病",
             "why": "Waiting room activity in PPT. 簡報候診室活動。"},
        ],
    },
    {
        "folder": "06_Biotechnology",
        "appId": "f3_biotechnology",
        "titleEn": "Biotechnology",
        "titleZh": "生物科技",
        "unit": "Form 3 · Book 12 Health & Biotechnology",
        "accent": "#8b5cf6",
        "experiment": "biotechnology",
        "pptSource": "scicent_ppt_12_6_e.ppt",
        "learn": [
            {"titleEn": "What is biotechnology?", "titleZh": "甚麼是生物工程？",
             "bodyEn": "Biotechnology is the use of living organisms or biological processes to make useful products or develop new technologies.",
             "bodyZh": "生物工程是指利用生物或生物過程，來製造產品或發展新的技術。",
             "qEn": "Biotechnology involves…", "qZh": "生物工程涉及…",
             "opts": ["Living organisms or biological processes 生物或生物過程", "Only mechanical machines 只有機械", "Chemical explosives only 只有化學爆炸物", "Non-living plastics only 只有非生物塑膠"],
             "a": "Living organisms or biological processes 生物或生物過程",
             "why": "Definition from PPT Ch6. 第6章定義。"},
            {"titleEn": "GM food", "titleZh": "基因改造食物",
             "bodyEn": "GM food is produced by changing the genetic materials of crops or livestock to give desirable traits — e.g. herbicide-resistant soya beans.",
             "bodyZh": "基因改造食物透過改變農作物或牲畜的遺傳物質以獲得理想特性，例如抗除草劑大豆。",
             "qEn": "GM crops are modified to…", "qZh": "基因改造作物被改造以…",
             "opts": ["Give desirable traits 獲得理想特性", "Remove all DNA 移除所有DNA", "Stop photosynthesis 停止光合作用", "Eliminate all proteins 消除所有蛋白質"],
             "a": "Give desirable traits 獲得理想特性",
             "why": "GM food application in PPT. 簡報GM食物應用。"},
            {"titleEn": "Insulin production", "titleZh": "胰島素生產",
             "bodyEn": "Genetically modified E. coli bacteria carrying human insulin DNA can produce large amounts of human insulin for diabetes treatment.",
             "bodyZh": "載有人類胰島素DNA的基因改造大腸桿菌可大量生產人類胰島素，用於治療糖尿病。",
             "qEn": "Modern insulin is produced using…", "qZh": "現代胰島素利用…生產",
             "opts": ["GM bacteria with human insulin DNA 含人類胰島素DNA的改造細菌", "Only coal mining 只有採煤", "Glass manufacture 製造玻璃", "Metal smelting 冶煉金屬"],
             "a": "GM bacteria with human insulin DNA 含人類胰島素DNA的改造細菌",
             "why": "Health application from PPT. 簡報醫學應用。"},
            {"titleEn": "Genetic testing", "titleZh": "基因檢測",
             "bodyEn": "Biotechnology can test for DNA mutations in blood or cell samples — e.g. detecting Down syndrome in a foetus from the mother's blood.",
             "bodyZh": "生物工程可從血液或細胞樣本檢測DNA突變，例如從孕婦血液檢測胎兒是否患有唐氏綜合症。",
             "qEn": "Genetic testing detects…", "qZh": "基因檢測可偵測…",
             "opts": ["DNA mutations  DNA突變", "Sound waves 聲波", "Light reflection 光的反射", "Metal reactivity 金屬活性"],
             "a": "DNA mutations  DNA突變",
             "why": "Testing application Ch6. 第6章檢測應用。"},
            {"titleEn": "Pathogen identification", "titleZh": "病原體鑑定",
             "bodyEn": "Each pathogen has unique DNA and proteins — biotechnology detects these in patient samples to identify diseases like influenza.",
             "bodyZh": "每種病原體都有獨特的DNA和蛋白質——生物工程可在病人樣本中檢測這些物質以鑑定流感等疾病。",
             "qEn": "Pathogens can be identified by detecting their…", "qZh": "可透過檢測病原體的…來鑑定",
             "opts": ["Unique DNA or proteins 獨特DNA或蛋白質", "Body mass index 身體質量指數", "Food pyramid level 食物金字塔層級", "Mirror image 鏡中影像"],
             "a": "Unique DNA or proteins 獨特DNA或蛋白質",
             "why": "Pathogen ID from PPT. 簡報病原體鑑定。"},
            {"titleEn": "Benefits and ethics", "titleZh": "效益與倫理",
             "bodyEn": "Biotechnology offers benefits (medicine, food) but raises ethical questions about GM food safety and genetic privacy.",
             "bodyZh": "生物工程帶來益處（醫藥、食物），亦引發關於基因改造食物安全和基因私隱的倫理問題。",
             "qEn": "Using GM bacteria for insulin…", "qZh": "用改造細菌生產胰島素…",
             "opts": ["Reduces cost and allergy risk vs animal insulin 較動物胰島素成本低且過敏風險低", "Is slower and more expensive 更慢更貴", "Has no medical use 沒有醫學用途", "Destroys all bacteria globally 消滅全球細菌"],
             "a": "Reduces cost and allergy risk vs animal insulin 較動物胰島素成本低且過敏風險低",
             "why": "Insulin comparison in PPT. 簡報胰島素比較。"},
        ],
    },
]

# Placeholder metadata for Books 13–14 (Agents 4–5)
PLACEHOLDERS = [
    ("07_Atoms_Elements", "Atoms & Elements", "原子與元素", "Book 13 · Ch 1", "#7c3aed", "scicent_ppt_13_1_r_e.ppt"),
    ("08_Periodic_Table", "Periodic Table", "週期表", "Book 13 · Ch 2", "#6d28d9", "scicent_ppt_13_2_r_e.ppt"),
    ("09_Compounds", "Compounds", "化合物", "Book 13 · Ch 3", "#5b21b6", "scicent_ppt_13_3_r_e.ppt"),
    ("10_Metals", "Metals", "金屬", "Book 13 · Ch 4", "#4c1d95", "scicent_ppt_13_4_r_e.ppt"),
    ("11_Alloys_Materials", "Alloys & Materials", "合金與物料", "Book 13 · Ch 5", "#4338ca", "scicent_ppt_13_5_r_e.ppt"),
    ("12_Light_Sources", "Light Sources", "光源", "Book 14 · Ch 1", "#d97706", "scicent_ppt_14_1_e.ppt"),
    ("13_Reflection", "Reflection of Light", "光的反射", "Book 14 · Ch 2", "#b45309", "scicent_ppt_14_2_e.ppt"),
    ("14_Refraction", "Refraction of Light", "光的折射", "Book 14 · Ch 3", "#92400e", "scicent_ppt_14_3_e.ppt"),
    ("15_Total_Internal_Reflection", "Total Internal Reflection", "全內反射", "Book 14 · Ch 4", "#f59e0b", "scicent_ppt_14_4_e.ppt"),
    ("16_Lenses", "Lenses", "透鏡", "Book 14 · Ch 5", "#eab308", "scicent_ppt_14_5_e.ppt"),
    ("17_EM_Waves", "Electromagnetic Waves", "電磁波", "Book 14 · Ch 6", "#ca8a04", "scicent_ppt_14_6_e.ppt"),
    ("18_Light_Technology", "Light & Technology", "光與科技", "Book 14 · Ch 7", "#a16207", "scicent_ppt_14_7_e.ppt"),
]


def finish_lger(cfg):
    """Add guided, summary, review from learn steps."""
    learn = cfg["learn"]
    cfg["guided"] = [
        {"qEn": s["qEn"], "qZh": s["qZh"], "opts": s["opts"], "a": s["a"], "hint": s.get("why", "")}
        for s in learn[:4]
    ]
    cfg["summary"] = [
        {"en": s["bodyEn"], "zh": s["bodyZh"]} for s in learn[:4]
    ]
    cfg["review"] = [
        {"qEn": s["qEn"], "qZh": s["qZh"], "opts": s["opts"], "a": s["a"]}
        for s in learn[:5]
    ]
    return cfg


def placeholder_html(folder, title_en, title_zh, book_ch, accent, ppt):
    slug = folder.split("_", 1)[1].lower()
    return f'''<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title_en} · {title_zh} | Form 3 Junior Science</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
  <style>body {{ font-family: "Outfit", sans-serif; }}</style>
</head>
<body class="min-h-screen flex items-center justify-center" style="background: {accent}15">
  <div class="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg border text-center">
    <p class="text-xs font-bold uppercase tracking-widest" style="color:{accent}">{book_ch}</p>
    <h1 class="text-2xl font-extrabold text-slate-800 mt-2">{title_en} · {title_zh}</h1>
    <p class="text-slate-500 mt-4">LGER app placeholder — rebuild in progress per <code>CEO_F3_REBUILD_PLAN.md</code>.</p>
    <p class="text-sm text-slate-400 mt-2">PPT: <code>{ppt}</code></p>
    <a href="../index.html" class="inline-block mt-6 text-sm font-semibold hover:underline" style="color:{accent}">← Form 3 Hub</a>
  </div>
  <footer style="position:fixed;bottom:0;width:100%;text-align:center;padding:1rem;font-size:0.8rem;opacity:0.7;">@HKSTEAMAI All Copy-Right Reserved.</footer>
</body>
</html>
'''


def main():
    # Write updated configs (Book 12 full + Book 13/14 stubs for generator later)
    all_configs = [finish_lger(dict(c)) for c in BOOK12]

    # Load remaining configs from old file for 07-18 metadata (folder rename only)
    old_path = os.path.join(_DIR, "f3-lger-configs.json")
    with open(old_path, encoding="utf-8") as f:
        old = json.load(f)
    rename_map = {
        "17_Atoms_Elements": "07_Atoms_Elements",
        "18_Periodic_Table": "08_Periodic_Table",
        "19_Compounds": "09_Compounds",
        "20_Metals": "10_Metals",
        "21_Alloys_Materials": "11_Alloys_Materials",
        "22_Light_Sources": "12_Light_Sources",
        "23_Reflection": "13_Reflection",
        "24_Refraction": "14_Refraction",
        "25_Total_Internal_Reflection": "15_Total_Internal_Reflection",
        "26_Lenses": "16_Lenses",
        "27_EM_Waves": "17_EM_Waves",
        "28_Light_Technology": "18_Light_Technology",
    }
    for c in old:
        if c["folder"] in rename_map:
            nc = dict(c)
            nc["folder"] = rename_map[c["folder"]]
            nc["unit"] = nc["unit"].replace("Form 3 · Book 12", "Form 3 · Book 13").replace("Form 3 · Book 13 Matter", "Form 3 · Book 13 Matter")
            if nc["folder"].startswith("12_") or int(nc["folder"][:2]) >= 12:
                nc["unit"] = "Form 3 · Book 14 Light & EM Waves" if int(nc["folder"][:2]) >= 12 else nc["unit"]
            if nc["folder"].startswith(("07_", "08_", "09_", "10_", "11_")):
                nc["unit"] = "Form 3 · Book 13 Matter"
            all_configs.append(nc)

    with open(old_path, "w", encoding="utf-8") as f:
        json.dump(all_configs, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(all_configs)} configs to f3-lger-configs.json")

    # Generate Book 12 apps via generate-f3-lger
    spec = importlib.util.spec_from_file_location("f3gen", os.path.join(_DIR, "generate-f3-lger.py"))
    f3gen = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(f3gen)

    for cfg in all_configs[:6]:
        folder = cfg["folder"]
        out_dir = os.path.join(BASE, folder)
        os.makedirs(out_dir, exist_ok=True)
        html = f3gen.generate_f3_app(cfg)
        if len(html.encode("utf-8")) > 100_000:
            raise SystemExit(f"FAIL: {folder} exceeds 100 KB")
        with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Generated Book 12: {folder} ({len(html)//1024} KB)")

    # Placeholders 07-18
    for folder, en, zh, book, accent, ppt in PLACEHOLDERS:
        out_dir = os.path.join(BASE, folder)
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(placeholder_html(folder, en, zh, book, accent, ppt))
        print(f"Placeholder: {folder}")


if __name__ == "__main__":
    main()
