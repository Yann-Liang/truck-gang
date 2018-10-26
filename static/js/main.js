let index = 0, timer;

const list = [{
    type: 'enterprises',
    id: '3739373',
    topImg: 'debtTit',
    centerLabel: ['实名<br/>认证', '货物运输<br/>经营许可', '1个<br/>经营场地', '1家<br/>车辆挂靠', '2家贸易<br/>对手方', '4次<br/>授信', '2次<br/>失信', '4次<br/>借贷', '信用评级<br/>B+'],
    numberList: ['9,234,545', '12,507,370', '8,234,588', '456', '123,685', '789', '745,125,444', '4,486'],
    rightList: ['4/15', '1,250,000', '520,000'],
    balance:'230,000',
    rightType:'满帮通余额',
    lableList:['运输经营许可','失信行为','经营场地','车辆挂靠','信用评级'],
    lableName:['交通部','交通部','天津物流园','恒远物流','货车帮征信公司'],
    lableHash:['0xfd83b8b60010b4fb...','0xfd83b8b60010b5fb...','0xfd83b8b60010b6fb...','0xfd83b8b60010b7fb...','0xfd83b8b60010b8fb...'],
    titleNumber:'32'
}, {
    type: 'person',
    id: '3435890',
    topImg: 'carer',
    centerLabel: ['实名<br/>认证', '从业<br/>资质许可', '1家<br/>劳动关系', '5年<br/>从业年限', '危化品运输', '1次<br/>逾期', '1次<br/>危险驾驶', '5次<br/>违章', '信用评级<br/>B-'],
    numberList: ['7,234,431', '14,574,328', '9,234,545', '234,54', '8,234,588', '456', '123,685', '789',],
    rightList: ['5/15', '120,000', '120,000'],
    balance:'50,000',
    rightType:'满帮通余额',
    lableList:['从业资质','危化品运输','从业年限','劳动关系','逾期'],
    lableName:['交通部','交通部','志鸿物流','联合认证','货车帮小贷公司'],
    lableHash:['0x92220c7e1e8a97b...','0x92220c7e1e8a98b...','0x26d9642cc71c6621...','0x92220c7e1e8a99b...','0x92220c7e1e8a101b...'],
    titleNumber:'69'
}, {
    type: 'car',
    id: '5676543',
    topImg: 'carList',
    centerLabel: ['已<br/>年审', '已<br/>交保', '行驶证<br/>认证', '危化品<br/>运输', '2次<br/>质押', '2家贸易<br/>对手方', '1次<br/>授信', '1次<br/>借贷', '信用评级<br/>B-'],
    numberList: ['8,234,588', '456', '123,685', '789', '745,125,444', '4,486', '9,234,545', '234,54'],
    balance:'300,000',
    rightType:'车辆评估价',
    lableList:['行驶证认证','危化品运输','车辆年审','车辆保险','质押记录'],
    lableName:['交通部','交通部','798检测7','平安保险公司','货车帮征信公司'],
    lableHash:['0x26d9642cc71c6623...','0x26d9642cc71c6624...','0x26d9642cc71c6621...','0x26d9642cc71c6622...','0x26d9642cc71c6625...'],
    titleNumber:'21'
}]

$(init)

function init() {
    tool.idDom = $('#id');
    tool.idBoxDom = $('#idBox');
    tool.leftBoxDom = $('#leftBox');
    tool.rightBoxDom = $('#rightBox');
    tool.changeBoxDom = $('#changeBox');
    tool.listDom = $('#radiusBox >li');
    tool.textDom = $('.center-text');
    tool.isCarDom = $('#isCar');
    tool.notCarDom = $('#notCar');
    tool.numberDom = $('.nub');
    tool.topImgDom = $('#topImg');
    tool.rightTop = $('#rightTop');
    tool.rightType = $('#rightType');
    tool.rightText1 = $('#rightText1');
    tool.rightText2 = $('#rightText2');
    tool.rightText3 = $('#rightText3');
    tool.textList = $('.text');
    tool.lableName = $('.lableName');
    tool.lableHash = $('.lableHash');
    tool.titleNumber = $('#titleNumber');
    // tool.planetaryAction();
    polling();
    // <!--获取li每行的高度，动画移动的高度-->
    var liHeight = $('li').height();
    // <!--调用插件-->
    $('#ulContent').lSlide({ nTop: liHeight });
    $('#ulContent2').lSlide({ nTop: liHeight });
}

/**
 * @description 轮询任务
 * @author liangyanxiang
 */
function polling() {
    const speed = 8000;
    // 开始动画 start
    tool.startCenter(index);
    // 演示类型
    if (actionType == 1) {
        tool.planetaryActionForStart2();
    } else if (actionType == 2){
        tool.planetaryActionForStart3();
    } else {
        this.planetaryActionForStart3();
    }

    tool.leftStart(index);
    tool.rightStart(index);
    // ------过了2s ------------------------------
    // 开始动画 end
    timer = setTimeout(() => {
        //结束动画 start
        tool.endCenter(index);
        // 演示类型
        if (actionType == 1) {
            tool.planetaryActionForEnd2();
        } else if (actionType == 2) {
            tool.planetaryActionForEnd3();
        } else {
            this.planetaryActionForEnd3();
        }
        tool.leftEnd(index);
        tool.rightEnd(index);
    }, speed);
    setTimeout(() => {
        //结束动画 end
        index = ++index % 3;
        tool.rightChange(index);
        clearTimeout(timer)
        polling()
    }, speed + 2000)
}

//轮播
(function ($) {
    $.fn.lSlide = function (options) {
        initLSlide(this, options);
    };
    function initLSlide(item, options) {
        var defaults = {
            nTop: -0.71
        };
        var opts = $.extend({}, defaults, options);
        var _self = $(item);

        var timeId = -1;

        timeId = setInterval(function () {
            // 动画往上移动距离，单位为px
            _self.animate({ top: opts.nTop + "px" }, function () {
                // 查到第一个子元素
                var item = _self.children('li')[0];
                // 获取第一个元素
                var fChild = $(item).prop('outerHTML');
                // 将第一个节点拼接到最后
                _self.append(fChild);
                // 将第一个节点删除
                $(item).remove();
            });
            _self.animate({ top: 0 + "px" }, 0);
        }, 2000)
        // 点击今日中奖名单停止轮播
        _self.on('touchstart', function () {
            clearInterval(timeId);
        })
    }
})(jQuery)



