<!--
 * @Description: 搜索组件
 * @Author: xwq
 * @Date: 2019-07-12 11:14:44
 -->
<template>
    <div class="search">
        <van-cell-group>
            <van-field
                v-model="inputVal"
                center
                clearable
                left-icon="search"
                :laceholder="placeholderText"
                @focus="focusHandle"
            >
                <van-button
                    slot="button"
                    size="small"
                    type="primary"
                    @click="searchClick"
                >{{buttonText}}</van-button>
            </van-field>
        </van-cell-group>
        <div class="list-info" v-if="inputInfoStatus">
            <div class="poup-back" @click="backgroundHandle(true)"></div>
            <van-cell
                :title="item"
                is-link
                v-for="(item,key) in inputInfo"
                :key="key"
                @click="listInfoClick(item)"
            />
        </div>
    </div>
</template>
<script>
import { Field } from "vant";
import eventVue from "@/utils/eventVue"; //引入vue的构造函数
export default {
    props: {
        buttonText: {
            type: String,
            default: "搜索"
        },
        placeholderText: {
            type: String,
            default: "请输入搜索内容"
        }
    },
    components: {
        [Field.name]: Field
    },
    data() {
        return {
            inputVal: "",
            inputInfo: [],
            inputInfoStatus: false
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 输入框获得焦点时展示历史记录
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-12 13:57:22
         */
        focusHandle() {
            this.inputInfoStatus = this.inputInfo != "" ? true : false;
        },

        /**
         * @Description:选择历史记录
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-12 14:11:38
         */
        listInfoClick(item) {
            this.inputVal = item;
            this.inputInfoStatus = false;
        },
        /**
         * @Description: 点击poup层关闭历史
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-12 16:37:49
         */
        backgroundHandle(val) {
            if (val) {
                this.inputInfoStatus = false;
            }
        },

        /**
         * @Description: 搜索
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-12 11:42:48
         */
        searchClick() {
            if (!this.inputVal) {
                this.$toast("请输入内容");
                return;
            }
            eventVue.$emit("searchButton", this.inputVal);
            this.inputInfo.push(this.inputVal);
            this.inputInfoStatus = false;
            this.inputVal = "";
        }
    }
};
</script>
<style lang="less" scoped>
.search {
    /deep/ .van-cell-group {
        z-index: 1;
    }
    .list-info {
        margin-top: 2px;
        max-height: 200px;
        overflow-y: scroll;
        .poup-back {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0);
        }
    }
}
</style>
