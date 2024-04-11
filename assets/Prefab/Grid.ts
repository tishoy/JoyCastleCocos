import { _decorator, Component, find, Node, resources, Sprite, SpriteFrame } from 'cc';
import { ColorEnum } from '../Script/Enum';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {

    private _color = ColorEnum.NONE;
    private sprGrid: Sprite;

    onLoad() {
        this.sprGrid = find("sprGrid", this.node).getComponent(Sprite);
    }

    update(deltaTime: number) {

    }

    public set Color(value) {
        this._color = value;
        if (this._color != ColorEnum.NONE) {
            resources.load("grids/grid" + this._color + "/spriteFrame", SpriteFrame, (err, sp) => {
                this.sprGrid.spriteFrame = sp;
            })

        }
    }

    public get Color() {
        return this._color;
    }
}

