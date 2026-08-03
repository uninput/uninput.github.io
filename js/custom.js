document.addEventListener("DOMContentLoaded", function () {
  async function cardHistory() {
    const historyContainer = document.getElementById("history-container");
    if (!historyContainer) return;

    const data = await fetchHistoryData();
    const html = data
      .map(
        (item) => `
         <div class="swiper-slide history_slide">
             <span class="history_slide_time">A.D.${item.year}</span>
             <span class="history_slide_link">${item.title}</span>
         </div>
     `
      )
      .join("");

    const swiperContainer = document.querySelector(".history_swiper-container");
    document.getElementById("history_container_wrapper").innerHTML = html;

    const swiperHistory = new Swiper(swiperContainer, {
      loop: true,
      direction: "vertical",
      autoplay: { disableOnInteraction: true, delay: 5000 },
      mousewheel: false,
    });

    historyContainer.onmouseenter = () => swiperHistory.autoplay.stop();
    historyContainer.onmouseleave = () => swiperHistory.autoplay.start();
  }

  cardHistory();
  document.addEventListener("pjax:complete", cardHistory);

  async function fetchHistoryData() {
    const myDate = new Date();
    const month = `${myDate.getMonth() + 1}`.padStart(2, "0");
    const day = `${myDate.getDate()}`.padStart(2, "0");
    const formattedDate = `${month}${day}`;
    const historyDataUrl = `https://api.nsmao.net/api/history/query?key=kkcgcpXt9k9DK1Lwmi5ZZ9boxI`; //请到:https://api.76.al申请

    try {
      const response = await fetch(historyDataUrl);
      const result = await response.json();

      if (result.code === 200) {
        const data = result.data;
        const formattedData = Object.entries(data).map(([year, event]) => ({
          year: year.replace(/年$/, ""),
          title: event,
        }));
        return formattedData;
      } else {
        console.error("Error fetching history data:", result.msg);
        return [];
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }

  cardHistory();
  document.addEventListener("pjax:complete", cardHistory);
});

let ipLocation; // 确保 ipLocation 在全局范围内定义

// 进行 fetch 请求
fetch('https://api.nsmao.net/api/ipip/query?key=kkcgcpXt9k9DK1Lwmi5ZZ9boxI') //申请key:https://api.nsmao.net
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        ipLocation = data;
        if (isHomePage()) {
            showWelcome();
        }
    })
    .catch(error => console.error('Error:', error));

function getDistance(e1, n1, e2, n2) {
    const R = 6371;
    const { sin, cos, asin, PI, hypot } = Math;
    let getPoint = (e, n) => {
        e *= PI / 180;
        n *= PI / 180;
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
    };

    let a = getPoint(e1, n1);
    let b = getPoint(e2, n2);
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    let r = asin(c / 2) * 2 * R;
    return Math.round(r);
}

function showWelcome() {
    if (!ipLocation || !ipLocation.data) {
        return;
    }

    let dist = getDistance(122.68124243118194,40.88402123360384, ipLocation.data.lng, ipLocation.data.lat); // 修改自己的经度（121.413921）纬度（31.089290）
    let pos = ipLocation.data.country;
    let ip = ipLocation.ip;
    let posdesc;

    switch (ipLocation.data.country) {
        case "日本":
            posdesc = "よろしく，一起去看樱花吗";
            break;
        case "美国":
            posdesc = "Let us live in peace!";
            break;
        case "英国":
            posdesc = "想同你一起夜乘伦敦眼";
            break;
        case "俄罗斯":
            posdesc = "干了这瓶伏特加！";
            break;
        case "法国":
            posdesc = "C'est La Vie";
            break;
        case "德国":
            posdesc = "Die Zeit verging im Fluge.";
            break;
        case "澳大利亚":
            posdesc = "一起去大堡礁吧！";
            break;
        case "加拿大":
            posdesc = "拾起一片枫叶赠予你";
            break;
        case "中国":
            pos = ipLocation.data.province + " " + ipLocation.data.city;
            switch (ipLocation.data.province) {
                case "北京":
                    posdesc = "北——京——欢迎你~~~";
                    break;
                case "上海":
                    posdesc = "走在外滩，感受历史与现代的交融。";
                    break;
                case "广东":
                    switch (ipLocation.data.city) {
                        case "广州":
                            posdesc = "看小蛮腰，喝早茶了嘛~";
                            break;
                        case "深圳":
                            posdesc = "今天你逛商场了嘛~";
                            break;
                        case "珠海":
                            posdesc = "浪漫之城珠海，海风轻拂。";
                            break;
                        case "东莞":
                            posdesc = "东莞，制造业之都，经济活跃。";
                            break;
                        case "佛山":
                            posdesc = "佛山，武术之乡，陶瓷文化深厚。";
                            break;
                        default:
                            posdesc = "带你感受广东的热情与美食！";
                            break;
                    }
                    break;
                case "浙江":
                    switch (ipLocation.data.city) {
                        case "杭州":
                            posdesc = "西湖美景，三月天~";
                            break;
                        case "宁波":
                            posdesc = "来宁波，感受大海的气息。";
                            break;
                        case "温州":
                            posdesc = "温州人杰地灵，商贸繁荣。";
                            break;
                        case "绍兴":
                            posdesc = "绍兴，酒乡文化，古韵悠长。";
                            break;
                        case "湖州":
                            posdesc = "湖州，太湖之滨，风景如画。";
                            break;
                        default:
                            posdesc = "这里是浙江，充满江南的韵味！";
                            break;
                    }
                    break;
                case "四川":
                    switch (ipLocation.data.city) {
                        case "成都":
                            posdesc = "宽窄巷子，成都慢生活。";
                            break;
                        case "绵阳":
                            posdesc = "享受科技城的宁静与创新。";
                            break;
                        case "自贡":
                            posdesc = "自贡的盐文化与灯会，独具魅力。";
                            break;
                        case "德阳":
                            posdesc = "德阳，历史悠久，文化底蕴深厚。";
                            break;
                        case "乐山":
                            posdesc = "乐山大佛，世界文化遗产。";
                            break;
                        default:
                            posdesc = "来四川，品麻辣火锅，赏壮丽山河。";
                            break;
                    }
                    break;
                case "福建":
                    switch (ipLocation.data.city) {
                        case "厦门":
                            posdesc = "鼓浪屿听海，厦门美食让人流连忘返。";
                            break;
                        case "福州":
                            posdesc = "有福之州，来此感受千年古城。";
                            break;
                        case "泉州":
                            posdesc = "泉州，海上丝绸之路的起点。";
                            break;
                        case "漳州":
                            posdesc = "漳州，古城文化与美食的结合。";
                            break;
                        case "南平":
                            posdesc = "南平，武夷山的自然风光。";
                            break;
                        default:
                            posdesc = "福建山水如画，美景无处不在。";
                            break;
                    }
                    break;
                case "山东":
                    switch (ipLocation.data.city) {
                        case "青岛":
                            posdesc = "来青岛喝啤酒，看大海吧！";
                            break;
                        case "济南":
                            posdesc = "泉城济南，四面荷花三面柳。";
                            break;
                        case "烟台":
                            posdesc = "烟台的葡萄酒与海鲜，令人陶醉。";
                            break;
                        case "潍坊":
                            posdesc = "潍坊，风筝之都，文化底蕴深厚。";
                            break;
                        case "德州":
                            posdesc = "德州，扒鸡闻名，文化悠久。";
                            break;
                        default:
                            posdesc = "山东好客，欢迎来感受齐鲁文化！";
                            break;
                    }
                    break;
                case "江苏":
                    switch (ipLocation.data.city) {
                        case "南京":
                            posdesc = "六朝古都南京，历史与现代的碰撞。";
                            break;
                        case "苏州":
                            posdesc = "来苏州，感受园林之美。";
                            break;
                        case "无锡":
                            posdesc = "无锡太湖美景，灵山大佛令人心旷神怡。";
                            break;
                        case "常州":
                            posdesc = "常州，文化与科技的交汇点。";
                            break;
                        case "南通":
                            posdesc = "南通，海门潮涌，文化底蕴深厚。";
                            break;
                        default:
                            posdesc = "水乡泽国，江南佳丽地。";
                            break;
                    }
                    break;
                case "河北":
                    posdesc = "燕赵大地，英雄辈出的河北，等你探索！";
                    break;
                case "河南":
                    switch (ipLocation.data.city) {
                        case "郑州":
                            posdesc = "中原大地，郑州是交通枢纽与历史重镇。";
                            break;
                        case "洛阳":
                            posdesc = "千年古都洛阳，牡丹花开的城。";
                            break;
                        case "开封":
                            posdesc = "开封，古都文化与美食的汇聚地。";
                            break;
                        case "新乡":
                            posdesc = "新乡，历史悠久，文化底蕴深厚。";
                            break;
                        case "焦作":
                            posdesc = "焦作，云台山的自然风光。";
                            break;
                        default:
                            posdesc = "这里是河南，历史悠久文化灿烂。";
                            break;
                    }
                    break;
                case "湖南":
                    switch (ipLocation.data.city) {
                        case "长沙":
                            posdesc = "热辣长沙，吃小龙虾逛黄兴路步行街。";
                            break;
                        case "岳阳":
                            posdesc = "岳阳楼，洞庭湖的美景尽收眼底。";
                            break;
                        case "株洲":
                            posdesc = "株洲，火车制造业的发源地。";
                            break;
                        case "湘潭":
                            posdesc = "湘潭，伟人故里，文化底蕴深厚。";
                            break;
                        default:
                            posdesc = "湖南，烟雨迷蒙的湘江流过这片土地。";
                            break;
                    }
                    break;
                case "湖北":
                    switch (ipLocation.data.city) {
                        case "武汉":
                            posdesc = "来大武汉，过长江大桥，吃热干面！";
                            break;
                        case "宜昌":
                            posdesc = "三峡大坝，壮丽的自然奇观。";
                            break;
                        case "荆州":
                            posdesc = "荆州，历史文化名城，古韵悠长。";
                            break;
                        case "襄阳":
                            posdesc = "襄阳，古城文化与美食的结合。";
                            break;
                        default:
                            posdesc = "湖北，长江中游的明珠，风景秀丽。";
                            break;
                    }
                    break;
                case "安徽":
                    switch (ipLocation.data.city) {
                        case "合肥":
                            posdesc = "创新之城合肥，科教文化汇聚地。";
                            break;
                        case "黄山":
                            posdesc = "黄山，天下第一奇山，风景如画。";
                            break;
                        case "芜湖":
                            posdesc = "芜湖，长江之畔，文化底蕴深厚。";
                            break;
                        case "马鞍山":
                            posdesc = "马鞍山，文化与自然的完美结合。";
                            break;
                        default:
                            posdesc = "安徽山水，黄山、九华山欢迎你。";
                            break;
                    }
                    break;
                case "广西":
                    switch (ipLocation.data.city) {
                        case "桂林":
                            posdesc = "桂林山水甲天下，风景如画。";
                            break;
                        case "南宁":
                            posdesc = "绿城南宁，宜居宜游。";
                            break;
                        case "柳州":
                            posdesc = "柳州的螺蛳粉，独具风味。";
                            break;
                        case "防城港":
                            posdesc = "防城港，海洋资源丰富，风景迷人。";
                            break;
                        default:
                            posdesc = "广西山清水秀，民俗风情浓郁。";
                            break;
                    }
                    break;
                case "贵州":
                    switch (ipLocation.data.city) {
                        case "贵阳":
                            posdesc = "贵阳，山城之美，民族风情浓郁。";
                            break;
                        case "遵义":
                            posdesc = "遵义，红色之城，历史悠久。";
                            break;
                        case "安顺":
                            posdesc = "安顺，黄果树瀑布的故乡，风景如画。";
                            break;
                        case "毕节":
                            posdesc = "毕节，拥有丰富的自然资源与人文景观。";
                            break;
                        case "六盘水":
                            posdesc = "六盘水，凉爽的夏天，避暑胜地。";
                            break;
                        case "铜仁":
                            posdesc = "铜仁，秀美的山水与独特的民族文化。";
                            break;
                        case "凯里":
                            posdesc = "凯里，苗族文化的发源地，风情独特。";
                            break;
                        default:
                            posdesc = "来贵州，品茅台，赏黄果树瀑布。";
                            break;
                    }
                    break;
                case "云南":
                    switch (ipLocation.data.city) {
                        case "昆明":
                            posdesc = "春城昆明，四季如春，风景秀丽。";
                            break;
                        case "大理":
                            posdesc = "苍山洱海，大理古城，你来了就不想走。";
                            break;
                        case "丽江":
                            posdesc = "丽江古城，纳西文化的瑰宝。";
                            break;
                        case "西双版纳":
                            posdesc = "西双版纳，热带雨林的奇妙之地。";
                            break;
                        default:
                            posdesc = "云南风景独特，风情万种。";
                            break;
                    }
                    break;
                case "西藏":
                    switch (ipLocation.data.city) {
                        case "拉萨":
                            posdesc = "拉萨，西藏的首府，布达拉宫的故乡。";
                            break;
                        case "日喀则":
                            posdesc = "日喀则，历史悠久的文化名城。";
                            break;
                        case "林芝":
                            posdesc = "林芝，素有“西藏江南”之称，风景如画。";
                            break;
                        case "昌都":
                            posdesc = "昌都，历史悠久，文化底蕴深厚。";
                            break;
                        case "山南":
                            posdesc = "山南，藏文化的发源地之一。";
                            break;
                        case "那曲":
                            posdesc = "那曲，草原风光，牧民生活的地方。";
                            break;
                        case "阿里":
                            posdesc = "阿里，神秘的西部，拥有壮丽的自然景观。";
                            break;
                        default:
                            posdesc = "西藏，神秘而纯净，等待你的探索。";
                            break;
                    }
                    break;
                case "新疆维吾尔":
                    posdesc = "辽阔新疆，民族风情与壮丽景观并存。";
                    switch (ipLocation.data.city) {
                        case "乌鲁木齐":
                            posdesc = "乌鲁木齐，天山脚下的城市，文化多元。";
                            break;
                        case "喀什":
                            posdesc = "喀什，古丝绸之路的重要节点，历史悠久。";
                            break;
                        case "克拉玛依":
                            posdesc = "克拉玛依，石油之城，经济发展迅速。";
                            break;
                        case "吐鲁番":
                            posdesc = "吐鲁番，火焰山的故乡，葡萄之乡。";
                            break;
                        case "哈密":
                            posdesc = "哈密，哈密瓜的发源地，风景如画。";
                            break;
                        case "博乐":
                            posdesc = "博乐，草原风光，民族文化交融。";
                            break;
                        case "阿克苏":
                            posdesc = "阿克苏，苹果之乡，风景秀丽。";
                            break;
                        case "和田":
                            posdesc = "和田，玉石之乡，历史文化深厚。";
                            break;
                        default:
                            posdesc = "新疆的城市各具特色，等待你的探索。";
                            break;
                    }
                    break;
                case "内蒙古":
                    switch (ipLocation.data.city) {
                        case "呼和浩特":
                            posdesc = "呼和浩特，内蒙古的首府，历史悠久。";
                            break;
                        case "包头":
                            posdesc = "包头，钢铁之城，经济发展迅速。";
                            break;
                        case "乌兰察布":
                            posdesc = "乌兰察布，草原文化与现代城市的结合。";
                            break;
                        case "赤峰":
                            posdesc = "赤峰，拥有丰富的自然资源与人文景观。";
                            break;
                        case "通辽":
                            posdesc = "通辽，草原文化的发源地，风情独特。";
                            break;
                        case "鄂尔多斯":
                            posdesc = "鄂尔多斯，现代化城市与草原文化的交融。";
                            break;
                        case "巴彦淖尔":
                            posdesc = "巴彦淖尔，黄河之畔，风景如画。";
                            break;
                        case "锡林郭勒":
                            posdesc = "锡林郭勒，草原辽阔，马背上的民族风情。";
                            break;
                        default:
                            posdesc = "草原辽阔的内蒙古，等你来策马奔腾。";
                            break;
                    }
                    break;
                case "宁夏回族":
                    posdesc = "宁夏，塞上江南，黄河流经的美丽地方。";
                    break;
                case "海南":
                    posdesc = "阳光、沙滩、椰风海韵，欢迎来海南度假。";
                    break;
                case "陕西":
                    switch (ipLocation.data.city) {
                        case "西安":
                            posdesc = "西安，古都文化与兵马俑的故乡。";
                            break;
                        case "咸阳":
                            posdesc = "咸阳，历史悠久，文化底蕴深厚。";
                            break;
                        default:
                            posdesc = "陕西，历史与文化的交汇之地。";
                            break;
                    }
                    break;
                case "甘肃":
                    switch (ipLocation.data.city) {
                        case "兰州":
                            posdesc = "兰州，黄河之滨，牛肉面闻名。";
                            break;
                        case "天水":
                            posdesc = "天水，历史悠久，文化底蕴深厚。";
                            break;
                        default:
                            posdesc = "甘肃，丝绸之路的重要节点。";
                            break;
                    }
                    break;
                case "青海":
                    switch (ipLocation.data.city) {
                        case "西宁":
                            posdesc = "西宁，青海湖的门户，风景如画。";
                            break;
                        default:
                            posdesc = "青海，湖泊与草原的美丽结合。";
                            break;
                    }
                    break;
                case "吉林":
                    switch (ipLocation.data.city) {
                        case "长春":
                            posdesc = "长春，汽车城，文化底蕴深厚。";
                            break;
                        case "吉林市":
                            posdesc = "吉林市，松花江畔，风景如画。";
                            break;
                        default:
                            posdesc = "吉林，冰雪与文化的交融之地。";
                            break;
                    }
                    break;
                case "黑龙江":
                    switch (ipLocation.data.city) {
                        case "哈尔滨":
                            posdesc = "哈尔滨，冰雪之城，俄罗斯风情浓厚。";
                            break;
                        case "齐齐哈尔":
                            posdesc = "齐齐哈尔，黑龙江的明珠，文化底蕴深厚。";
                            break;
                        default:
                            posdesc = "黑龙江，冰雪与文化的交汇之地。";
                            break;
                    }
                    break;
                default:
                    posdesc = "带我去你的城逛逛吧！";
                    break;
            }
            break;
        default:
            posdesc = "带我去你的国家逛逛吧";
            break;
    }

    // 根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>🌤️ 早上好，一日之计在于晨</span>";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>☀️ 中午好，记得午休喔~</span>";
    else if (date.getHours() >= 13 && date.getHours() < 17) timeChange = "<span>🕞 下午好，饮茶先啦！</span>";
    else if (date.getHours() >= 17 && date.getHours() < 19) timeChange = "<span>🚶‍♂️ 即将下班，记得按时吃饭~</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>🌙 晚上好，夜生活嗨起来！</span>";
    else timeChange = "夜深了，早点休息，少熬夜";

    let welcomeInfoElement = document.getElementById("welcome-info");

    if (welcomeInfoElement) {
        welcomeInfoElement.innerHTML =
            `欢迎来自 <b><span style="color: var(--efu-main)">${pos}</span></b> 的小友💖<br>当前位置距博主约 <b><span style="color: var(--efu-main)">${dist.toFixed(2)}</span></b> 公里！<br>${timeChange}<br>Tip：<b><span style="font-size: 15px;">${posdesc}</span></b>`;
    }
}

function handlePjaxComplete() {
    if (isHomePage()) {
        showWelcome();
    }
}

function isHomePage() {
    return window.location.pathname === '/' || window.location.pathname === '/index.html';
}

window.onload = function () {
    if (isHomePage()) {
        showWelcome();
    }
    document.addEventListener("pjax:complete", handlePjaxComplete);
}