/* 锁住弹窗背景滚动方案一 */
export function lockBackgroundScroll(isOverly) {

    let bodyNode = document.body;
    let top = 0;

    (function stopBodyScroll(isOverly) {
        if (isOverly) {
            top = window.scrollY;
            bodyNode.style.position = 'fixed';
            bodyNode.style.top = -top + 'px';
            bodyNode.style.width = '100%';
        } else {
            bodyNode.style.position = '';
            bodyNode.style.top = '';

            window.scrollTo(0, top); // 回到原先的top
        }
    })(isOverly);

}

