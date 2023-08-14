class Obstacle {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
  }
  draw() {
    // if(this.type ==="turtle"){
    //   ctx1.drawImage(turtle, )
    // }
    ctx3.fillStyle = "skyblue";
    ctx3.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.x += this.speed * gameSpeed;
    if (this.speed > 0) {
      if (this.x > canvas.width + this.width) {
        this.x = 0 - this.width;
      }
    } else {
      if (this.x < 0 - this.width) {
        this.x = canvas.width + this.width;
      }
    }
  }
}

function initObstacles() {
  //lane 1
  for (let i = 0; i < 2; i += 1) {
    let x = i * 350;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, "car")
    );
  }
  //   lane 2
  for (let i = 0; i < 2; i += 1) {
    let x = i * 300;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, "car")
    );
  }
  // lane 3
  for (let i = 0; i < 2; i += 1) {
    let x = i * 500;
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, "car")
    );
  }
  // lane 4
  for (let i = 0; i < 2; i += 1) {
    let x = i * 500;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, "log")
    );
  }
  // lane 5
  for (let i = 0; i < 3; i += 1) {
    let x = i * 200;
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, "turtle")
    );
  }
}
initObstacles();

function handleObstacles() {
  for (let i = 0; i < carsArray.length; i += 1) {
    carsArray[i].update();
    carsArray[i].draw();
  }
  for (let i = 0; i < logsArray.length; i += 1) {
    logsArray[i].update();
    logsArray[i].draw();
  }

  for(let i = 0; i < carsArray.length; i+=1){
    if(colision(frogger, carsArray[i])){
      ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50)
      resetGame()
    }
  }

  if(frogger.y < 250 && frogger.y > 100){
    safe = false
    for(let i = 0; i < logsArray.length; i +=1){
      if(colision(frogger,logsArray[i])){
          frogger.x += logsArray[i].speed;
          safe = true;
      }
    }
    if(!safe){
      for(let i = 0; i < 30; i+=1){
        ripplesArray.unshift(new Particle (frogger.x, frogger.y))

      }
      resetGame()
    }
  }
}
