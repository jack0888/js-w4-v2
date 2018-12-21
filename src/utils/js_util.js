/**
 * Created by 汪凤杰 on 2018/7/17.
 */
/**
 * Created by yanhao on 2016/10/23.
 */

const NT_UTIL = {
    isWeChat() {
        var ua = window.navigator.userAgent.toLowerCase();
        return (ua.match(/MicroMessenger/i) == 'micromessenger');
    },

    getUserInfo() {
        let user_info = window.localStorage.getItem("user_info");
        return JSON.parse(user_info);
    },

    getUserId() {
        let user_info = window.localStorage.getItem("user_info");
        let user = JSON.parse(user_info);
        return user.userId;
    },

    add0(m) { return m < 10 ? '0' + m : m },
    timeFormat(nS) {
        //return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
        var time = new Date(nS);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    },
    timeFormatWithoutS(nS) {
        var time = new Date(nS);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm);
    },
    //将base64格式图片转换为二进制文件形式
    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    },
    //将base64格式图片转换为二进制文件形式2
    base64ToBlob(urlData) {
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
        // 去掉url的头，并转化为byte
        var bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        var ia = new Uint8Array(ab);

        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {
            type: mime
        });
    },
    dataURLtoFile(dataurl, filename) {//将base64转换为文件
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    },
    //手机号码 验证规则：11位数字，以1开头。
    checkMobile(str) {
        var re = /^1\d{10}$/
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    // 隐藏手机号
    hideMobile(phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    /* 处理支付只能输入两位小数
     * add by Jack on 20180525
     * @param value
     */
    handlePayAmount(value) {
        value = String(value);
        let indexOfDot = value.indexOf(".");
        if (indexOfDot == -1) {
            value = value * 1;// 去除前面多余的 0
        } else {
            let str_ = value.substr(indexOfDot + 1);
            //限制只能输入一个小数点
            if (str_.indexOf(".") != -1) {
                value = value.substr(0, indexOfDot + str_.indexOf(".") + 1);
            }

            if (indexOfDot == 0) {
                value = "0" + value;
            }
            value = value.substr(0, indexOfDot + 3);// 只能输入两位小数

            // TODO 去除前面多余的 0
            if (value > 0 && value.length > (indexOfDot + 1)) {
                value = value * 1;
            }
        }
        return value || '0';
    }
}

export default NT_UTIL;


export const GetQueryString = name => {
    var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var newUrl = window.location.search.substr(1).match(url);
    if (newUrl != null) {
        return unescape(newUrl[2]);
    } else {
        return false;
    }
};


// 删除url中某个参数,并跳转
export function funcUrlDel(name) {
    var loca = window.location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if (query.indexOf(name) > -1) {
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
        return url;
    }
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
    let windowHeight = window.screen.height;
    let height;
    let setTop;
    let paddingBottom;
    let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll', () => {
        loadMore();
}, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
    element.addEventListener('touchstart', () => {
        height = element.offsetHeight;
    setTop = element.offsetTop;
    paddingBottom = getStyle(element, 'paddingBottom');
    marginBottom = getStyle(element, 'marginBottom');
}, { passive: true })

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove', () => {
        loadMore();
}, { passive: true })

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
    moveEnd();
}, { passive: true })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
                if (document.body.scrollTop != oldScrollTop) {
            oldScrollTop = document.body.scrollTop;
            loadMore();
            moveEnd();
        } else {
            cancelAnimationFrame(requestFram);
            //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            height = element.offsetHeight;
            loadMore();
        }
    })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll', () => {
        showBackFun();
}, false)
    document.addEventListener('touchstart', () => {
        showBackFun();
}, { passive: true })

    document.addEventListener('touchmove', () => {
        showBackFun();
}, { passive: true })

    document.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
    moveEnd();
}, { passive: true })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
                if (document.body.scrollTop != oldScrollTop) {
            oldScrollTop = document.body.scrollTop;
            moveEnd();
        } else {
            cancelAnimationFrame(requestFram);
        }
        showBackFun();
    })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        } else {
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    } else if (duration instanceof String) {
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") {
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
        unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
    } else {
        unit[attr] = 'px';
    }
    initState[attr] = attrStyle(attr);
});

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
        target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
        target[attr] = parseInt(target[attr]);
    }
});


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
            Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
    let status = false; //是否仍需运动
    let iCurrent = attrStyle(attr) || 0; //当前元素属性址
    let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
    let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
    switch (mode) {
        case 'ease-out':
            speedBase = iCurrent;
            intervalTime = duration * 5 / 400;
            break;
        case 'linear':
            speedBase = initState[attr];
            intervalTime = duration * 20 / 400;
            break;
        case 'ease-in':
            let oldspeed = remberSpeed[attr] || 0;
            iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
            remberSpeed[attr] = iSpeed
            break;
        default:
            speedBase = iCurrent;
            intervalTime = duration * 5 / 400;
    }
    if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
    }
    //判断是否达步长之内的误差距离，如果到达说明到达目标点
    switch (mode) {
        case 'ease-out':
            status = iCurrent != target[attr];
            break;
        case 'linear':
            status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
            break;
        case 'ease-in':
            status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
            break;
        default:
            status = iCurrent != target[attr];
    }

    if (status) {
        flag = false;
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
            element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
            element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === 'scrollTop') {
            element.scrollTop = iCurrent + iSpeed;
        } else {
            element.style[attr] = iCurrent + iSpeed + 'px';
        }
    } else {
        flag = true;
    }

    if (flag) {
        clearInterval(element.timer);
        if (callback) {
            callback();
        }
    }
})
}, 20);
}