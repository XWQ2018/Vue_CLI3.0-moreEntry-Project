<!--
 * @Description: 弹窗组件
 * @Author: xwq
 * @Date: 2019-05-10 14:47:38
 -->
<template>
    <div class="dialog">
        <van-dialog
            v-model="show"
            show-cancel-button
            :cancel-button-text="cancelButtonText?cancelButtonText:'取消'"
            :cancel-button-color="cancelButtonColor?cancelButtonColor:'#000'"
            :confirm-button-text="confirmButtonText?confirmButtonText:'确定'"
            :confirm-button-color="confirmButtonColor?confirmButtonColor:'#1989fa'"
            @confirm="confirm"
            @cancel="cancel"
        >
            <van-row>
                <van-col span="24" class="close-btn">
                    <van-icon name="cross" size="30px" color="#666" @click="closeHandle" />
                </van-col>
            </van-row>
            <img src="@image/dialogIcon.png" />
            <p class="warning-info" v-text="warningInfoText?warningInfoText:''"></p>
        </van-dialog>
    </div>
</template>
<script>
import { Dialog } from "vant";
export default {
    props: {
        cancelButtonText: {
            type: String,
            default: "取消"
        },
        confirmButtonText: {
            type: String,
            default: "确定"
        },
        cancelButtonColor: String,
        confirmButtonColor: String,
        warningInfoText: String
    },
    components: {
        [Dialog.name]: Dialog
    },
    data() {
        return {
            show: true
        };
    },
    created() {},
    mounted() {},
    methods: {
        closeHandle() {
            this.$emit("closeHandle");
        },
        confirm() {
            this.$emit("confirm");
        },
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>
<style lang="less" scoped>
.dialog {
    /deep/ .van-dialog {
        border-radius: 10px;
    }
    /deep/ .van-dialog__content {
        text-align: center;
        & > img {
            width: 100px;
        }
        .warning-info {
            padding: 20px 0;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .close-btn {
        padding: 10px;
        text-align: right;
    }
}
</style>
