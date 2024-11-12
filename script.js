const submit = document.querySelector('#submit');
const mainlandSecond = "ABCDEFGHIJKRSTYZ0123456789";
const taiwanSecond = "MNOPQUVWX";
const hongKongPrefix = "VR2";
const macauPrefix = "XX9";
const mainlandProvinceRules = {
    '1': {
        '北京': [['AA', 'XZ'], ['AAA', 'XZZ']]
    },
    '2': {
        '黑龙江': [['AA', 'HZ'], ['AAA', 'HZZ']],
        '吉林': [['IA', 'PZ'], ['IAA', 'PZZ']],
        '辽宁': [['QA', 'XZ'], ['QAA', 'XZZ']]
    },
    '3': {
        '天津': [['AA', 'FZ'], ['AAA', 'FZZ']],
        '内蒙古': [['GA', 'LZ'], ['GAA', 'LZZ']],
        '河北': [['MA', 'RZ'], ['MAA', 'RZZ']],
        '山西': [['SA', 'XZ'], ['SAA', 'XZZ']]
    },
    '4': {
        '上海': [['AA', 'HZ'], ['AAA', 'HZZ']],
        '山东': [['IA', 'PZ'], ['IAA', 'PZZ']],
        '江苏': [['QA', 'XZ'], ['QAA', 'XZZ']]
    },
    '5': {
        '浙江': [['AA', 'HZ'], ['AAA', 'HZZ']],
        '江西': [['IA', 'PZ'], ['IAA', 'PZZ']],
        '福建': [['QA', 'XZ'], ['QAA', 'XZZ']]
    },
    '6': {
        '安徽': [['AA', 'HZ'], ['AAA', 'HZZ']],
        '河南': [['IA', 'PZ'], ['IAA', 'PZZ']],
        '湖北': [['QA', 'XZ'], ['QAA', 'XZZ']]
    },
    '7': {
        '湖南': [['AA', 'HZ'], ['AAA', 'HZZ']],
        '广东': [['IA', 'PZ'], ['IAA', 'PZZ']],
        '广西': [['QA', 'XZ'], ['QAA', 'XZZ']],
        '海南': [['YA', 'ZZ'], ['YAA', 'ZZZ']]
    },
    '8': {
        '四川': [['AA', 'FZ'], ['AAA', 'FZZ']],
        '重庆': [['GA', 'LZ'], ['GAA', 'LZZ']],
        '贵州': [['MA', 'RZ'], ['MAA', 'RZZ']],
        '云南': [['SA', 'XZ'], ['SAA', 'XZZ']]
    },
    '9': {
        '陕西': [['AA', 'FZ'], ['AAA', 'FZZ']],
        '甘肃': [['GA', 'LZ'], ['GAA', 'LZZ']],
        '宁夏': [['MA', 'RZ'], ['MAA', 'RZZ']],
        '青海': [['SA', 'XZ'], ['SAA', 'XZZ']]
    },
    '0': {
        '新疆': [['AA', 'FZ'], ['AAA', 'FZZ']],
        '西藏': [['GA', 'LZ'], ['GAA', 'LZZ']]
    }
};

const taiwanAreaRules = {
    '0': '-',
    '1': '基隆 / 宜兰',
    '2': '台北 / 新北',
    '3': '桃园 / 新竹',
    '4': '苗栗 / 台中',
    '5': '彰化 / 南投 / 云林',
    '6': '嘉义 / 台南',
    '7': '高雄',
    '8': '屏东 / 台东 / 花莲',
    '9': '台湾本岛以外地区'
}

const specialStations = {
    'BS7H': ['黄岩岛特殊台', '海南'],
    'B0CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B1CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B2CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B3CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B4CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B5CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B6CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B7CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B8CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B9CRA': ['CRAC 中国业余无线电节活动电台', '-'],
    'B0HQ': ['CRAC HQ', '-'],
    'B1HQ': ['CRAC HQ', '-'],
    'B2HQ': ['CRAC HQ', '-'],
    'B3HQ': ['CRAC HQ', '-'],
    'B4HQ': ['CRAC HQ', '-'],
    'B5HQ': ['CRAC HQ', '-'],
    'B6HQ': ['CRAC HQ', '-'],
    'B7HQ': ['CRAC HQ', '-'],
    'B8HQ': ['CRAC HQ', '-'],
    'B9HQ': ['CRAC HQ', '-'],
};

// 如果 callSign 为五位
function callSignRegion(callSign) {
    if(callSign[0] == 'B') {
        if(mainlandSecond.includes(callSign[1])) return '大陆';
        if(taiwanSecond.includes(callSign[1])) return '台湾';
    }
    else if (callSign.slice(0, 3) == hongKongPrefix) return '香港';
    else if (callSign.slice(0, 3) == macauPrefix) return '澳门';
    else return '非中国呼号';
}

function radioStationType(callSign) {
    if(callSign[1] == 'J') return '信标台 / 空间业余无线电台';
    if(callSign[1] == 'R') return '中继台';
    if("0123456789".includes(callSign[1])) return '未知';
    return '普通电台';
}

function mainlandProvices(callSign) {
    // 如果呼号为五位，则检查其第四、五位所属省份代码
    let area = callSign[2];
    if(callSign.length == 5) {
        // 检查呼号第三位数字的大范围
        if(mainlandProvinceRules[area]) {
            let provinces = mainlandProvinceRules[area];
            for(let province in provinces) {
                let provinceRules = provinces[province];
                if(callSign.slice(3, 5) >= provinceRules[0][0] && callSign.slice(3, 5) <= provinceRules[0][1]) {
                    return province;
                }
            }
        }
        return "未知";
    }
    // 如果呼号为六位，则检查其第四、五、六位所属省份代码
    else if(callSign.length == 6) {
        if(mainlandProvinceRules[area]) {
            let provinces = mainlandProvinceRules[area];
            for(let province in provinces) {
                let provinceRules = provinces[province];
                if(callSign.slice(3, 6) >= provinceRules[1][0] && callSign.slice(3, 6) <= provinceRules[1][1]) {
                    return province;
                }
            }
        }
        return "未知";
    }
    return "未知";
}

function checkCallSign(callSign){
    if(callSign.length >= 4 && callSign.length <= 6) {
        let region = callSignRegion(callSign);
        let province = null;
        let stationType = null;
        if(region == '大陆') {
            province = mainlandProvices(callSign);
            stationType = radioStationType(callSign);
            console.log(stationType);
            if(specialStations[callSign]){
                stationType = specialStations[callSign][0];
                province = specialStations[callSign][1];
            }
        }
        else if(region == '台湾') {
            province = taiwanAreaRules[callSign[2]];
            if(callSign.length == 4){
                stationType = '特殊电台';
                if(callSign[1] == 'X') stationType = '中继台';
            }
            if(callSign.length == 5) stationType = '一等业余电台';
            if(callSign.length == 6) {
                stationType = '三等业余电台';
                if(callSign[1] == 'X') stationType = '二等业余电台';
            }
            if(callSign[2] == '0') stationType = '临时电台';

        }
        return {
            region: region,
            province: province || '-',
            stationType: stationType || '-'
        };
    }
}

submit.addEventListener('click', function(e) {
    e.preventDefault();
    const callSign = document.querySelector('#call-sign-input').value;
    let result = checkCallSign(callSign);
    document.getElementById('display-result').style.display = "block";
    document.getElementById('callsign').innerHTML = callSign;
    if(result) {
        document.getElementById('region').innerHTML = result.region;
        document.getElementById('province').innerHTML = result.province;
        document.getElementById('type').innerHTML = result.stationType;  
    }
    else {
        document.getElementById('region').innerHTML = '未识别的呼号';
        document.getElementById('province').innerHTML = '-';
        document.getElementById('type').innerHTML = '-';   
    }
    document.getElementById('search-qrz').href = "https://www.qrz.com/db/" + callSign;
});