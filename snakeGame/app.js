var cn = document.getElementById("snakes");
var score_div = document.getElementById("score");
var ctx = cn.getContext("2d");
var main_angle = 0;
var score = 0;
//var nn = new neural_network(5, 6, 4);
var high_scores = [0];
var h_s = document.getElementById("high-scores");
h_s.innerHTML = "Highest Score : " + high_scores[0];
function cos_of_angle(angle) {
    var r = Math.cos(angle / 180 * Math.PI);
    if (angle == 180) {
        r = Math.cos(Math.PI);
    }
    if (r < .0001 && r > 0) {
        return 0;
    }
    return r;
}
function sin_of_angle(angle) {
    var r = Math.sin(angle * Math.PI / 180);
    if (r < 0.0001 && r > 0) {
        return 0;
    }
    return r;
}
var food = function (side, pos_x, pos_y) {
    this.side = side;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.draw = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.pos_x, this.pos_y, this.side, this.side);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fill(); ctx.restore();
    }
}
function eaten_own_body() {
    for (var i = 1; i < r.body_length; i++)//eating own body
    {//console.log("EXECUTING");
        if (r.body[i].pos_x == r.body[0].pos_x && r.body[i].pos_y == r.body[0].pos_y) {	//console.log("s_o.body[0].pos_x = "+s_o.body[0].pos_x+" s_o.body[0].pos_y = "+s_o.body[0].pos_y);
            //console.log("s_o.body["+i+"].pos_x = "+r.body[i].pos_x+" s_o.body["+i+"].pos_y = "+r.body[i].pos_y);
            return true;
        }
    }
    return false;

}
var dp = false; var f; var f_x, f_y, r;
var game_area = {
    start: function () {
        score = 0;

        var game_over = document.getElementById("game_over");
        game_over.innerHTML = ''; r = null; f = null; f_x = null; f_y = null; clearInterval(this.updat);
        r = new snake(10);
        r.begin(parseInt((Math.random() * (700 - 100) - 100) / 10) * 10, parseInt((Math.random() * (550 - 30) - 30) / 10) * 10);
        f_x = parseInt((Math.random() * (800 - 0) - 0) / 10) * 10;
        f_y = parseInt((Math.random() * (570 - 0) - 0) / 10) * 10;
        f = new food(10, f_x, f_y);
        this.updat = setInterval(update_game_area, 50);
        score_div.innerHTML = "0";
    },
    clear: function () {
        ctx.clearRect(0, 0, 800, 570);
    },
    stop: function () {
        high_scores.push(score);

        high_scores.sort().reverse();
        h_s.innerHTML = "Highest Score : " + high_scores[0];
        clearInterval(this.updat);
    },
    game_over: function () {
        score = 0;

        stop();
        r = null; f = null; f_x = null; f_y = null;
    }

}
var body_part = function (edge_l, pos_x, pos_y) {
    this.side = edge_l;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.angle = 0;
    this.draw_part = function (color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(this.pos_x, this.pos_y, this.side, this.side);
        ctx.lineWidth = 2;

        ctx.stroke();
        ctx.fill(); ctx.restore();
    }
}
var snake = function (edge, p_x, p_y) {
    this.body = [];
    this.edge = edge;
    this.body_length = 5;
    this.begin = function (p_x, p_y) {
        var a = new body_part(this.edge, p_x, p_y); // initializing the first box in the body
        this.body.push(a);
        //console.log(a);
        for (var j = 1; j < this.body_length; j++) {
            var x = this.body[j - 1].pos_x - cos_of_angle(this.body[j - 1].angle) * this.edge;
            var y = this.body[j - 1].pos_y - sin_of_angle(this.body[j - 1].angle) * this.edge;
            a = new body_part(this.edge, x, y);
            this.body.push(a);
        }
    }
    this.draw = function (prev_angle) {

        this.body[0].draw_part("blue");
        var an = this.body[0].angle;
        var prev_x = this.body[0].pos_x - ((cos_of_angle(an)) * this.edge);
        var prev_y = this.body[0].pos_y - ((sin_of_angle(an)) * this.edge);
        //console.log("****************")
        for (var j = 1; j < this.body_length; j++) {
            var temp_angle = this.body[j].angle;
            var temp_x = this.body[j].pos_x;
            var temp_y = this.body[j].pos_y;
            this.body[j].pos_x = prev_x; this.body[j].pos_y = prev_y; this.body[j].angle = prev_angle;
            this.body[j].draw_part("grey");
            prev_x = temp_x;
            prev_y = temp_y;
            prev_angle = temp_angle;


        }
    }
}
var btn_enabled = true;
function move_snake(s_o) {
    s_o.body[0].pos_x += cos_of_angle(s_o.body[0].angle) * 10;
    s_o.body[0].pos_y += sin_of_angle(s_o.body[0].angle) * 10;
    btn_enabled = true;
    if (s_o.body[0].pos_x == f.pos_x && s_o.body[0].pos_y == f.pos_y)//eating food
    {
        //console.log("Eaten!");
        score++;
        score_div.innerHTML = score;
        var t_x = s_o.body[s_o.body_length - 1].pos_x - s_o.body[s_o.body_length - 1].angle * s_o.edge;
        var t_y = s_o.body[s_o.body_length - 1].pos_y - s_o.body[s_o.body_length - 1].angle * s_o.edge;
        var bp = new body_part(s_o.edge, t_x, t_y);//console.log("bp is "+bp);
        s_o.body_length++;
        s_o.body.push(bp);
        f.pos_x = parseInt((Math.random() * (800 - 0) - 0) / 10) * 10;
        f.pos_y = parseInt((Math.random() * (570 - 0) - 0) / 10) * 10;
    }
    //while(eaten_own_body()){
    //	random_turn();}
    if (eaten_own_body()) {	//console.log("s_o.body[0].pos_x = "+s_o.body[0].pos_x+" s_o.body[0].pos_y = "+s_o.body[0].pos_y);
        //console.log("s_o.body["+i+"].pos_x = "+s_o.body[i].pos_x+" s_o.body["+i+"].pos_y = "+s_o.body[i].pos_y);
        //console.log("EEATEN");
        game_area.stop(); var game_over = document.getElementById("game_over");
        game_over.innerHtml = "Game Over!";
    }
    if (s_o.body[0].pos_x >= cn.width || s_o.body[0].pos_y >= cn.height || s_o.body[0].pos_y < 0 || s_o.body[0].pos_x < 0) // touched to the walls
    {
        game_area.stop();//console.log("I STOPPED!");
        var game_over = document.getElementById("game_over");//console.log(game_over);
        game_over.innerHTML = "Game Over!";
    }

    r.draw(p_a);

}
var p_a = 0;
function turn_snake(dir) {
    if (dir == "l") {
        bt_enabled = false;
        r.body[0].angle = 180; p_a = 180;
    }
    else if (dir == "r") {
        r.body[0].angle = 0;
        p_a = 0;
    }
    else if (dir == "u") {
        r.body[0].angle = -90;
        p_a = -90;
    }
    else if (dir == "d") {
        r.body[0].angle = 90;
        p_a = 90;
    }

}
window.onkeydown = function (e) {
    //console.log(r.body[0].angle);
    if (e.keyCode == 18) {
        game_area.stop();
    }
    if (e.keyCode == 82) {
        game_area.start();
    }
    if (e.keyCode == 39 && r.body[0].angle != 180) {	//console.log("RIGHT");
        turn_snake("r");
    }
    if (e.keyCode == 37 && r.body[0].angle != 0) {	//console.log("LEFT");
        turn_snake("l");
    }
    if (e.keyCode == 38 && r.body[0].angle != 90) {	//console.log("UP");
        turn_snake("u");
    }
    if (e.keyCode == 40 && r.body[0].angle != -90) {	//console.log("DOWN")
        turn_snake("d");
    }
}
game_area.start();
function update_game_area() {
    game_area.clear();
    f.draw();
    //random_turn();
    //r.draw(p_a);
    move_snake(r);

}
