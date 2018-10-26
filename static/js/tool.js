let tool = {
    idDom: null,
    idBoxDom: null,
    leftBoxDom: null,
    rightBoxDom: null,
    changeBoxDom: null,
    listDom: null,
    textDom: null,
    isCarDom: null,
    notCarDom: null,
    numberDom: null,
    topImgDom: null,
    titleNumber: null,
    animateList: [],
    initAnimateOption: {
        left: '345px',
        top: '170px',
        opacity: -1,
    },
    animateOption: [{
        left: '345px',
        top: '-120px',
        opacity: 0,
        display: 'display'
    }, {
        left: '90px',
        top: '-20px',
        opacity: 1,
        display: 'display'
    }, {
        left: '-40px',
        top: '95px',
        opacity: 1,
        display: 'display'
    }, {
            left: '-20px',
        top: '235px',
        opacity: 1,
        display: 'display'
    }, {
        left: '50px',
        top: '400px',
        opacity: 1,
        display: 'display'
    }, {
        left: '677px',
        top: '400px',
        opacity: 1,
        display: 'display'
    }, {
        left: '766px',
        top: '235px',
        opacity: 1,
        display: 'display'
    }, {
            left: '760px',
        top: '95px',
        opacity: 1,
        display: 'display'
    }, {
        left: '620px',
        top: '-20px',
        opacity: 1,
        display: 'display'
    }],
    startCenter(index) {
        console.log(`startCenter`, index);
        let currentItem = list[index];
        this.textDom.each(function (i) {
            return $(this).html(currentItem.centerLabel[i])
        })
        this.idDom.html(currentItem.id);
        this.idBoxDom.removeClass(`fadeOut`).addClass(`fadeIn`);
        //淡入
        tool.changeBoxDom.removeClass(`fadeOut center-box1  center-box2 center-box3`).addClass(`fadeIn center-box${index}`)
        // 右边进左边出
        // tool.changeBoxDom.removeClass(`bounceOutLeft center-box${index - 1}`).addClass(`bounceInRight center-box${index}`)
    },
    endCenter(index) {
        console.log(`endCenter`, index)
        let currentItem = list[index];
        this.idDom.html(currentItem.id);
        this.idBoxDom.removeClass(`fadeIn`).addClass(`fadeOut`);
        //淡出
        this.changeBoxDom.removeClass(`fadeIn center-box1  center-box2 center-box3`).addClass(`fadeOut center-box${index}`)
        // 右边进左边出
        // this.changeBoxDom.removeClass(`bounceOutLeft center-box${index - 1}`).addClass(`bounceInRight center-box${index}`)

    },
    /**
     * @description 行星计划1.0 废弃
     * @author liangyanxiang
     */
    planetaryAction() {
        console.log(`planetaryAction start`);
        if (!this.animateList.length) {
            this.animateList = this.listDom
        }
        for (let index = 0, option; index < this.animateList.length; index++) {
            option = index == 0 ? this.animateOption[8] : this.animateOption[index - 1];
            if (option.left == '0px') {
                let item = $(`.item${index}`)
                item.addClass(`animated fadeOutDown slow`).clone().prepend(item);
                item.clone().appendTo($('#radiusBox'));
                item.remove();
                $(`.item${index}`).css(option).removeClass(`animated fadeOutDown`).addClass(`animated fadeInUp`)
                // $(`.item${index}`).removeClass(`animated fadeOutDown`).animate(option, 2000);
            } else {
                $(`.item${index}`).show().removeClass(`animated fadeOutDown`).animate(option, 2000);
            }
        }

        let item = this.animateOption.pop()
        this.animateOption.unshift(item);
        setTimeout(() => {
            this.planetaryAction();
        }, 2000)
    },
    /**
     * @description 行星计划2.0 炸开 开始部分
     * @author liangyanxiang
     */
    planetaryActionForStart2() {
        console.log(`planetaryAction2.0 start`);
        let flag = true;
        const random = Math.ceil(Math.random() * 8);

        this.listDom.each(function (i) {
            return $(this).css(tool.initAnimateOption).children(` .rotate`).removeClass(`item-bg`)
        });

        for (let index = 0, option; index < this.listDom.length; index++) {
            // option = index == 0 ? this.animateOption[8] : this.animateOption[index - 1];
            option = this.animateOption[index]
            $(`.item${index}`).css({
                display: 'block'
            }).animate(option, 1500, function () {
                if (!flag) return;
                flag = false;
                console.log(1, random)
                setTimeout(() => {
                    $(`.item${random} .rotate`).addClass(`item-bg`)
                    $(`.item${random}`).fadeOut(1500, function () {
                        $(`.item0`).css(tool.animateOption[random]).fadeIn(2000)
                    })
                }, 1800)
            });
        }
    },
    /**
     * @description 行星计划2.0 合并 结束部分
     * @author liangyanxiang
     */
    planetaryActionForEnd2() {
        console.log(`planetaryAction2.0 end`);
        this.listDom.each(function (i) {
            return $(this).animate(tool.initAnimateOption, 1800)
        });
    },
    planetaryActionForStart3() {
        console.log(`planetaryAction3.0 start`);
        const random = Math.ceil(Math.random() * 8);
        // 行星淡入
        this.listDom.each(function (i) {
            if (i) {
                $(this).css({
                    display: 'block'
                })
                return $(this).addClass(`fadeIn animated bounce slow`).removeClass(`fadeOut`).children(` .rotate`).removeClass(`item-bg`)
            }
        })

        setTimeout(() => {
            $(`.item${random} .rotate`).addClass(`item-bg`)
            $(`.item${random}`).removeClass(`fadeIn`).fadeOut(1500, function () {
                $(`.item0`).css(tool.animateOption[random]).addClass(`fadeIn animated bounce slow`).removeClass(`fadeOut`)
            })
        }, 2000);
    },
    planetaryActionForEnd3() {
        console.log(`planetaryAction3.0 end`);
        // 行星淡出
        this.listDom.each(function (i) {
            return $(this).addClass(`fadeOut animated bounce slow`).removeClass(`fadeIn`)
        })
    },
    leftStart(index) {
        console.log(this.numberDom.length)
        console.log(list[index].numberList[0])
        this.leftBoxDom.removeClass(`fadeOut`).addClass(`fadeIn`)
        this.numberDom.each(function (i) {
            return $(this).html(list[index].numberList[i])
        })
    },
    leftEnd() {
        this.leftBoxDom.removeClass(`fadeIn`).addClass(`fadeOut`)
    },
    rightStart(index) {
        console.log(tool.topImgDom)
        this.rightBoxDom.removeClass(`fadeOut`).addClass(`fadeIn`)
        tool.rightTop.html(list[index].balance);
        tool.rightType.html(list[index].rightType);
        tool.topImgDom.removeClass(`debtTit carer carList`).addClass(list[index].topImg);
        tool.titleNumber.html(list[index].titleNumber);
        this.textList.each(function (i) {
            return $(this).html(list[index].lableList[i])
        })
        this.lableName.each(function (i) {
            return $(this).html(list[index].lableName[i])
        })
        this.lableHash.each(function (i) {
            return $(this).html(list[index].lableHash[i])
        })
    },
    rightEnd(index) {
        this.rightBoxDom.removeClass(`fadeIn`).addClass(`fadeOut`)
    },
    rightChange(index) {
        console.log(`rightChange start`,index);
        tool.topImgDom.removeClass(list[index].topImg);
        if (index == 2) {
            tool.isCarDom.removeClass('none').addClass('block');
            tool.notCarDom.removeClass('block').addClass('none');
        } else {
            tool.notCarDom.removeClass('none').addClass('block');
            tool.isCarDom.removeClass('block').addClass('none');
            tool.rightText1.html(list[index].rightList[0]);
            tool.rightText2.html(list[index].rightList[1]);
            tool.rightText3.html(list[index].rightList[2]);
        }
    }

}