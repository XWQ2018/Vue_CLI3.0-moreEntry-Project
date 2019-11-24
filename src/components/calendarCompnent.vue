<!--
 * @Description: 日历组件
 * @Author: xwq
 * @Date: 2019-10-17 09:29:41
 * @LastEditTime: 2019-10-25 17:01:52
 -->
<template>
    <transition name="slide-fade">
        <div class="date-time-week" v-show="popShow" :style="dateWeekStyle">
            <div class="header-one">
                <van-nav-bar
                    :z-index="999"
                    :fixed="true"
                    :class="{'clear-background':backgroundStatus, 'border-bottom':isborderBottom}"
                    :border="true"
                    :title="title"
                    :left-arrow="leftArrow"
                    @click-left="onClickLeft"
                    ref="headerOne"
                ></van-nav-bar>
                <van-row :class="['header-fixed-margin']"></van-row>
            </div>
            <div class="date-comtainer">
                <van-row
                    tag="ul"
                    class="day-info-top"
                    type="flex"
                    align="center"
                    justify="space-around"
                    ref="dateTime"
                >
                    <van-col tag="li" v-for="(i,k) in weekDay" :key="k" class="weekday-item">
                        <van-col span="24" class="weekday-style">{{i}}</van-col>
                    </van-col>
                </van-row>
                <van-row :style="{width:'100%',height:'60px'}"></van-row>
                <div class="date-content" ref="dateContent">
                    <div class="date-list-container" :style="[contentStyle]" id="date-container">
                        <div v-for="(i2,k2) in allDateInfo" :key="k2">
                            <!-- (()=>{if(k2%12==0){return 'test'}})()-->
                            <h2
                                class="date-title"
                                :class="i2.title | addClassNameHandle"
                            >{{i2.title | dateTimeFormate}}</h2>
                            <ul class="date-list">
                                <li class="date-list-item" v-for="(i3,k3) in i2.dateItem" :key="k3">
                                    <b
                                        :class="['text-value','no-events']"
                                        v-show="i3.textValue"
                                        :style="{color:'#fff'}"
                                    >{{i3.textValue}}</b>
                                    <span
                                        class="date-list-item-text"
                                        v-html="i3.day_time"
                                        @click="selectDateTimeHandle(i3,k2,k3)"
                                        :class="[{'no-events':i3.day_time == '\&\#160'},{'active-item':i3.status},{'active-item-between-style':i3.between_BC}]"
                                    ></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <van-row :style="{width:'100%',height:'50px'}"></van-row>
                </div>
            </div>
            <div class="button-content">
                <van-button
                    native-type="button"
                    type="info"
                    :style="styleButton"
                    size="large"
                    :block="true"
                    @click="confirmHandle"
                    ref="bottomBtn"
                >{{bottonText}}</van-button>
            </div>
            <div class="select-year" v-show="false">
                <span
                    class="select-year-arrow"
                    :class="{'arrow-up-style':yearInfo['clipPathStatus'],'arrow-down-style':!yearInfo['clipPathStatus']}"
                    @click="selectYear"
                >{{yearInfo['textVal']}}</span>
                <ul
                    class="select-year-content"
                    ref="yearContent"
                    :style="yearInfo['yearContentStyle']"
                    v-show="yearInfo['isShowYear']"
                >
                    <li
                        class="select-year-content-item"
                        v-for="(i6,k6) in yearInfo['yearSelect']"
                        :key="k6"
                        @click="selectYearItem(i6)"
                    >{{i6}}</li>
                </ul>
            </div>
        </div>
    </transition>
</template>
<script>
import { lockBackgroundScroll } from "@/utils/backgroundScrollOverly";
import { Toast, NavBar } from "vant";
var _self;
export default {
    name: "dateTime",
    components: {
        [NavBar.name]: NavBar
    },
    props: {
        popShow: {
            type: Boolean,
            default: false
        },
        bottonText: {
            type: String,
            default: "设置完毕"
        },
        title: {
            type: String,
            default: "选择起止时间"
        },
        backgroundStatus: {
            type: Boolean,
            default: false
        },
        leftText: {
            type: String,
            default: ""
        },
        leftArrow: {
            type: Boolean,
            default: true
        },
        isborderBottom: {
            type: Boolean,
            default: false
        },
        minYear: {
            type: Date,
            default: () => {
                return new Date("2015-01-01");
            }
        },
        maxYear: {
            type: Date,
            default: () => {
                return new Date();
            }
        }
    },
    data() {
        return {
            weekDay: ["日", "一", "二", "三", "四", "五", "六"],
            currentDateTime: date => {
                return new Date(date);
            },
            currentYear: date => {
                /*   let t = new Date();
                return t.getFullYear(); */
                return date.getFullYear();
            },
            allDateInfo: [], //所有年份的数据,
            selectDateTime: [], //开始和结束时间
            num1: null, //包含月份和日的信息
            num2: null, //包含月份和日的信息
            dateWeekStyle: {
                transform: `translatex(100%)`
            },
            styleButton: {
                "background-color": "#46aef7",
                color: "#fff",
                border: 0
            },
            contentStyle: {},
            yearInfo: {
                yearSelect: [],
                yearContentStyle: null,
                isShowYear: false,
                textVal: null,
                clipPathStatus: false
            },
            scrollStatus: true //首次进来滚动到当前年份
        };
    },
    beforeUpdate() {},
    computed: {
        test(i) {
            return i;
        }
    },
    created() {
        this.init();
        _self = this;
    },
    mounted() {
        this.watchHandle();
        this.getNodeHeightHandle();
    },
    methods: {
        init() {
            this.yearInfo["textVal"] = this.currentYear(this.maxYear);
            // let num = 0;
            for (
                let j = this.currentYear(this.minYear);
                j <= this.currentYear(this.maxYear);
                j++
            ) {
                this.yearInfo["yearSelect"].push(j);
                for (let i = 1; i <= 12; i++) {
                    let inum = i;
                    inum = inum < 10 ? "0" + inum : inum;
                    this.getDateTimeHandle(`${j}-${inum}-01`);
                }
                // num++;
            }
        },
        /**
         * @Description: 日历计算
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-17 13:45:41
         */
        getDateTimeHandle(dateTime) {
            let _this = this;
            this.$nextTick(() => {
                /*获取一个月的天数 */
                function getCountDays(date) {
                    date = date || null;
                    var curDate = new Date(date);
                    /* 获取当前月份 */
                    var curMonth = curDate.getMonth();
                    /* Month设置 */
                    curDate.setMonth(curMonth + 1);
                    /* 将日期设置为0 */
                    curDate.setDate(0);
                    /* 返回当月的天数 */
                    return curDate.getDate();
                }

                // 在通过数组来生成天数数组：
                //传入月天数和日期
                function getEvryDay(day, date) {
                    // console.log(day, date, "bbbb");
                    var createdDate = new Date(date);
                    var getDate = createdDate.getDay(); //得到每月的第一天是星期几

                    var currentYear = createdDate.getFullYear(); //年份
                    var currentMonth = createdDate.getMonth() + 1; //月份
                    currentMonth =
                        currentMonth < 10 ? "0" + currentMonth : currentMonth;

                    var ulNode = document.createElement("ul");
                    ulNode.className = "date-list";
                    // var content = ``;

                    switch (getDate) {
                        case 0:
                            let objItem1 = {
                                title: date,
                                dateItem: []
                            };
                            for (let k = 1; k <= day; k++) {
                                let n = k;
                                n = n < 10 ? "0" + n : n;
                                let obj1 = {
                                    year: currentYear,
                                    month: currentMonth,
                                    date_time: `${currentYear}-${currentMonth}-${n}`,
                                    day_time: k,
                                    status: false,
                                    textValue: "",
                                    between_BC: false
                                };
                                objItem1["dateItem"].push(obj1);
                            }

                            _this.allDateInfo.push(objItem1);
                            break;
                        case 1:
                            let objItem2 = {
                                title: date,
                                dateItem: []
                            };
                            objItem2["dateItem"].push({
                                year: "",
                                month: "",
                                date_time: "",
                                day_time: "&#160"
                            });

                            for (let k = 1; k <= day; k++) {
                                let n = k;
                                n = n < 10 ? "0" + n : n;
                                let obj2 = {
                                    year: currentYear,
                                    month: currentMonth,
                                    date_time: `${currentYear}-${currentMonth}-${n}`,
                                    day_time: k,
                                    status: false,
                                    textValue: "",
                                    between_BC: false
                                };
                                objItem2["dateItem"].push(obj2);
                            }

                            _this.allDateInfo.push(objItem2);

                            break;
                        case 2:
                            let objItem3 = {
                                title: date,
                                dateItem: []
                            };
                            for (let i = 1; i <= getDate; i++) {
                                objItem3["dateItem"].push({
                                    year: "",
                                    month: "",
                                    date_time: "",
                                    day_time: "&#160"
                                });
                            }
                            for (let k = 1; k <= day; k++) {
                                let n = k;
                                n = n < 10 ? "0" + n : n;
                                let obj3 = {
                                    year: currentYear,
                                    month: currentMonth,
                                    date_time: `${currentYear}-${currentMonth}-${n}`,
                                    day_time: k,
                                    status: false,
                                    textValue: "",
                                    between_BC: false
                                };
                                objItem3["dateItem"].push(obj3);
                            }

                            _this.allDateInfo.push(objItem3);

                            break;
                        case 3:
                            let objItem4 = {
                                title: date,
                                dateItem: []
                            };
                            for (let i = 1; i <= getDate; i++) {
                                objItem4["dateItem"].push({
                                    year: "",
                                    month: "",
                                    date_time: "",
                                    day_time: "&#160"
                                });
                            }
                            for (let k = 1; k <= day; k++) {
                                let n = k;
                                n = n < 10 ? "0" + n : n;
                                let obj4 = {
                                    year: currentYear,
                                    month: currentMonth,
                                    date_time: `${currentYear}-${currentMonth}-${n}`,
                                    day_time: k,
                                    status: false,
                                    textValue: "",
                                    between_BC: false
                                };
                                objItem4["dateItem"].push(obj4);
                            }

                            _this.allDateInfo.push(objItem4);

                            break;
                        case 4:
                            let objItem5 = {
                                title: date,
                                dateItem: []
                            };
                            for (let i = 1; i <= getDate; i++) {
                                objItem5["dateItem"].push({
                                    year: "",
                                    month: "",
                                    date_time: "",
                                    day_time: "&#160"
                                });
                            }
                            for (let k = 1; k <= day; k++) {
                                let n = k;
                                n = n < 10 ? "0" + n : n;
                                let obj5 = {
                                    year: currentYear,
                                    month: currentMonth,
                                    date_time: `${currentYear}-${currentMonth}-${n}`,
                                    day_time: k,
                                    status: false,
                                    textValue: "",
                                    between_BC: false
                                };
                                objItem5["dateItem"].push(obj5);
                            }

                            _this.allDateInfo.push(objItem5);

                            break;
                        case 5:
                            let objItem6 = {
                                title: date,
                                dateItem: []
                            };
                            for (let i = 1; i <= getDate; i++) {
                                objItem6["dateItem"].push({
                                    year: "",
                                    month: "",
                                    date_time: "",
                                    day_time: "&#160"
                                });
                            }
                            for (let k = 1; k <= day; k++) {
                                let n = k;
                                n = n < 10 ? "0" + n : n;
                                let obj6 = {
                                    year: currentYear,
                                    month: currentMonth,
                                    date_time: `${currentYear}-${currentMonth}-${n}`,
                                    day_time: k,
                                    status: false,
                                    textValue: "",
                                    between_BC: false
                                };
                                objItem6["dateItem"].push(obj6);
                            }

                            _this.allDateInfo.push(objItem6);

                            break;
                        case 6:
                            let objItem7 = {
                                title: date,
                                dateItem: []
                            };
                            for (let i = 1; i <= getDate; i++) {
                                objItem7["dateItem"].push({
                                    year: "",
                                    month: "",
                                    date_time: "",
                                    day_time: "&#160"
                                });
                            }
                            for (let k = 1; k <= day; k++) {
                                let n = k;
                                n = n < 10 ? "0" + n : n;
                                let obj7 = {
                                    year: currentYear,
                                    month: currentMonth,
                                    date_time: `${currentYear}-${currentMonth}-${n}`,
                                    day_time: k,
                                    status: false,
                                    textValue: "",
                                    between_BC: false
                                };
                                objItem7["dateItem"].push(obj7);
                            }

                            _this.allDateInfo.push(objItem7);

                            break;
                        default:
                            break;
                    }
                }
                getEvryDay(getCountDays(dateTime), dateTime); //调用获取每月天数函数和生成当月日历结构h函数
            });
        },
        /**
         * @Description: 日期选择
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-17 14:18:12
         */
        selectDateTimeHandle(item, index1, index2) {
            // console.log(item.date_time, index1, index2);
            if (this.selectDateTime.length === 2) {
                for (let i of this.allDateInfo) {
                    for (let k of i.dateItem) {
                        if (k["date_time"] != "") {
                            k.status = false;
                            k.textValue = "";
                            k["between_BC"] = false;
                            this.$set(
                                this.allDateInfo[index1]["dateItem"],
                                i,
                                k
                            );
                        }
                    }
                }
                this.selectDateTime = [];
                this.selectDateTime.push(item.date_time);
                this.num1 = [index1, index2];
                item.status = true;
                item.textValue = "开始";
                this.$set(this.allDateInfo[index1]["dateItem"], index2, item);
                return;
            }

            switch (this.selectDateTime.length) {
                case 0:
                    this.num1 = [index1, index2];
                    this.selectDateTime.push(item.date_time);
                    item.status = true;
                    item.textValue = "开始";
                    this.$set(
                        this.allDateInfo[index1]["dateItem"],
                        index2,
                        item
                    );
                    break;
                case 1:
                    if (this.num1[0] == index1 && this.num1[1] == index2) {
                        return;
                    }
                    this.num2 = [index1, index2];
                    this.selectDateTime.push(item.date_time);
                    item.status = true;
                    item.textValue = "结束";
                    this.$set(
                        this.allDateInfo[index1]["dateItem"],
                        index2,
                        item
                    );

                    /* 添加区间背景色 */
                    /* 同月份的处理 */
                    if (
                        this.num1[0] == this.num2[0] &&
                        (this.num2[1] - this.num1[1] > 1 ||
                            this.num1[1] - this.num2[1] > 1)
                    ) {
                        if (
                            this.num1[0] == this.num2[0] &&
                            this.num2[1] - this.num1[1] < 1
                        ) {
                            this.changeTextValHandle();
                        }
                        this.allDateInfo.forEach((i1, k1) => {
                            i1["dateItem"].forEach((i2, k2) => {
                                if (
                                    k1 == this.num1[0] &&
                                    k1 == this.num2[0] &&
                                    ((k2 > this.num1[1] && k2 < this.num2[1]) ||
                                        (k2 < this.num1[1] &&
                                            k2 > this.num2[1])) &&
                                    i2["date_time"] != ""
                                ) {
                                    i2["between_BC"] = true;
                                    this.$set(
                                        this.allDateInfo[k1]["dateItem"],
                                        k2,
                                        i2
                                    );
                                }
                            });
                        });
                        /* 不同月份的处理 */
                    } else if (this.num2[0] > this.num1[0]) {
                        this.allDateInfo.forEach((i1, k1) => {
                            i1["dateItem"].forEach((i2, k2) => {
                                if (
                                    k1 == this.num1[0] &&
                                    k2 > this.num1[1] &&
                                    i2["date_time"] != ""
                                ) {
                                    i2["between_BC"] = true;
                                    this.$set(
                                        this.allDateInfo[k1]["dateItem"],
                                        k2,
                                        i2
                                    );
                                }
                                if (
                                    k1 > this.num1[0] &&
                                    k1 < this.num2[0] &&
                                    i2["date_time"] != ""
                                ) {
                                    i2["between_BC"] = true;
                                    this.$set(
                                        this.allDateInfo[k1]["dateItem"],
                                        k2,
                                        i2
                                    );
                                }
                                if (
                                    k1 == this.num2[0] &&
                                    k2 < this.num2[1] &&
                                    i2["date_time"] != ""
                                ) {
                                    i2["between_BC"] = true;
                                    this.$set(
                                        this.allDateInfo[k1]["dateItem"],
                                        k2,
                                        i2
                                    );
                                }
                            });
                        });
                    } else if (this.num2[0] < this.num1[0]) {
                        this.allDateInfo.forEach((i1, k1) => {
                            i1["dateItem"].forEach((i2, k2) => {
                                if (
                                    ((k1 == this.num2[0] &&
                                        k2 > this.num2[1]) ||
                                        (k1 > this.num2[0] &&
                                            k1 < this.num1[0]) ||
                                        (k1 == this.num1[0] &&
                                            k2 < this.num1[1])) &&
                                    i2["date_time"] != ""
                                ) {
                                    i2["between_BC"] = true;
                                    this.$set(
                                        this.allDateInfo[k1]["dateItem"],
                                        k2,
                                        i2
                                    );
                                }
                            });
                        });
                        this.changeTextValHandle();
                    }
                    break;
                default:
                    break;
            }
        },

        /**
         * @Description:修改日期上的文本显示
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-22 11:20:35
         */

        changeTextValHandle() {
            this.$set(
                this.allDateInfo[this.num2[0]]["dateItem"][this.num2[1]],
                "textValue",
                "开始"
            );
            this.$set(
                this.allDateInfo[this.num1[0]]["dateItem"][this.num1[1]],
                "textValue",
                "结束"
            );
        },

        /**
         * @Description: 日期格式化 [yyyy-MM]
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-17 13:45:16
         */
        dateTtileFormate(date, format) {
            // console.log(date, typeof format);
            let t = new Date(date);
            let tf = i => {
                return (i < 10 ? "0" : "") + i;
            };
            return format.replace(/yyyy|MM/g, function(result) {
                switch (result) {
                    case "yyyy":
                        return t.getFullYear() + "年";
                    case "MM":
                        return tf(t.getMonth() + 1) + "月";
                    case "dd":
                        return tf(t.getDate()) + "日";
                    default:
                        break;
                }
            });
        },
        /**
         * @Description: 日期设置完成
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-19 17:16:46
         */

        confirmHandle() {
            if (this.num1 == undefined && this.num2 == undefined) {
                Toast("请选择时间");
                return;
            } else if (this.num1 != undefined && this.num2 == undefined) {
                Toast("请选择结束时间");
                return;
            } else if (this.num1[0] == this.num2[0]) {
                if (this.num1[1] < this.num2[1]) {
                    this.$emit("confirm", {
                        startDate: this.selectDateTime[0],
                        endDate: this.selectDateTime[1]
                    });
                } else if (this.num1[1] > this.num2[1]) {
                    this.$emit("confirm", {
                        startDate: this.selectDateTime[1],
                        endDate: this.selectDateTime[0]
                    });
                }
            } else if (this.num1[0] != this.num2[0]) {
                if (this.num1[0] < this.num2[0]) {
                    this.$emit("confirm", {
                        startDate: this.selectDateTime[0],
                        endDate: this.selectDateTime[1]
                    });
                } else if (this.num1[0] > this.num2[0]) {
                    this.$emit("confirm", {
                        startDate: this.selectDateTime[1],
                        endDate: this.selectDateTime[0]
                    });
                }
            }
            this.num1=null;
            this.num2=null;
            this.scrollStatus = false;
            lockBackgroundScroll(false);
        },
        /**
         * @Description: 返回
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-21 11:12:33
         */
        onClickLeft() {
            lockBackgroundScroll(false);
            this.$emit("onClickLeft");
        },
        /**
         * @Description:动态设置日期内容区的高度
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-22 09:30:53
         */

        getNodeHeightHandle() {
            let _this = this;
            let clientHeight =
                window.screen.height || window.screen.availHeight;
            this.$nextTick(() => {
                let headerOneHeight = window
                    .getComputedStyle(_this.$refs.headerOne)
                    .height.replace(/px/, "");
                let dateTimeHeight = window
                    .getComputedStyle(_this.$refs.dateTime.$el)
                    .height.replace(/px/, "");
                let bottomBtnHeight = window
                    .getComputedStyle(_this.$refs.bottomBtn)
                    .height.replace(/px/, "");

                _this.contentStyle = {
                    height: `${clientHeight -
                        headerOneHeight -
                        dateTimeHeight -
                        bottomBtnHeight -
                        50}px`
                };
            });
        },
        /**
         * @Description: 监听函数
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-22 13:26:39
         */

        watchHandle() {
            this.$watch("popShow", (newVal, oldVal) => {
                if (newVal) {
                    this.dateWeekStyle["transform"] = `translatex(0)`;
                    lockBackgroundScroll(true);
                    if (this.scrollStatus) {
                        this.scrillHandle("active-scroll");
                    }
                } else {
                    this.dateWeekStyle["transform"] = `translatex(100%)`;
                }
            });
        },
        /**
         * @Description: 展现所有年份
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-22 16:10:05
         */
        selectYear() {
            this.yearInfo["isShowYear"] = true;
            this.yearInfo["yearContentStyle"] = {
                animation: `yearShow 0.5s ease-in`
            };
        },
        /**
         * @Description: 选择年份
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-22 16:11:26
         */

        selectYearItem(year) {
            let container = document.getElementById("date-container");
            // container.scrollIntoView();
            console.log(container.scrollHeight);

            console.log(this.$refs.dateContent.children[0].children[0]);
            // console.log(window.getComputedStyle(this.$refs.dateContent).height);
            this.$nextTick(() => {
                this.$refs.dateContent.children[0];
                console.log(
                    // this.$refs.dateContent.children[0].children[0].offsetHeight
                    window.getComputedStyle(
                        this.$refs.dateContent.children[0].children[0]
                    ).height
                );
            });
            this.yearInfo["textVal"] = year;
            this.yearInfo["yearContentStyle"] = {
                animation: `yearClose 0.5s ease-out`
            };
            setTimeout(() => {
                this.yearInfo["isShowYear"] = false;
            }, 500);
        },
        /**
         * @Description: 滚动到当前年份
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-23 15:52:20
         */
        scrillHandle(nodeName) {
            document.querySelector(`.${nodeName}`).scrollIntoView();
        }
    },
    /**
     * @Description: 过滤器函数
     * @Param:
     * @Author: xwq
     * @LastEditors: xwq
     * @LastEditTime: Do not edit
     * @return:
     * @Date: 2019-10-18 17:21:56
     */
    filters: {
        dateTimeFormate(val) {
            return _self.dateTtileFormate(val, "yyyy-MM");
        },
        addClassNameHandle(val) {
            let dateResult = new Date(val);
            let y = dateResult.getFullYear();
            let m = dateResult.getMonth() + 1;
            let currentYear = new Date().getFullYear();
            if (y == currentYear && m == 1) {
                return "active-scroll";
            }
        }
    }
};
</script>
<style lang="less" >
.date-time-week {
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    .date-comtainer {
        .day-info-top {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #f2f2f2;
            box-sizing: border-box;
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            background-color: #fff;
            z-index: 1;
            margin-top: 46px;
            .weekday-style {
                font-size: 16px;
            }
        }

        /* 日期部分 */
        .date-content {
            /*  max-height: 100vh;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch; */
            .date-list-container {
                // height: 100vh;
                // overflow: auto;
                height: 100vh;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch; /* ios 自带滚动条不平滑解决方法 */
                padding: 5px 0 30px 0;
                .date-list {
                    width: 100%;
                    display: flex;
                    flex-flow: row wrap;
                    margin-bottom: 15px;
                    .date-list-item {
                        width: calc(100vw / 7);
                        height: 55px;
                        box-sizing: border-box;
                        text-align: center;
                        position: relative;
                        .text-value {
                            display: inline-block;
                            font-size: 12px;
                            position: absolute;
                            left: 50%;
                            top: 4px;
                            transform: translate(-50%, 0);
                        }
                        .date-list-item-text {
                            padding: 5px;
                            line-height: 45px;
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                        }
                    }
                }
                .date-title {
                    padding: 10px 20px;
                }
                & > :last-child {
                    margin-bottom: 40px;
                }
            }
        }
    }
    .button-content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .header-one {
        z-index: 999;
        .van-nav-bar__left {
            top: -2px;
            left: 5px;
            .van-icon {
                font-size: @font-lg;
                color: @black;
            }
        }
        .clearBackground {
            background: transparent;
        }
        .header-fixed-margin {
            margin-top: 46px;
        }

        .border-bottom {
            border-bottom: solid 3px #e14732;
        }
    }
    .select-year {
        width: 80px;
        height: 46px;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: 0;
        z-index: inherit;
        .select-year-arrow {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 46px;
            font-size: 16px;
            color: #999;
            &::after {
                content: "";
                display: inline-block;
                width: 15px;
                height: 20px;
                clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
                background-color: rgba(110, 108, 108, 0.7);
                vertical-align: middle;
                margin-left: 5px;
                position: relative;
                top: 3px;
            }
        }
        .select-year-content {
            width: 80px;
            height: 210px;
            overflow: auto;
            background-color: #fff;
            border-left: 1px solid #f2f2f2;
            border-bottom: 1px solid #f2f2f2;
            box-sizing: border-box;
            z-index: -1;
            position: relative;

            .select-year-content-item {
                padding: 10px 0 10px 15px;
                font-size: 16px;
                text-align: left;
                height: 40px;
                line-height: 20px;
                box-sizing: inherit;
            }
        }
    }
}
.active-item {
    background-color: #46aef7;
    color: #fff;
}
.active-item-between-style {
    background-color: #ebf7ff;
}
.no-events {
    pointer-events: none;
}
/* 路由动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(0);
    opacity: 0;
}

.arrow-down-style {
    &::after {
        content: "";
        display: inline-block;
        width: 15px;
        height: 15px;
        clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
        background-color: rgba(110, 108, 108, 0.7);
        vertical-align: middle;
        margin-left: 5px;
        position: relative;
        top: 3px;
    }
}
.arrow-up-style {
    &::after {
        content: "";
        display: inline-block;
        width: 15px;
        height: 15px;
        clip-path: polygon(50% 0, 0 100%, 100% 100%);
        background-color: rgba(110, 108, 108, 0.7);
        vertical-align: middle;
        margin-left: 5px;
        position: relative;
        top: -3px;
    }
}

@keyframes yearShow {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes yearClose {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(100px);
        opacity: 0;
    }
}
@keyframes arrowUp {
    from {
        background-color: rgba(110, 108, 108, 0.7);
        clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
    }
    to {
        background-color: rgba(110, 108, 108, 0.7);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
}
@keyframes arrowDown {
    from {
        background-color: rgba(110, 108, 108, 0.7);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
    to {
        background-color: rgba(110, 108, 108, 0.7);
        clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
    }
}
</style>