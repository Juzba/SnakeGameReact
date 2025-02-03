class SnakeFunctions {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }


    static RandNum = (cislo) => {
        let num = 0;
        do {
            num = (Math.random() * 100).toFixed(0);
        } while (num > cislo);
        return num * 50;
    };


    static Compare = (SnakeFunctions1, SnakeFunctions2) =>
        SnakeFunctions1.X === SnakeFunctions2.X && SnakeFunctions1.Y === SnakeFunctions2.Y ? true : false;


    static CompareArray = (SnakeList, SnakeFunctions1) => {
        for (const element of SnakeList) {
            if (this.Compare(element, SnakeFunctions1)) return true;
        }
        return false;
    };


    static colision = (posX, posY, listSnake) => {
        if (this.CompareArray(listSnake, new SnakeFunctions(posX, posY))) return true;
        else if (posX < 0 || posY < 0 || posX > 750 || posY > 550) return true;
        return false;
    };

	
    static CreateFood = (listSnake) => {
        let foodPos;

        do {
            foodPos = new SnakeFunctions(this.RandNum(15), this.RandNum(11));
        } while (this.CompareArray(listSnake, foodPos));

        return foodPos;
    };
}

export default SnakeFunctions;
