    window.onload = function(){

        var cvs = document.getElementById("canvas");
        var ctx = cvs.getContext("2d");

        var CanvasW = cvs.width;
        var CanvasH = cvs.height;

        var SnakeW = 10;
        var SnakeH = 10;
        
        var Food;

        //variable for score
        var score = 0;

        //Default direction
        var Direction = "RIGHT";

        //Get the directions from the User
        document.addEventListener("keydown",GetDirection);

        function GetDirection(el){
            if(el.keyCode == 37 && Direction != "RIGHT"){
                Direction = "LEFT";
            }else if(el.keyCode == 38 && Direction != "DOWN"){
                Direction = "UP";
            }else if(el.keyCode == 39 && Direction != "LEFT"){
                Direction = "RIGHT";
            }else if(el.keyCode == 40 && Direction != "UP"){
                Direction = "DOWN";
            }
        }

        //To create Snake  
      function DrawSnake(x,y){  

            ctx.fillStyle = "green";
            ctx.fillRect(x*SnakeW,y*SnakeH,SnakeW,SnakeH);

            ctx.fillStyle = "darkgreen";
            ctx.strokeRect(x*SnakeW,y*SnakeH,SnakeW,SnakeH);

      }
        var len = 5;
        var Snake = [];
        for(var i=len-1; i>=0; i--){

            Snake.push({x:i , y:0});

        }

        //Creat Food coordinates
       Food = {
             x: Math.round(Math.random() * (CanvasW/SnakeW-1)+1),
             y: Math.round(Math.random() * (CanvasH/SnakeH-1)+1)
         }

         //To Create Food
           function DrawFood(x,y){  

            ctx.fillStyle = "red";
            ctx.fillRect(x*SnakeW,y*SnakeH,SnakeW,SnakeH);

            ctx.fillStyle = "darkred";
            ctx.strokeRect(x*SnakeW,y*SnakeH,SnakeW,SnakeH);

         }
        // To check collision

        function CheckCollision(x,y,array){

            for(var i=0; i<array.length; i++){
                if(x == array[i].x && y == array[i].y){
                    return true;
                }
            }
            return false;  
        } 

        //Draw Score

        function DrawScore(x){
            ctx.fillStyle = "Yellow";
            ctx.font = "15px Arial";
            ctx.fillText("SCORE: "+x, 5, CanvasH-5);

        }

        //Draw Snake Array
        //Draw Food
        function Draw(){
            ctx.clearRect(0,0,CanvasW,CanvasH);
            for(var i=0; i<Snake.length; i++){

                var X = Snake[i].x;
                var Y = Snake[i].y;
                DrawSnake(X,Y);
            }

            DrawFood(Food.x,Food.y);
           //Coordintes of Snakes's Head 
            var SnakeX = Snake[0].x;
            var SnakeY = Snake[0].y;

            if(SnakeX < 0 || SnakeY < 0 || SnakeX >= CanvasW/SnakeW || SnakeY >= CanvasH/SnakeH || CheckCollision(SnakeX,SnakeY,Snake)){
                console.log("GAME OVER!!")
            }


            if(Direction == "LEFT") SnakeX--;
            else if(Direction == "UP") SnakeY--;
            else if(Direction == "RIGHT") SnakeX++;
            else if(Direction == "DOWN") SnakeY++;

            if(SnakeX == Food.x && SnakeY == Food.y){
                Food = {
                         x: Math.round(Math.random() * (CanvasW/SnakeW-1)+1),
                         y: Math.round(Math.random() * (CanvasH/SnakeH-1)+1)
           }

                 //To add a new head
            var newHead = {

                x : SnakeX,
                y : SnakeY
              };  
            score++;
         }
            else{
                Snake.pop();  //To Remove the tail
                var newHead = {

                x : SnakeX,
                y : SnakeY
            };       

           }
            Snake.unshift(newHead);
            DrawScore(score);
        }
      //Calling the Draw funtion after every 100ms.  
       setInterval(Draw,100);
     }


    



































