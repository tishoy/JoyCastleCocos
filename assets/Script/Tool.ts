import { Color } from "cc";
import { ColorEnum } from "./Enum";

/**
 * 
 */
export class Tool {

    /**
     * sumOfTwoNumberFromDifferentArray
     * 两个不同数组中的数字之和
     * O(sqr(n))
     */
    public static sumFromDiffArray(array1: Array<number>, array2: Array<number>, testNumber: number = null) {
        let sums = [];
        for (let i = 0; i < array1.length; i++) {
            if (isNaN(array1[i])) {
                continue;
            }
            for (let j = 0; j < array2.length; j++) {
                if (isNaN(array2[j])) {
                    continue;
                }
                if (testNumber != null) {
                    if (testNumber == array1[i] + array2[j]) {
                        return true;
                    }
                } else {
                    if (sums.indexOf(array1[i] + array2[j]) == -1) {
                        sums.push(array1[i] + array2[j]);
                        continue;
                    }
                }
            }
        }
        if (testNumber != null) {
            return false;
        } else {
            return sums;
        }
    }

    /**
     * O(n)
     * @param array 
     * @param value 
     * @returns 
     */
    public static isInArray(array: Array<number>, value: number) {
        return array.indexOf(value) != -1;
    }


    /**
     * 
     * @param x 提高概率百分点。这里感觉使用数字权重会更好  x 最大不能超过30
     * @param y 最大提高概率百分点。这里感觉使用数字权重会更好  y 最大不能超过 80
     * @param baseRate 基准概率，题目中没有提及暂时定为5个颜色平均分20%
     * @param row 
     * @param col 
     */
    public static generateMatrix(x: number, y: number, baseRate: number = 20, row: number = 10, col: number = 10) {
        let matrix = [];
        let lastRow = [];
        let left = ColorEnum.NONE;
        let up = ColorEnum.NONE;
        for (let m = 0; m < col; m++) {
            matrix.push([]);
            left = ColorEnum.NONE;
            for (let n = 0; n < row; n++) {
                if (lastRow.length > 0) {
                    up = lastRow[n];
                }
                left = this.randomColor(baseRate, x, y, left, up);
                matrix[m].push(left)
            }
            lastRow = matrix[m];
        }
        return matrix;
    }

    /**
     * 
     * @param baseRate 基础百分点
     * @param x 
     * @param y 
     */
    private static randomColor(baseRate, x, y, left, up) {
        if (left != ColorEnum.NONE || up != ColorEnum.NONE) {
            let list = [];
            if (left == up) {
                for (let i = ColorEnum.RED; i < ColorEnum.TOTAL; i++) {
                    if (i == left) {
                        list.push(baseRate + y);
                    } else {
                        list.push(this.calculateRate(x, y, baseRate, left, up));
                    }
                }
            } else {
                for (let i = ColorEnum.RED; i < ColorEnum.TOTAL; i++) {
                    if (i == left && left != ColorEnum.NONE) {
                        list.push(baseRate + x);
                    } else if (i == up && up != ColorEnum.NONE) {
                        list.push(baseRate + x);
                    } else {
                        list.push(this.calculateRate(x, y, baseRate, left, up));
                    }
                }
            }
            return Tool.randomByList(list);
        }
        return this.random(ColorEnum.TOTAL);
    }

    /**
     * 
     * @param n 
     * @returns 
     */
    public static random(n) {
        return Math.floor(Math.random() * n);
    }

    /**
     * 传入一组百分点，返回随机落在的部分
     * @param list 一个总和不超过100的数组
     * @returns 如 [10, 10] 则随机一个数字后，如果为5 则返回0 如果为15 返回1，如果为 30 返回2
     */
    public static randomByList(list = []) {
        let rate = this.random(100);
        let sum = 0;
        for (let i = 0; i < list.length; i++) {
            sum += list[i];
            if (rate < sum) {
                return i;
            }
        }
        return list.length;
    }

    /**
     * 计算剩余部分的概率
     * @param left 
     * @param up 
     * @returns 
     */
    private static calculateRate(x, y, baseRate, left, up) {
        if (left == ColorEnum.NONE && up == ColorEnum.NONE) {
            return 20;
        } else {
            if (left == up) {
                return (100 - baseRate - y) / 4
            } else {
                if (left == ColorEnum.NONE || up == ColorEnum.NONE) {
                    return (100 - baseRate - x) / 4
                } else {
                    return (100 - 2 * baseRate - 2 * x) / 3;
                }
            }
        }

    }

    public static getPos(x, y, col) {
        return x * col + y;
    }

    public static getXY(pos, col) {
        return {
            x: pos % col,
            y: Math.floor(pos / col)
        }
    }

}
