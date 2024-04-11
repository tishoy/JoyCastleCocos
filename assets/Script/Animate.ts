import { tween, Node, animation, v2, easing, UIOpacity } from "cc";
/**
 * create by tishoy
 * 2024.4.11
 * 临时动画管理
 * 实现进入与呼吸
 *  
 */
export default class Animate {
    /**
     * 这里可以返回动画，也可以直接播放
     * @param target 目标节点
     * @param time 进入总时长
     * @param callback 
     */
    public static PopIn(target, time, callback: Function, isStart: boolean = true) {
        target.setScale(0, 0);
        let animate = tween(target).to(time, { scale: v2(1, 1) }).call(() => {
            callback && callback();
        });
        if (isStart) {
            animate.start();
        }
        return animate;
    }

    /**
     * 
     * @param target 
     * @param time 
     * @param callback 
     * @returns 
     */
    public static Breath(target, time, callback, isStart: boolean = true) {
        let scale = target.getScale();
        let onceAnimate = tween(target).to(time, { scale: v2(1.1 * scale.x, 0.9 * scale.y) })
            .to(time, { scale: v2(0.9 * scale.x, 1.1 * scale.y) }).call(() => {
                callback && callback();
            });
        let animate = tween(target).repeatForever(onceAnimate);
        if (isStart) {
            animate.start();
        }
        return animate;
    }

    /**
     * 
     * @param target 
     * @param time 
     * @param arc 震动角度
     * @param callback 
     */
    public static Shake(target, time, onceTime, fromArc, toArc, callback, isStart: boolean = true) {
        let onceAnimate = tween(target).to(onceTime, { angle: fromArc }).to(onceTime, { angle: toArc }).call(() => {
            target.angle = 0;
            callback && callback();
        });
        let animate = tween(target).repeat(Math.floor(time / onceTime), onceAnimate).start();
        if (isStart) {
            animate.start();
        }
        return animate;
    }

    /**
     * 
     */
    public static Scale(target, time, scale, callback, isStart: boolean = true) {
        let animate = tween(target).to(time, { scale: v2(scale, scale) }, { easing: easing.elasticOut }).call(() => {
            callback && callback();
        })
        if (isStart) {
            animate.start();
        }
        return animate;
    }

    public static AlphaIn(target, time, callback, isStart: boolean = true) {
        let targetAlpha = target.getComponent(UIOpacity);
        targetAlpha.opacity = 0;
        let animate = tween(targetAlpha).to(time, { opacity: 255 }).call(() => {
            callback && callback();
        })
        if (isStart) {
            animate.start();
        }
        return animate;
    }

    public static AlphaOut(target, time, callback, isStart: boolean = true) {
        let targetAlpha = target.getComponent(UIOpacity);
        targetAlpha.opacity = 255;
        let animate = tween(targetAlpha).to(time, { opacity: 0 }).call(() => {
            callback && callback();
        })
        if (isStart) {
            animate.start();
        }
        return animate;
    }
}