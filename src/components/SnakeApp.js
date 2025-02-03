import './SnakeApp.css';
import SnakeFunctions from './Snakefunctions';
import { useRef, useEffect } from 'react';

let direction = 'Right';
let lastDirection = 'Left';
let posX;
let posY;
let score = 0;
let count = 0;
let foodPos = new SnakeFunctions(650, 300)
let start = false;
let listSnake = [new SnakeFunctions(500, 450), new SnakeFunctions(450, 450), new SnakeFunctions(400, 450), new SnakeFunctions(350, 450)]


const SnakeApp = () => {
    const canvasRef = useRef(null);
    const scoreRef = useRef(null);

    useEffect(() => {
        const canvasP = canvasRef.current;
        const context = canvasP.getContext('2d');

        canvasP.width = 800;
        canvasP.height = 600;

        DrawText(context);


        document.addEventListener('keydown', function (event) {
            if (event.key === 'w' && lastDirection !== 'Down') direction = 'Up';
            else if (event.key === 's' && lastDirection !== 'Up') direction = 'Down';
            else if (event.key === 'a' && lastDirection !== 'Right') direction = 'Left';
            else if (event.key === 'd' && lastDirection !== 'Left') direction = 'Right';
			else if (event.key === "Enter") start = true;
        });


        setInterval(() => {
            if (start === true) {
                if (count === 0) {
                    Reset();
                    count++;
                    scoreRef.current.innerText = `Score: ${score}`;
                }

                if (direction === 'Up') posY -= 50;
                else if (direction === 'Down') posY += 50;
                else if (direction === 'Left') posX -= 50;
                else if (direction === 'Right') posX += 50;
                lastDirection = direction;

                if (SnakeFunctions.colision(posX, posY, listSnake)) {start = false; DrawEnd(context)}// Konec
                else {
                    listSnake.unshift(new SnakeFunctions(posX, posY));
                    Food();
                    DrawGame(context);
                }

                // Vypis pozic
                // console.clear();
                // console.log('food: ' + foodPos.X + ' ' + foodPos.Y);
                // console.log('Snake: ' + listSnake[0].X + ' ' + listSnake[0].Y);
                // console.log(start);
                // console.log(count);
            } else count = 0;
        }, 300);
    });


    const Food = () => {
        if (SnakeFunctions.Compare(foodPos, listSnake[0])) {
            foodPos = SnakeFunctions.CreateFood(listSnake);
            scoreRef.current.innerText = `Score: ${(score += 100)}`; // score ++
        } 
		else listSnake.pop();
    };


    const DrawGame = (context) => {
        context.fillStyle = '#2A2929';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        for (let i = 0; i < listSnake.length; i++) {                          // Draw Snake
            if (i === 0) context.fillStyle = '#d87204';
            else context.fillStyle = '#d3832e';
            context.fillRect(listSnake[i].X + 1, listSnake[i].Y + 1, 49, 49);
        }

        if (foodPos) {													     // Draw Food
            context.fillStyle = '#DC0018';
            context.fillRect(foodPos.X + 1, foodPos.Y + 1, 49, 49);
        }
    };

    const DrawText = (context) => {
		DrawGame(context)
		
        context.fillStyle = '#7c7763';
        context.font = '50px Arial';
        context.fillText('Ovládání: w,a,s,d', 50, 80);
        context.fillText('Start: Enter', 50, 180);

    };

	const DrawEnd = (context) => {
		context.fillStyle = '#7c7763';
        context.font = '80px Arial';
        context.fillText('Game Over', 200, 300);
	}

    const Reset = () => {
        score = 0;
        foodPos = SnakeFunctions.CreateFood(listSnake);
        posX = 100;
        posY = 200;
        direction = 'Right';
        lastDirection = 'Left';
        listSnake = [new SnakeFunctions(posX, posY), new SnakeFunctions(posX - 50, posY), new SnakeFunctions(posX - 100, posY)];
    };

    return (
        <div className="snake">
            <h1 ref={scoreRef}>Snake Game</h1>
            <div className="border">
                <canvas onKeyDown={(Enter)=>start = true}
                    ref={canvasRef}
                    id="canvas"></canvas>
            </div>
        </div>
    );
};

export default SnakeApp;
