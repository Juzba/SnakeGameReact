import "./SnakeApp.css";
import SnakeFunctions from "./Snakefunctions";
import { useRef, useEffect, useState } from "react";

let direction = "Right";
let lastDirection = "Left";
let posX = 100;
let posY = 200;
let foodPos;
let start = true;
let score;

const SnakeApp = () => {
	let listSnake = [new SnakeFunctions(posX, posY), new SnakeFunctions(posX - 50, posY)];

	// let [start, setStart] = useState(false);
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvasP = canvasRef.current;
		const context = canvasP.getContext("2d");

		canvasP.width = 800;
		canvasP.height = 600;

		document.addEventListener("keydown", function (event) {
			if (event.key === "w" && lastDirection !== "Down") direction = "Up";
			else if (event.key === "s" && lastDirection !== "Up") direction = "Down";
			else if (event.key === "a" && lastDirection !== "Right") direction = "Left";
			else if (event.key === "d" && lastDirection !== "Left") direction = "Right";
			console.log(direction);
		});

		setInterval(() => {
			if (start === true) {
				if (direction === "Up") posY -= 50;
				else if (direction === "Down") posY += 50;
				else if (direction === "Left") posX -= 50;
				else if (direction === "Right") posX += 50;
				lastDirection = direction;

				if (SnakeFunctions.colision(posX, posY, listSnake)) start = false;
				else {
					listSnake.unshift(new SnakeFunctions(posX, posY));
					Food();
					Draw(context);
				}

				// Vypis pozic
				console.clear();
				console.log("food: " + foodPos.X + " " + foodPos.Y);
				console.log("Snake: " + listSnake[0].X + " " + listSnake[0].Y);
				console.log(posX + " " + posY);
				console.log(start);
			}
		}, 500);
	});

	const Food = () => {
		if (foodPos === undefined || SnakeFunctions.Compare(foodPos, listSnake[0])) {
			do {
				foodPos = new SnakeFunctions(SnakeFunctions.RandNum(15), SnakeFunctions.RandNum(11));
			} while (SnakeFunctions.CompareArray(listSnake, foodPos));
			return;
		}
		listSnake.pop();
	};

	const Draw = (context) => {
		context.fillStyle = "#2A2929";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		for (let i = 0; i < listSnake.length; i++) {
			if(i === 0) context.fillStyle = "#d87204";
			else context.fillStyle = "#d3832e";
			context.fillRect(listSnake[i].X +1, listSnake[i].Y +1, 49, 49);
		}

		if (foodPos) {
			context.fillStyle = "#DC0018";
			context.fillRect(foodPos.X, foodPos.Y, 50, 50);
		}
	};

	return (
		<div className='snake'>
			<h1>Snake Game</h1>
			<div className='border'>
				<canvas ref={canvasRef} id='canvas'></canvas>
			</div>
		</div>
	);
};

export default SnakeApp;
