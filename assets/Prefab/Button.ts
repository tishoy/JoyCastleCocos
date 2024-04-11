import { _decorator, Color, Component, find, Node, Sprite, tween } from 'cc';
import Animate from '../Script/Animate';
const { ccclass, property } = _decorator;

@ccclass('Button')
export class Button extends Component {
    protected onLoad(): void {
        this.nSprite = find("nSprite", this.node);
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private nSprite
    private cb;

    protected start(): void {
        tween(this.nSprite).parallel(
            Animate.PopIn(this.nSprite, 0.5, () => {
                tween(this.nSprite).removeSelf();
                this.breath();
            }, false),
            Animate.Shake(this.nSprite, 0.5, 0.1, -1, 1, null, false)
        ).start();
    }

    update(deltaTime: number) {

    }

    private breath() {
        Animate.Breath(this.nSprite, 1.5, () => {

        });
    }

    private onTouchStart() {
        tween(this.nSprite).removeSelf();
        // this.nSprite.setScale(1, 1);
        this.nSprite.getComponent(Sprite).color = Color.GRAY;
        Animate.Scale(this.nSprite, 0.5, 0.8, () => {
            this.breath();
        });
    }

    private onTouchMove() {

    }

    private onTouchCancel() {
        tween(this.nSprite).removeSelf();
        this.nSprite.getComponent(Sprite).color = Color.WHITE;
        Animate.Scale(this.nSprite, 0.5, 1, () => {
            this.breath();
        });
    }

    private onTouchEnd() {
        tween(this.nSprite).removeSelf();
        this.nSprite.getComponent(Sprite).color = Color.WHITE;
        Animate.Scale(this.nSprite, 0.5, 1, () => {
            this.breath();
        });
        this.cb && this.cb();
    }

    public setSprite(value) {
        this.nSprite.getComponent(Sprite).spriteFrame = value;
    }

    public setCallBack(cb) {
        this.cb = cb;
    }
}

