// 十维度 顺时针顺序（和你截图雷达排列完全一致）
const dimensionList = [
    { name: "温暖", type: "nurture", color: "#e08898" },
    { name: "冷暴力", type: "consume", color: "#7088c8" },
    { name: "翻旧账", type: "consume", color: "#7088c8" },
    { name: "阴阳怪气", type: "consume", color: "#7088c8" },
    { name: "情感淡漠", type: "consume", color: "#7088c8" },
    { name: "第三者", type: "consume", color: "#7088c8" },
    { name: "专一", type: "nurture", color: "#e08898" },
    { name: "陪伴", type: "nurture", color: "#e08898" },
    { name: "引导", type: "nurture", color: "#e08898" },
    { name: "理解", type: "nurture", color: "#e08898" }
];

// 10道题目
const questionList = [
    {
        dimIndex: 0,
        title: "对方低落难过时，你通常会？",
        options: [
            { text: "无视或觉得对方矫情", score: 0 },
            { text: "简单安慰两句，不会深入陪伴", score: 50 },
            { text: "耐心安抚，主动共情给予温暖", score: 100 }
        ]
    },
    {
        dimIndex: 9,
        title: "发生矛盾时，你能换位思考理解对方难处吗？",
        options: [
            { text: "只在乎自己感受，不肯让步", score: 0 },
            { text: "偶尔会换位思考，但很难妥协", score: 50 },
            { text: "主动站对方角度思考，包容差异", score: 100 }
        ]
    },
    {
        dimIndex: 8,
        title: "对方迷茫困惑时，你会怎么做？",
        options: [
            { text: "打击否定，觉得对方没用", score: 0 },
            { text: "随便给点建议，不深度引导", score: 50 },
            { text: "耐心开导，正向引导对方成长", score: 100 }
        ]
    },
    {
        dimIndex: 7,
        title: "空闲时间你愿意主动陪伴另一半吗？",
        options: [
            { text: "宁愿独处/和朋友玩，回避陪伴", score: 0 },
            { text: "需要对方主动约才愿意陪伴", score: 50 },
            { text: "主动腾出时间，享受二人陪伴", score: 100 }
        ]
    },
    {
        dimIndex: 6,
        title: "面对异性示好，你能否保持专一边界？",
        options: [
            { text: "不拒绝暧昧，享受多人好感", score: 0 },
            { text: "偶尔边界模糊，不会主动避嫌", score: 50 },
            { text: "主动划清界限，忠于伴侣", score: 100 }
        ]
    },
    {
        dimIndex: 1,
        title: "吵架后你会使用冷暴力沉默对抗吗？",
        options: [
            { text: "长时间冷战，拒绝沟通", score: 100 },
            { text: "短暂沉默，过段时间会缓和", score: 50 },
            { text: "不会冷暴力，愿意及时沟通", score: 0 }
        ]
    },
    {
        dimIndex: 2,
        title: "争执时你总翻过去的旧账指责对方？",
        options: [
            { text: "每次吵架都揪过往错误反复说", score: 100 },
            { text: "偶尔会提起旧事加重矛盾", score: 50 },
            { text: "就事论事，不翻陈年旧账", score: 0 }
        ]
    },
    {
        dimIndex: 3,
        title: "不满时你习惯阴阳怪气讽刺对方吗？",
        options: [
            { text: "常用反话挖苦，不肯直白表达", score: 100 },
            { text: "偶尔会说气话阴阳对方", score: 50 },
            { text: "有不满直接坦诚沟通", score: 0 }
        ]
    },
    {
        dimIndex: 4,
        title: "长期相处后你会变得情感淡漠敷衍？",
        options: [
            { text: "越来越冷淡，不愿表达爱意", score: 100 },
            { text: "热情减退，但仍有基础关心", score: 50 },
            { text: "持续主动表达爱意，保持热情", score: 0 }
        ]
    },
    {
        dimIndex: 5,
        title: "感情平淡时你会寻求其他异性慰藉吗？",
        options: [
            { text: "容易动心，产生第三者想法", score: 100 },
            { text: "会有好感，但不会行动", score: 50 },
            { text: "再平淡也不会向外寻求", score: 0 }
        ]
    }
];

let currentQ = 0;
let answerScores = new Array(10).fill(null);
let radarChart = null;

// 切换页面
function switchPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

// 读取本地存储
function loadStorage() {
    const save = localStorage.getItem("loveTestSave");
    if (save) {
        const data = JSON.parse(save);
        currentQ = data.currentQ;
        answerScores = data.scores;
    }
}

function saveStorage() {
    localStorage.setItem("loveTestSave", JSON.stringify({ currentQ, scores: answerScores }));
}

function startTest() {
    loadStorage();
    renderQuestion();
    switchPage("page-answer");
}

// 渲染题目
function renderQuestion() {
    const q = questionList[currentQ];
    document.getElementById("current-q").innerText = currentQ + 1;
    document.getElementById("q-title").innerText = q.title;
    const percent = ((currentQ + 1) / 10) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";
    const wrap = document.getElementById("opt-list");
    wrap.innerHTML = "";
    q.options.forEach(opt => {
        const div = document.createElement("div");
        div.className = "option-item";
        div.innerText = opt.text;
        if (answerScores[currentQ] === opt.score) div.classList.add("selected");
        div.onclick = () => selectOption(opt.score);
        wrap.appendChild(div);
    })
}

function selectOption(score) {
    answerScores[currentQ] = score;
    saveStorage();
    setTimeout(() => {
        if (currentQ < 9) {
            currentQ++;
            renderQuestion();
        } else {
            calcResult();
        }
    }, 300);
}

// 计算结果、生成文案、渲染雷达图
function calcResult() {
    let sumNurture = 0;
    let sumConsume = 0;
    const dimValues = [];
    const nurtureVals = [];
    const consumeVals = [];
    for (let i = 0; i < 10; i++) {
        const dim = dimensionList[i];
        const s = answerScores[i];
        dimValues.push(s);
        if (dim.type === "nurture") {
            sumNurture += s;
            nurtureVals.push(s);
        } else {
            sumConsume += s;
            consumeVals.push(s);
        }
    }
    const total = sumNurture - sumConsume;
    document.getElementById("total-score").innerText = total;

    // 自动生成优缺点文字（匹配截图样式）
    let goodTxt, badTxt, tipTxt;
    const avgN = nurtureVals.reduce((a,b)=>a+b,0)/5;
    const avgC = consumeVals.reduce((a,b)=>a+b,0)/5;
    if (avgN >= 80 && avgC <= 20) {
        goodTxt = "全是优点";
        badTxt = "无";
        tipTxt = "优点五维整体都很突出，缺点没有明显突出的单一维度。";
    } else if (avgN >=70 && avgC <=40) {
        goodTxt = "滋养特质突出";
        badTxt = "轻微消耗倾向";
        tipTxt = "你擅长共情陪伴，但偶尔会有情绪化内耗行为。";
    } else if (avgN >=50 && avgC <=50) {
        goodTxt = "优缺点平衡";
        badTxt = "优缺点平衡";
        tipTxt = "滋养与消耗特质持平，相处有温柔也会有矛盾摩擦。";
    } else if (avgN >=30) {
        goodTxt = "少量滋养特质";
        badTxt = "消耗倾向明显";
        tipTxt = "容易冷淡、翻旧账，需要多学习包容与沟通。";
    } else {
        goodTxt = "滋养特质薄弱";
        badTxt = "消耗特质突出";
        tipTxt = "亲密关系内耗较重，容易让对方疲惫，建议调整相处模式。";
    }
    document.getElementById("good-text").innerText = goodTxt;
    document.getElementById("bad-text").innerText = badTxt;
    document.getElementById("tip-desc").innerText = tipTxt;

    // 绘制雷达图
    const ctx = document.getElementById("radar-chart").getContext("2d");
    if (radarChart) radarChart.destroy();
    radarChart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: dimensionList.map(d => d.name),
            datasets: [{
                label: "维度得分",
                data: dimValues,
                backgroundColor: "rgba(232, 168, 168, 0.18)",
                borderColor: "#e08898",
                pointBackgroundColor: "#e08898",
                pointRadius: 5,
                borderWidth:2
            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio:false,
            scales: {
                r: { min: 0, max: 100, ticks: { stepSize: 20, display:false } }
            },
            plugins:{legend:{display:false}}
        }
    });

    // 底部解析文案
    let analysis = "";
    if (total >= 300) {
        analysis = `<strong>🌟高分恋爱人格（总分${total}）</strong><br>你的滋养特质远大于消耗特质，温柔包容、专一有耐心，很少冷暴力/翻旧账，伴侣和你相处幸福感很高，是非常优质的恋爱伴侣。`;
    } else if (total >= 100) {
        analysis = `<strong>✨中等偏优恋爱人格（总分${total}）</strong><br>你有不错的共情与陪伴能力，但偶尔会出现消耗型行为，只要减少冷暴力、阴阳怪气，感情会更加稳定甜蜜。`;
    } else if (total >= -100) {
        analysis = `<strong>⚖️平衡型恋爱人格（总分${total}）</strong><br>滋养与消耗特质基本持平，相处有温暖时刻，但负面内耗行为也不少，需要有意识控制翻旧账、冷漠等习惯。`;
    } else if (total >= -300) {
        analysis = `<strong>⚠️消耗型恋爱人格（总分${total}）</strong><br>你的消耗特质明显多于滋养特质，经常冷暴力、阴阳怪气，容易让伴侣疲惫内耗，建议多学习共情、主动陪伴。`;
    } else {
        analysis = `<strong>💔重度消耗恋爱人格（总分${total}）</strong><br>关系内耗非常严重，习惯冷漠、翻旧账、边界模糊，长期相处会严重打击对方安全感，需要调整相处模式。`;
    }
    document.getElementById("result-analysis").innerHTML = analysis;
    switchPage("page-result");
}

// 重置测试
function restartTest() {
    localStorage.removeItem("loveTestSave");
    currentQ = 0;
    answerScores = new Array(10).fill(null);
    switchPage("page-start");
}