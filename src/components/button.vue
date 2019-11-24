<!--
 * @Description: 按钮组件
 * @Author: xwq
 * @Date: 2019-06-17 09:26:04
 -->
<template>
    <div class="page">
        <div class="main-container">
            <div :class="{fixed:isFixed}">
                <van-button
                    native-type="button"
                    :type="typeInfo"
                    :size="buttonSize"
                    :icon="leftIcon"
                    :text="buttonText"
                    :isFixed="isFixed"
                    :disabled="isDisabled"
                    @click="buttonHandle"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        buttonText: {
            type: String,
            default: "确定"
        },
        isFixed: {
            type: Boolean,
            default: false
        },
        buttonSize: {
            type: String,
            default: "large"
        },
        leftIcon: {
            type: String
        },
        typeInfo: {
            type: String,
            default: "info"
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        backgroundColor: {
            type: String,
            default: "#46aef7"
        },
        textColor: {
            type: String,
            default: "#fff"
        }
    },
    data() {
        return {
            buttonStyle: null
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        //初始化
        init() {
            if (this.backgroundColor) {
                this.buttonStyle = {
                    "background-color": "buttonStyle",
                    color: this.textColor
                };
            }
        },
        /**
         * @Description: 按钮事件
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-31 14:18:07
         */
        buttonHandle() {
            this.$emit("buttonHandle");
        }
    },
    watch: {
        /**
         * @Description: 按钮样式处理
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-31 14:09:23
         */

        backgroundColor(newVal, oldVal) {
            this.buttonStyle = {
                "background-color": newVal,
                color: this.textColor
            };
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0;
        .fixed {
            position: fixed;
            right: 0;
            left: 0;
            bottom: 15px;
            padding: 20px;
        }
    }
}
</style>


