<!--
 * @Description: 侧边栏菜单
 * @Author: xwq
 * @Date: 2019-07-13 11:11:02
 -->
<template>
    <div class="header-left-menu">
        <van-popup
            v-model="popupIsShow"
            :position="positionInfo"
            :style="styleInfo"
            :get-container="getContainer"
        >
            <div class="top-info">
                <img v-lazy="imageUrl" class="top-info-pic" @click.prevent />
                <div class="user-name">
                    <span>王宝强</span>
                </div>
            </div>
            <van-cell-group>
                <van-cell
                    v-for="(item,key) in listInfo"
                    :key="key"
                    :title="item.title"
                    :icon="item.iconName"
                    is-link
                    @click="clickMenuHandle(item)"
                />
            </van-cell-group>
            <p class="statement-bottom">关于雲亿科技</p>
        </van-popup>
    </div>
</template>
<script>
import eventVue from "@/utils/eventVue"; //引入vue的构造函数
export default {
    props: {
        /* 定位点 */
        positionInfo: {
            type: String
        },
        /* 内容样式 */
        styleInfo: {
            type: Object
        },
        /* 指定挂载点 */
        getContainer: {
            type: String,
            default: ""
        },
        /* 圆角 */
        round: {
            type: Boolean,
            default: false
        },
        /* 是否显示遮罩层 */
        overlay: {
            type: Boolean
        },
        /* 菜单栏信息 */
        listInfo: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    components: {},
    data() {
        return {
            popupIsShow: false,
            imageUrl: require("@assets/image/pic01.png")
        };
    },
    created() {},
    mounted() {
        this.getEmitValue();
    },
    methods: {
        /**
         * @Description: 接收$emit发送的数据 _显示左侧菜单
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-13 10:24:55
         */
        getEmitValue() {
            eventVue.$on("menuStatus", msg => {
                this.popupIsShow = msg;
            });
        },
        /**
         * @Description: 菜单列表跳转
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-13 14:28:17
         */

        clickMenuHandle(item) {
            eventVue.$emit("menuListHandle", item);
        }
    }
};
</script>

<style lang="less" scoped>
.header-left-menu {
    /deep/ .van-cell__title {
        text-align: left;
    }
    .top-info {
        padding: 20px 30px;
        background: linear-gradient(
            to bottom,
            rgb(57, 143, 241) 10%,
            rgb(7, 234, 241) 100%
        );
        .top-info-pic {
            width: 40%;
        }
        .user-name {
            font-size: 18px;
        }
    }
    .statement-bottom {
        padding: 10px;
        font-size: 14px;
        text-align: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 10px;
        color: rgba(204, 204, 204, 0.5);
    }
}
</style>
