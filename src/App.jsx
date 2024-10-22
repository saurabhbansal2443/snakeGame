import React, { useState, useEffect, useRef } from "react";

const gridSize = 15;
const gameGrid = Array.from({ length: gridSize }, () =>
  new Array(gridSize).fill(0)
);

const App = () => {
  let [snake, setSnake] = useState([
    [2, 3],
    [2, 4],
    [2, 5],
  ]);
  let direction = useRef([0, 0]);
  let foodCordinate = useRef([5, 6]);
  // let timeRef = useRef(1000)
  let isSnakeCordinate = (xc, yc) => {
    let res = snake.some((scord) => scord[0] == xc && scord[1] == yc);
    return res;
  };

  const generatefoodCordinate = function () {
    let xc = Math.floor(Math.random() * (gridSize - 1));
    let yc = Math.floor(Math.random() * (gridSize - 1));
    foodCordinate.current = [xc, yc];
  };

  useEffect(() => {
    let timer = setInterval(function () {
      setSnake((prevState) => {
        let copySnake = [...prevState];

        let newCordinate = [
          copySnake[copySnake.length - 1][0] + direction.current[0],
          copySnake[copySnake.length - 1][1] + direction.current[1],
        ];
        copySnake.push(newCordinate);
        // console.log("outside" , snake)
        if (
          newCordinate[0] == -1 ||
          newCordinate[0] == gridSize ||
          newCordinate[1] == -1 ||
          newCordinate[1] == gridSize ||
          prevState.some(
            (scord) =>
              scord[0] == newCordinate[0] && scord[1] == newCordinate[1]
          )
        ) {
          // console.log("reset" , snake)
          direction.current = [0, 0];
          return [
            [2, 3],
            [2, 4],
            [2, 5],
          ];
        }

        if (
          newCordinate[0] == foodCordinate.current[0] &&
          newCordinate[1] == foodCordinate.current[1]
        ) {
          generatefoodCordinate();
        } else {
          copySnake.shift();
        }
        return copySnake;
      });

      const changeDirection = (event) => {
        if (event.key == "ArrowDown" && direction.current[0] != -1) {
          direction.current = [1, 0];
        } else if (event.key == "ArrowUp" && direction.current[0] != 1) {
          direction.current = [-1, 0];
        } else if (event.key == "ArrowLeft" && direction.current[1] != 1) {
          direction.current = [0, -1];
        } else if (event.key == "ArrowRight" && direction.current[1] != 1) {
          direction.current = [0, 1];
        }
      };

      window.addEventListener("keydown", changeDirection);

      return () => {
        clearInterval(timer);
        window.removeEventListener("keydown", changeDirection);
      };
    }, 100);
  }, []);
  return (
    <div className="gameBox">
      {gameGrid.map((arr, xc) => {
        return arr.map((cell, yc) => {
          return (
            <div
              key={xc + "" + yc}
              className={`cell ${isSnakeCordinate(xc, yc) && "snake"} ${
                xc == foodCordinate.current[0] &&
                yc == foodCordinate.current[1] &&
                "food"
              }`}
            ></div>
          );
        });
      })}
    </div>
  );
};

export default App;
