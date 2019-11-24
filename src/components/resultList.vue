<!--
 * @Description: 结果展示
 * @Author: xwq
 * @Date: 2019-07-09 13:55:22
 -->
<template>
    <div class="page" v-if="listInfo">
        <div class="main-container">
            <van-row span="24" class="desc-info margin-bottom">
                <van-col span="24" tag="h3" class="text-left">{{title}}</van-col>
                <van-col tag="ul" span="24" class="desc-list-info text-left">
                    <van-col tag="li" span="24" v-for="(item,key) in dataList" :key="key">{{item}}</van-col>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        },
        listInfo: {
            type: String
        }
    },
    data() {
        return {
            dataList: []
        };
    },
    created() {
        this.listInfo ? this.listInfoFormate(this.listInfo) : false;
    },
    mounted() {},
    methods: {
        /**
         * @Description: 换行处理
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-07 16:28:39
         */
        listInfoFormate(val) {
            switch (true) {
                case val.indexOf("\n") > -1:
                    this.dataList = this.addNumber(val.split("\n"));
                    break;
                case val.indexOf("\\s") > -1:
                    this.dataList = this.addNumber(val.split("\\s"));
                    break;
                case val.indexOf(",") > -1:
                    this.dataList = this.addNumber(val.split(","));
                    break;
                case val.indexOf(";") > -1:
                    this.dataList = this.addNumber(val.split(";"));
                    break;
                default:
                    this.dataList[0] = val;
                    break;
            }
        },
        /**
         * @Description: 加上序号
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-07 16:29:13
         */

        addNumber(arrList) {
            for (let k in arrList) {
                arrList[k] = +k + 1 + "、" + arrList[k];
            }
            return arrList;
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0;
        .desc-info {
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            > h3 {
                padding-top: 10px;
                font-weight: bold;
                font-size: 20px;
            }
            .desc-list-info {
                & > li {
                    font-size: 16px;
                    line-height: 26px;
                    padding: 10px 0 10px 10px;
                }
            }
        }
    }
}
</style>
