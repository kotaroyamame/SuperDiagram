window.SuperDiagrum={};
SuperDiagrum.settings={
    StartPoint:100,
    Flet:{"wide":60,"size":7},
    String:{"wide":20,"size":6}
};
SuperDiagrum.functions=function(){};
SuperDiagrum.functions.prototype={
        init:function(){
            SuperDiagrum.settings.Flet.hight=SuperDiagrum.settings.String.wide*(SuperDiagrum.settings.String.size-1);
        },
        drowString:function(ctx){
            ctx.beginPath();
            for(var i=0;i<SuperDiagrum.settings.String.size;i++){
                ctx.moveTo( SuperDiagrum.settings.StartPoint, SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.String.wide));
                ctx.lineTo( SuperDiagrum.settings.Flet.wide*(SuperDiagrum.settings.Flet.size+2), SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.String.wide));
                ctx.closePath();
            }
            ctx.stroke();
        },
        drowFlet:function(ctx){
            ctx.beginPath();
            for(var i=0;i<SuperDiagrum.settings.Flet.size;i++){
                if(i==0){
                    ctx.lineWidth = 5;
                }else{
                    ctx.lineWidth = 1;
                };
                ctx.moveTo( SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.Flet.wide), SuperDiagrum.settings.StartPoint);
                ctx.lineTo( SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.Flet.wide), SuperDiagrum.settings.StartPoint+SuperDiagrum.settings.Flet.hight );
                ctx.closePath();
                ctx.stroke();
            }
            
        },
        onpu:function(ctx,s,f){
            s--;
            ctx.beginPath();
            ctx.fillStyle = "rgb(255,0,0)";
            ctx.arc( 
                SuperDiagrum.settings.StartPoint+(f*(SuperDiagrum.settings.Flet.wide)-(SuperDiagrum.settings.Flet.wide/2)),
                SuperDiagrum.settings.StartPoint+(s*SuperDiagrum.settings.String.wide), 
                10, 
                0, 
                Math.PI*2,
                false 
            );
            ctx.fill();
        },
        mute:function(ctx,s){
            s--;
            var batuL=15;
            ctx.beginPath();
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.lineWidth = 2;
            ctx.moveTo( SuperDiagrum.settings.StartPoint+(SuperDiagrum.settings.Flet.wide/2)+(batuL/2),
                       SuperDiagrum.settings.StartPoint+(s*SuperDiagrum.settings.String.wide)-(batuL/2));
            ctx.lineTo(SuperDiagrum.settings.StartPoint+(SuperDiagrum.settings.Flet.wide/2)-(batuL/2),
                       SuperDiagrum.settings.StartPoint+(s*SuperDiagrum.settings.String.wide)+(batuL/2));
            ctx.closePath();
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.moveTo( SuperDiagrum.settings.StartPoint+(SuperDiagrum.settings.Flet.wide/2)-(batuL/2),
                       SuperDiagrum.settings.StartPoint+(s*SuperDiagrum.settings.String.wide)-(batuL/2));
            ctx.lineTo(SuperDiagrum.settings.StartPoint+(SuperDiagrum.settings.Flet.wide/2)+(batuL/2),
                       SuperDiagrum.settings.StartPoint+(s*SuperDiagrum.settings.String.wide)+(batuL/2));
            ctx.closePath();
            ctx.stroke();
            }

};
