import { _decorator, Component, EditBox, find, instantiate, Label, Node, Prefab, resources, tween, Tween } from 'cc';
import Animate from '../Script/Animate';
import { Tool } from '../Script/Tool';
import { Grid } from '../Prefab/Grid';
import { Button } from '../Prefab/Button';
const { ccclass, property } = _decorator;

/**
 * create by tishoy
 * 2024.4.11
 * 游戏场景
 * 面试题主场景
 */


@ccclass('GameScene')
export class GameScene extends Component {

    @property(Prefab)
    public gridPrefab: Prefab;

    private Q1Control: Node;
    private Q2Control: Node;
    private Q3: Node;

    private nInputX: Node;
    private nInputY: Node;
    private nInputA: Node;
    private nInputB: Node;
    private nInputV: Node;
    private nPlay: Node;

    private lbCacheResult: Label;
    private lbTestResult: Label;

    private cacheList;

    private nGrid: Node
    private nContent: Node;

    private inputX: EditBox;
    private inputY: EditBox;

    private inputA: EditBox;
    private inputB: EditBox;
    private inputV: EditBox;

    private currentMatrix;

    private grids = [];

    private col = 10;
    private row = 10;

    private currentQuestion = 1;


    protected onLoad(): void {
        this.Q1Control = find("nMain/Q1Control", this.node);
        this.Q2Control = find("nMain/Q2Control", this.node);
        this.Q3 = find("nMain/Q3", this.node);
        this.nInputX = find("nMain/Q1Control/nInputX", this.node);
        this.nInputY = find("nMain/Q1Control/nInputY", this.node);
        this.inputX = this.nInputX.getComponent(EditBox);
        this.inputY = this.nInputY.getComponent(EditBox);

        this.nInputA = find("nMain/Q2Control/nInputA", this.node);
        this.nInputB = find("nMain/Q2Control/nInputB", this.node);
        this.nInputV = find("nMain/Q2Control/nInputV", this.node);
        this.inputA = this.nInputA.getComponent(EditBox);
        this.inputB = this.nInputB.getComponent(EditBox);
        this.inputV = this.nInputV.getComponent(EditBox);


        this.lbCacheResult = find("nMain/Q2Control/lbCache", this.node).getComponent(Label);
        this.lbTestResult = find("nMain/Q2Control/lbResult", this.node).getComponent(Label);

        this.nContent = find("nToast/nContent", this.node);

        this.nGrid = find("nMain/nGrid", this.node);


        this.nPlay = find("nMain/Q1Control/nPlay", this.node);

        this.nPlay.getComponent(Button).setCallBack(() => {
            this.onPlay();
        });

        resources.preloadDir("Grids");



    }

    start() {


    }

    update(deltaTime: number) {

    }

    onPlay() {
        if (this.inputX.textLabel.string.length == 0) {
            this.showToast("请输入X值");
            return;
        }
        if (this.inputY.textLabel.string.length == 0) {
            this.showToast("请输入Y值");
            return;
        }
        let x, y;
        if (isNaN(Number(this.inputX.textLabel.string))) {
            this.showToast("X 的输入错误");
            return;
        } else {
            x = Number(this.inputX.textLabel.string);
        }
        if (isNaN(Number(this.inputY.textLabel.string))) {
            this.showToast("Y 的输入错误");
            return;
        } else {
            y = Number(this.inputY.textLabel.string);
        }

        this.currentMatrix = Tool.generateMatrix(x, y);
        this.drawMatrix();
    }

    private colorGrid(index, color) {
        let grid;
        while (index >= this.grids.length) {
            this.initGrid(index);
        }
        grid = this.grids[index]

        grid.getComponent(Grid).Color = color;
        return grid;
    }

    private initGrid(index) {
        let grid = instantiate(this.gridPrefab);
        this.grids.push(grid);
        this.nGrid.addChild(grid);
        grid.setPosition(Tool.getXY(index, this.col).x * 100, Tool.getXY(index, this.col).y * -100);
    }

    private drawMatrix() {
        for (let i = 0; i < this.currentMatrix.length; i++) {
            for (let j = 0; j < this.currentMatrix[i].length; j++) {
                let index = Tool.getPos(i, j, this.currentMatrix[i].length);
                this.colorGrid(index, this.currentMatrix[i][j]);

            }
        }
    }

    private showToast(toast) {
        console.log(toast);
        this.nContent.active = true;
        this.nContent.getComponent(Label).string = toast;
        Animate.AlphaIn(this.nContent, 1, () => {
            setTimeout(() => {
                Animate.AlphaOut(this.nContent, 1, () => {
                    this.nContent.active = false;
                    this.nContent.getComponent(Label).string = "";
                })
            }, 1000);
        });
    }

    private cacheAllResult() {
        this.cacheList = Tool.sumFromDiffArray(this.A, this.B);
        console.log(this.cacheList);
        this.lbCacheResult.string = "缓存全部可能出现的结果,复杂度为O(n^2):\n" +
            this.cacheList.toString() + "\n 再次查询的复杂度为O(n)";


    }

    private testResult() {
        let v = this.inputV.textLabel.string;
        if (v.length == 0) {
            v = "42";
        }
        if (this.lbCacheResult.string.length == 0) {
            this.lbTestResult.string = "未缓存结果，复杂度为O(n^2) \n 查询结果为: " + Tool.sumFromDiffArray(this.A, this.B, Number(v));
        } else {
            this.lbTestResult.string = "从缓存结果中查找,复杂度为O(n) \n 查询结果为: " + Tool.isInArray(this.cacheList, Number(v));
        }
    }

    private get A() {
        let a;
        if (this.inputA.textLabel.string.length == 0) {
            a = [10, 40, 5, 280];
        } else {
            a = this.inputA.textLabel.string.split(",");
            a.forEach((value, index, array) => {
                a[index] = Number(value);
            })
        }
        return a;
    }

    private get B() {
        let b;
        if (this.inputB.textLabel.string.length == 0) {
            b = [234, 5, 2, 148, 23];
        } else {
            b = this.inputB.textLabel.string.split(",")
            b.forEach((value, index, array) => {
                b[index] = Number(value);
            })
        }
        return b;
    }


    private switchQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion == 4) {
            this.currentQuestion = 1;
        }
        if (this.currentQuestion == 1) {
            this.Q1Control.active = true;
            this.nGrid.active = true;
            this.Q2Control.active = false;
            this.Q3.active = false;
        };
        if (this.currentQuestion == 2) {
            this.Q1Control.active = false;
            this.nGrid.active = false;
            this.Q2Control.active = true;
            this.Q3.active = false;
        }
        if (this.currentQuestion == 3) {
            this.Q1Control.active = false;
            this.nGrid.active = false;
            this.Q2Control.active = false;
            this.Q3.active = true;
        }
    }
}

