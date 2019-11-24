<!--
 * @Description: 轮播图组件
 * @Author: xwq
 * @Date: 2019-07-09 13:55:22
 -->
<template>
    <div class="page" v-if="imgList">
        <div class="banner">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in imgList" :key="index">
                    <img v-lazy="image" @click="enlargeImage(imgList, index)" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { Swipe, SwipeItem, ImagePreview } from "vant";
export default {
    props: {
        imgList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 图片预览
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-08 16:34:20
         */

        enlargeImage(imgList, index) {
            ImagePreview({
                images: imgList,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    margin: 5px 0;
    .banner {
        width: 100%;
        background-color: #fff;
        /deep/ .van-swipe-item {
            text-align: center;
            & > img {
                display: block;
                width: 100%;
                max-height: 200px;
                min-height: auto;
            }
        }
    }
}
</style>
