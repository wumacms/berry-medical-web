-- =============================================
-- 贝瑞医疗网站数据初始化脚本
-- =============================================

-- 1. 网站数据
INSERT INTO websites (id, name, domain, company_name, slogan, description, logo, url, icp, contact, nav_config, footer_config, seo) VALUES (
  'main', '贝瑞医疗', 'www.berrymedical.com.cn', '贝瑞医疗科技（郑州）有限公司', '核医学场所建设一站式服务商',
  '深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。',
  '/images/logos/logo.png', 'https://wumacms.github.io/berry-medical-web', '豫ICP备2025123456号',
  '{"phone": ["18503878846", "13215991477"], "email": "530051528@qq.com", "address": {"province": "河南省", "city": "郑州市", "street": "高新技术产业开发区瑞达路睿达广场1栋14层"}}'::jsonb,
  '{"logo": "/images/logos/logo.png", "logoAlt": "贝瑞医疗", "ctaButton": {"text": "免费咨询", "link": "/#contact"}}'::jsonb,
  '{"copyright": "© 2025 贝瑞医疗科技（郑州）有限公司", "icp": "豫ICP备2025123456号"}'::jsonb,
  '{"title": "贝瑞医疗 | 核医学场所建设一站式服务商", "keywords": ["核医学", "辐射防护"]}'::jsonb
);

-- 2. 页面数据
INSERT INTO pages (id, website_id, name, path, description, nav_sort_order, is_nav_visible, is_footer_visible) VALUES
  ('760dcc34-df32-4473-96bd-fa021c401837', 'main', '首页', '/', '贝瑞医疗首页', 1, true, true),
  ('4a260865-a9e2-45ab-a42e-6a100e02f37b', 'main', '新闻资讯', '/news', '新闻资讯页', 2, true, true),
  ('7e8d4f2a-3c5b-4e6f-8a9b-0c1d2e3f4a5b', 'main', '联系我们', '/contact', '联系我们页面', 3, true, true);

-- 3. 首页区块数据 - Hero和About
INSERT INTO blocks (id, page_id, type, title, sort_order, config) VALUES
('cd48f9d3-1388-49cc-a580-641638275fc6', '760dcc34-df32-4473-96bd-fa021c401837', 'hero', '首屏Hero', 1,
 '{"badge": "精准医疗 · 核创未来", "title": "专注核医学场所\n一站式服务商", "description": "从选址规划、辐射防护施工到智慧管理系统，贝瑞医疗为全国顶级医疗机构提供全产业链闭环解决方案。", "tags": ["15+年专业团队", "30+成功案例", "全流程GMP合规"]}'::jsonb),
('ae0eaf1e-7836-4fda-84ab-aa6b261be6cf', '760dcc34-df32-4473-96bd-fa021c401837', 'about', '关于我们', 2,
 '{"title": "精于专业 · 恪于安全 · 诚于客户", "subtitle": "核医学一站式服务领航者", "description": "贝瑞医疗科技（郑州）有限公司是一家专注于核医学场所建设的高新技术企业，业务涵盖放射性药物制备设施、PET/CT机房、核素治疗病房等场所的选址评估、方案设计、辐射防护施工及智能管理系统开发。", "image": "/images/about/team.jpg", "imageAlt": "核医学实验室团队", "features": [{"icon": "fa-drafting-compass", "text": "工艺设计/专项施工图"}, {"icon": "fa-hard-hat", "text": "辐射防护施工/三废处理"}, {"icon": "fa-chart-line", "text": "智慧核医学管理系统"}, {"icon": "fa-hand-holding-heart", "text": "7×24h运维检测"}]}'::jsonb);

-- 4. 服务概览和服务详情区块
INSERT INTO blocks (page_id, type, title, sort_order, config) VALUES
('202a6fe0-4627-4485-931b-ba8c4eb295b9', '760dcc34-df32-4473-96bd-fa021c401837', 'services', '服务概览', 3,
 '{"title": "我们的服务", "subtitle": "全流程 · 全方位 · 全周期", "cards": [{"id": "design", "icon": "fa-pencil-ruler", "title": "设计", "subtitle": "选址评估 · 布局优化 · 辐射分区 · GMP标准洁净区设计 · 通风系统独立气流组织", "features": [{"icon": "fa-check-circle", "text": "辐射控制区/监督区精细化分区，保障医患安全"}, {"icon": "fa-check-circle", "text": "独立通风系统设计，气流自非放射区→控制区，排气高效过滤"}, {"icon": "fa-check-circle", "text": "衰变池、防护屏蔽、制药区域C级背景局部A级环境设计"}]}, {"id": "construction", "icon": "fa-hard-hat", "title": "施工", "subtitle": "辐射防护施工 · 放射性废水处理系统 · 多工种协同管理 · 全程驻点", "features": [{"icon": "fa-check-circle", "text": "铅防护门窗、铅玻璃、铅板等辐射屏蔽工程"}, {"icon": "fa-check-circle", "text": "智能衰变池系统，自动监测与处理放射性废水"}, {"icon": "fa-check-circle", "text": "放射性固体废物暂存与处理系统"}]}, {"id": "equipment", "icon": "fa-microscope", "title": "设备", "subtitle": "核素治疗监测 · 辐射监测仪器 · 药物操作热室/手套箱", "features": [{"icon": "fa-check-circle", "text": "核素治疗监测设备"}, {"icon": "fa-check-circle", "text": "辐射监测仪器（个人剂量仪、环境监测仪）"}, {"icon": "fa-check-circle", "text": "活度计CRC-55tR"}]}], "detailLinks": [{"id": "service-design", "text": "设计 · 规划布局", "icon": "fa-pencil-ruler"}, {"id": "service-construction", "text": "施工 · 辐射防护", "icon": "fa-hard-hat"}, {"id": "service-equipment", "text": "设备 · 监测仪器", "icon": "fa-microscope"}, {"id": "service-software", "text": "瑞核V1.0智慧系统", "icon": "fa-chart-line"}]}'::jsonb),
('c989d453-ebc1-4c58-93c3-fa3774619305', '760dcc34-df32-4473-96bd-fa021c401837', 'service-detail', '设计篇', 4,
 '{"id": "service-design", "badge": "精准设计 · 合规先行", "title": "全流程核医学专项设计", "image": "/images/services/design.jpg", "imageAlt": "核医学设计规划与布局", "description": "从选址评估到施工图落地，贝瑞设计团队严格遵循药品GMP、GBZ系列及放射性药品附录，为客户提供功能优化与成本可控的专项设计。", "features": [{"icon": "fa-check-circle", "text": "辐射控制区/监督区精细化分区，保障医患安全"}, {"icon": "fa-check-circle", "text": "独立通风系统设计，气流自非放射区→控制区，排气高效过滤"}, {"icon": "fa-check-circle", "text": "衰变池、防护屏蔽、制药区域C级背景局部A级环境设计"}, {"icon": "fa-check-circle", "text": "药监GMP专家检查及环保、卫评验收一站式技术支持"}]}'::jsonb),
('26a2cab3-3c4b-4d5d-911d-fc1877de8474', '760dcc34-df32-4473-96bd-fa021c401837', 'service-detail', '施工篇', 5,
 '{"id": "service-construction", "badge": "匠心施工 · 全程可控", "title": "辐射防护与净化工程总承包", "image": "/images/services/construction.jpg", "imageAlt": "核医学辐射防护施工", "description": "多工种交叉协同，驻点管理确保进度与质量。辐射防护门窗、围护结构、三废处理系统一次性通过环保验收及职业病危害控制效果评价。", "features": [{"icon": "fa-shield-virus", "text": "防护门窗/铅玻璃/防护涂料施工，满足环评卫评要求"}, {"icon": "fa-water", "text": "智能放射性废水衰变系统（长短半衰期双系）达标排放"}, {"icon": "fa-chart-line", "text": "放射性药物制备净化场所施工，通过药监GMP专家检查"}, {"icon": "fa-clock", "text": "全程项目管理 + 7×24h运维保障，无缝衔接验收"}]}'::jsonb),
('62653046-284a-4bf3-b811-ba5f44aba416', '760dcc34-df32-4473-96bd-fa021c401837', 'service-detail', '设备篇', 6,
 '{"id": "service-equipment", "badge": "尖端设备 · 智慧监测", "title": "核素治疗及辐射监测仪器", "image": "/images/services/equipment.jpg", "imageAlt": "核医学监测与防护设备", "description": "提供从放射性药物操作、分装到患者治疗监测、环境辐射安全的完整设备链，助力核医学科高效合规运行。", "features": [{"icon": "fa-syringe", "text": "I-131体内活度测量系统 / 全身动态辐射显像（Clairvoyant2）"}, {"icon": "fa-radiation", "text": "RadTarge个人剂量仪、RadWal环境辐射监测仪、便携式巡测仪"}, {"icon": "fa-cube", "text": "防护手套箱、合成热室、分装热室、一体化注射防护台"}, {"icon": "fa-flask", "text": "CRC-55tR活度计 / 全自动脚踏式放射性废物箱 / 转运防护罐"}]}'::jsonb),
('967cb28f-f4ce-4881-bf40-7459c08b40ad', '760dcc34-df32-4473-96bd-fa021c401837', 'service-detail', '瑞核系统', 7,
 '{"id": "service-software", "badge": "智慧管理 · 数字赋能", "title": "瑞核V1.0 核医学智慧管理系统", "image": "/images/services/software.jpg", "imageAlt": "智慧管理系统界面", "description": "1中心+2平台+4维度+N应用，实现设备运行、辐射安全、安防、日常运营全维度管理。物理空间1:1虚拟映射，数据驱动主动预判。", "features": [{"icon": "fa-check-circle", "text": "辐射剂量数字孪生预演模块"}, {"icon": "fa-check-circle", "text": "人员路径优化与实时监控"}, {"icon": "fa-check-circle", "text": "设备运行状态智能监测"}, {"icon": "fa-check-circle", "text": "7×24小时远程运维支持"}]}'::jsonb);

-- 5. 优势、案例、新闻、CTA区块（首页已移除 contact 区块）
INSERT INTO blocks (id, page_id, type, title, sort_order, config) VALUES
('ce32dd33-af9f-42fb-a2bd-d7a937155650', '760dcc34-df32-4473-96bd-fa021c401837', 'advantages', '核心优势', 8,
 '{"title": "为什么选择贝瑞医疗", "subtitle": "核心技术壁垒 · 深度行业积淀", "items": [{"icon": "fa-chart-line", "value": "10+", "label": "四类《放射性药品使用许可证》取证支持"}, {"icon": "fa-users", "value": "15+年", "label": "核医学场所专业团队经验"}, {"icon": "fa-building", "value": "30+", "label": "医疗机构建设案例"}, {"icon": "fa-file-alt", "value": "100+", "label": "核医学方案技术咨询"}], "highlights": [{"icon": "fa-book-open", "text": "参编核医学行业规范标准"}, {"icon": "fa-hard-hat", "text": "擅长复杂场地改造&狭小空间优化"}], "badge": "全流程许可证办理支持"}'::jsonb),
('f5bb4ff3-21a1-4c3b-9e9d-8c0aba3ceb76', '760dcc34-df32-4473-96bd-fa021c401837', 'projects', '业绩案例', 9,
 '{"title": "合作案例 · 实力见证", "subtitle": "全国顶级医院及科研机构信赖之选", "items": ["复旦大学附属中山医院", "陆军军医大学西南医院", "南昌大学第一附属医院", "福建医科大学附属第一医院", "广东省第二人民医院", "宜春市人民医院", "遵义医科大学附属医院", "新疆医科大学附属肿瘤医院", "国家肿瘤区域医疗中心", "远大医药（中国）"]}'::jsonb),
('fbdb87fb-ddc2-4aa3-ae4f-c4341f850910', '760dcc34-df32-4473-96bd-fa021c401837', 'news', '新闻动态', 10,
 '{"title": "贝瑞动态 · 核医前沿", "subtitle": "行业资讯 | 技术突破 | 公司要闻", "limit": 3, "showMoreButton": {"text": "查看全部新闻", "link": "/news"}}'::jsonb),
('33ec99bc-8901-430e-9532-da2856f06a92', '760dcc34-df32-4473-96bd-fa021c401837', 'cta', '行动召唤', 12,
 '{"title": "赋能精准医疗 · 共建核医学科标杆", "description": "从设计到验收，贝瑞医疗让核医学场所建设更专业、更安全。"}'::jsonb);

-- 5.1 联系我们页面区块
INSERT INTO blocks (id, page_id, type, title, sort_order, config) VALUES
('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', '7e8d4f2a-3c5b-4e6f-8a9b-0c1d2e3f4a5b', 'contact', '联系我们', 1,
 '{"title": "联系我们", "description": "立即沟通，获取核医学场所建设一站式解决方案"}'::jsonb);

-- 6. 新闻页区块
INSERT INTO blocks (id, page_id, type, title, sort_order, config) VALUES
('22cffa67-2302-42f2-98ba-655b7ac30efb', '4a260865-a9e2-45ab-a42e-6a100e02f37b', 'hero', '新闻页Hero', 1,
 '{"badge": "贝瑞动态 · 核医前沿", "title": "新闻与洞察", "subtitle": "行业前沿资讯、技术突破、公司要闻及核医学领域深度观察"}'::jsonb),
('389d1ccb-c3c2-449b-b274-6c79ff775589', '4a260865-a9e2-45ab-a42e-6a100e02f37b', 'news-list', '新闻列表', 2,
 '{"categories": ["全部", "公司要闻", "技术突破", "行业政策", "展会活动"], "pageSize": 9}'::jsonb);

-- 7. 新闻数据
INSERT INTO news (id, title, excerpt, content, date, category, image, views, tags) VALUES
('16b027f7-cc0c-4747-ab27-1ed63181eeb0', '贝瑞医疗携瑞核V1.2亮相全国核医学年会，数字孪生成焦点',
 '在2025年全国核医学学术年会上，贝瑞医疗展示了全新升级的瑞核智慧管理系统，通过数字孪生技术实现辐射防护预演，吸引数百位专家驻足交流。',
 '<p>2025年全国核医学学术年会于4月15日至18日在上海国际会议中心成功举办。</p><h2>数字孪生技术引领行业创新</h2><p>贝瑞医疗重点展示的瑞核V1.2系统采用先进的数字孪生技术，能够1:1还原核医学科物理空间。</p>',
 '2025-04-18', '公司要闻', '/images/news/cover-1.jpg', 1245, ARRAY['全国核医学年会', '数字孪生', '瑞核V1.2']),
('3f52d521-da46-4ee8-a82a-40102b5225bb', '助力核药创新：贝瑞为多家药企定制GMP级热室，加速Lu-177临床转化',
 '公司放射性药物设备事业部宣布，已为国内三家创新药企提供符合cGMP标准的热室及分装系统，推动靶向放射性核素治疗药物上市进程。',
 '<p>随着靶向放射性核素治疗（Theranostics）在国内快速发展，符合GMP标准的放射性药物制备设施需求日益增长。</p><h2>定制化解决方案</h2><p>针对不同药企的药物研发管线，贝瑞医疗技术团队提供了从设计咨询、设备选型到安装验证的全流程服务。</p>',
 '2025-04-10', '技术突破', '/images/news/cover-2.jpg', 876, ARRAY['Lu-177', 'GMP热室', '放射性药物']),
('f83b4e00-632f-4ab3-9e9f-d3b6cac48f79', '新版《核医学辐射防护标准》解读：贝瑞医疗参与起草，智慧化成关键词',
 '国家卫生健康委发布最新核医学辐射防护标准，贝瑞医疗作为行业参编单位，深度参与智能化监测与衰变池规范章节撰写。',
 '<p>国家卫生健康委发布最新核医学辐射防护标准，贝瑞医疗作为行业参编单位深度参与。</p><h2>智能化监测成为重点</h2><p>新版标准在智能化监测方面提出了更高要求，强调实时监测与预警功能。</p>',
 '2025-03-28', '行业政策', '/images/news/cover-3.jpg', 654, ARRAY['辐射防护标准', '行业政策', '智慧化']),
('bf3a2c3e-5d4b-4c1c-b81e-191275a0502d', '瑞核V1.0荣获医疗信息化创新金奖，引领核医学科智慧管理变革',
 '在2025中国医疗信息化大会上，贝瑞医疗自主研发的"瑞核V1.0核医学智慧管理系统"凭借数字孪生及全维度监测功能获得创新金奖。',
 '<p>在2025中国医疗信息化大会上，瑞核V1.0凭借数字孪生及全维度监测功能获得创新金奖。</p><h2>行业认可</h2><p>与会专家对瑞核V1.0的创新性给予高度评价，认为其代表了核医学科智慧管理的未来方向。</p>',
 '2025-03-15', '公司要闻', '/images/news/cover-2.jpg', 1023, ARRAY['瑞核V1.0', '创新金奖', '智慧管理']),
('3680a3ed-ccd3-402f-9a7e-f800373f0fd8', '贝瑞医疗郑州展厅开放日：沉浸式体验核医学防护施工全流程',
 '3月28日，贝瑞医疗郑州总部展厅首次对外开放，现场演示辐射防护材料测试及衰变池智能控制系统，吸引众多医院基建科代表参加。',
 '<p>贝瑞医疗郑州总部展厅首次对外开放，吸引众多医院基建科代表参加。</p><h2>沉浸式体验</h2><p>参观者可亲身体验辐射防护材料测试，了解衰变池智能控制系统的工作原理。</p>',
 '2025-03-05', '展会活动', '/images/news/cover-3.jpg', 543, ARRAY['展厅开放', '展会活动', '沉浸式体验']),
('703c5fe3-7504-4ca3-9a9f-19b3e1c86508', '贝瑞医疗与芬兰核医学中心达成战略合作，引入北欧辐射防护技术',
 '双方将共同研发新一代智能化放射性废物处理系统，提升核医学科环保与安全水平。',
 '<p>双方将共同研发新一代智能化放射性废物处理系统，提升核医学科环保与安全水平。</p>',
 '2025-02-20', '公司要闻', '/images/news/cover-1.jpg', 789, ARRAY['国际合作', '战略合作', '技术引进']);
