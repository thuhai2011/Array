// CONSTANT
    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 30;
    
    const COLOR_MAPPING = [
        'red',     //7 màu tương ứng vs 7 hình khác nhau
        'orange',
        'green',
        'purple',
        'blue',
        'cyan',
        'yellow',
        'white',
    ];

    const KEY_CODES ={
      LEFT: 'ArrowLeft',
      RIGHT: 'ArrowRight',
      UP : 'ArrowUp',
      DOWN : 'ArrowDown',
    };

    const BRICK_LAYOUT = [
        [
          [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
          ],
          [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
          ],
          [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
          ],
          [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
          ],
        ],
        [
          [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
          ],
          [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
          ],
          [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
          ],
          [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
          ],
        ],
        [
          [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
          ],
          [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
          ],
          [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
          ],
          [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
          ],
        ],
        [
          [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
          ],
          [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
          ],
          [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
          ],
          [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
          ],
        ],
        [
          [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
          ],
          [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
          ],
          [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
          ],
          [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
          ],
        ],
        [
          [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
          ],
          [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
          ],
          [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
          ],
          [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
          ],
        ],
        [
          [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
          ],
          [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
          ],
          [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
          ],
          [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
          ],
        ],
      ];
    const WHITE_COLOR_ID = 7;// mau thuong dung

    const canvas = document.getElementById('board'); //tao 1 bien canvas
    const ctx = canvas.getContext('2d');

    ctx.canvas.width =  BLOCK_SIZE * COLS ;
    ctx.canvas.height = BLOCK_SIZE * ROWS ;


    //BOARD
    class  Board {
        constructor(ctx){
            this.ctx = ctx;
            this.gird = this.generateWhiteBoard();
            this.score = 0; 
            this.gameOver = false;
            this.isPlaying = false;
        }

        reset(){
          this.score = 0 ;
          this.gird = this.generateWhiteBoard();
          this.gameOver= false;
          this.drawBoard();
        }

        generateWhiteBoard (){    //tao ra mang 2 chieu vs cot la ROWS va hang la COLS
            return Array.from({length: ROWS}, () => Array(COLS).fill(WHITE_COLOR_ID));
        }

        drawCell(xAxis, yAxis, colorId){   
            this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
            this.ctx.fillRect(xAxis  * BLOCK_SIZE ,yAxis * BLOCK_SIZE , BLOCK_SIZE,BLOCK_SIZE);
            this.ctx.fillStyle = 'black';
            this.ctx.strokeRect(xAxis  * BLOCK_SIZE ,yAxis * BLOCK_SIZE , BLOCK_SIZE,BLOCK_SIZE)
        }

        drawBoard() {
            for(let row = 0; row <this.gird.length; row++){
                for(let col = 0; col <this.gird[0].length; col++){
                    this.drawCell(col, row, this.gird[row][col]);
                }
            }
        }

        handleCompleteRow(){
          const latesGird = board.gird.filter((row) => {
            return row.some(col => col == WHITE_COLOR_ID);
          });

          const newScore = ROWS - latesGird.length;  // SUM cac hang da hoan thanh
          const newRows = Array.from ({ length:  newScore}, () => Array(COLS).fill(WHITE_COLOR_ID));
        
          if (newScore){
            this.handleScore(newScore * 10)
            board.gird= [...newRows, ...latesGird];
          
          }
        
        }

        handleScore(newScore){
          this.score += newScore;
          document.getElementById('score').innerHTML = this.score;
        }

        handleGameOver(){
          this.gameOver = true;
          this.isPlaying = false;
          alert('GAME OVER !!!');
        }
    }
     // END  BOARD


     // BRICK
    class Brick {
        constructor(id){
            this.id = id;
            this.layout = BRICK_LAYOUT[id];
            this.activeIndex = 0;  //luu lai  index hien tai
            this.colPos = 3;
            this.rowPos = -2;
           
        }

        draw(){
            for(let row = 0; row < this.layout[this.activeIndex].length; row++){
                for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
                    if(this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID){
                        board.drawCell(col + this.colPos,row + this.rowPos, this.id);
                    }
                }
            }
        }

        clear(){
          for(let row = 0; row < this.layout[this.activeIndex].length; row++){
            for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
                if(this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID){
                    board.drawCell(col + this.colPos,row + this.rowPos, WHITE_COLOR_ID);
                }
            }
          }
        }

        moveLeft(){
          if ( !this.checkCollision(this.rowPos, this.colPos-1 , this.layout[ this.activeIndex])){
            this.clear();
            this.colPos--;
            this.draw();
          }
        }

        moveRight(){
          if ( !this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])){
            this.clear();
            this.colPos++;
            this.draw();
          }
        }

        moveTop(){
          if ( !this.checkCollision(this.rowPos - 1 , this.colPos,  this.layout[this.activeIndex])){
            this.clear();
            this.rowPos--;
            this.draw();
          }
        }

        moveDown(){
          if ( !this.checkCollision(this.rowPos + 1, this.colPos,  this.layout[this.activeIndex])){
            this.clear();
            this.rowPos++;
            this.draw();

            return;
          }
           this.handleLanded();
           if(!board.gameOver){
            generateNewBrick();
           }
    
        }

        rotate(){
          if (!this.checkCollision(this.rowPos, this.colPos , this.layout[(this.activeIndex + 1) % 4 ])){
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            //activeIndex = (0 + 1) % 4 ==> 1
            //activeIndex = ( 3 + 1)% 4 ==> 0 quay về ban đầu
            this.draw();
          }
        }

        //xu ly va cham
        checkCollision(nextRow , nextCol, nextLayout){
          // if (nextCol < 0) return true ;

          for(let row = 0; row < nextLayout.length; row++){
            for(let col = 0; col < nextLayout[0].length; col++){
                if(nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0){
                   if (col+ nextCol < 0 ||
                    (col + nextCol>= COLS)  || 
                    (row + nextRow >= ROWS) ||
                    board.gird[row + nextRow][ col + nextCol] !== WHITE_COLOR_ID
                    )
                    return true;
                }
            }
          }
          return false;
        }

        handleLanded(){
          if (this.rowPos <= 0 ){
            board.handleGameOver();
            return;
          }

          for(let row = 0; row < this.layout[this.activeIndex].length; row++){
            for(let col = 0; col < this.layout[this.activeIndex][0].length; col++){
                if(this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID){
                    board.gird[row + this.rowPos][col + this.colPos] = this.id
                }
            }
          }
          board.handleCompleteRow();
          board.drawBoard();
        }

    }

    function generateNewBrick(){
      brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length); //tao ra 1 vien gach bat ki
    }

   const board =new Board(ctx);
    board.drawBoard();
 
    
    document.getElementById('play').addEventListener('click', () =>{
      board.reset();
      board.isPlaying = true;
      generateNewBrick();

       // tao ra 1 vien gach moi xuat hien trong bn giay
      const refresh = setInterval(() => {
        if( !board.gameOver){
          brick.moveDown();
        }else{
          clearInterval(refresh);
        }
        
      }, 1000);
    })
    
   

    document.addEventListener('keydown', (e) => {
      if (!board.gameOver && board.isPlaying ){
        console.log({e});
        switch(e.code){
          case KEY_CODES.LEFT:
          brick.moveLeft();
          break;
  
          case KEY_CODES.RIGHT:
            brick.moveRight();
          break;
  
          case KEY_CODES.DOWN:
            brick.moveDown();
          break;
  
          case KEY_CODES.UP:
            brick.rotate();
          break;
        
          default:
          break;
        }
      }
    });