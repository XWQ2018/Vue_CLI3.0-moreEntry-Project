<!--
 * @Description: 首页
 * @Author: xwq
 * @Date: 2019-11-24 20:04:31
 -->
<template>
    <div class="page-index">
        <headerOne title="首页" />
        <intervalTimeSelect :popShow="popShow" @screenHandle="screenHandle" @confirm="confirm" />
        <div class="main-container">
            <h2>我是index页</h2>
            <van-button type="primary">确定</van-button>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/headOne";
import intervalTimeSelect from "@/components/calendar/intervalTimeSelect";
export default {
    components: {
        headerOne,
        intervalTimeSelect
    },
    data() {
        return {
            popShow: false
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 时间筛选
         * @Param:
         * @Author: xwq
         * @Date: 2019-11-24 20:14:39
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */

        screenHandle() {
            this.popShow = true;
        },
        /**
         * @Description: 日期设置完成
         * @Param:
         * @Author: xwq
         * @Date: 2019-11-24 20:19:33
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */

        confirm(dateInfo) {
            this.popShow = false;
            console.group("返回的日期信息对象");
            console.dir(dateInfo);
        }
    }
};
</script>
<style lang="less" scoped>
.page-index {
    text-align: center;
    .main-container {
        margin-top: 46px;
        h2 {
            color: #f00;
            font-size: 18px;
            padding: 20px;
        }
    }
}
</style>