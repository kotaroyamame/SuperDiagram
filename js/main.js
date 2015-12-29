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
            ctx.moveTo( SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.Flet.wide), SuperDiagrum.settings.StartPoint);
            ctx.lineTo( SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.Flet.wide), SuperDiagrum.settings.StartPoint+SuperDiagrum.settings.Flet.hight );
            ctx.closePath();
            }
            ctx.stroke();
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
  
$(function () {
    SuperDiagrum.Model2=Backbone.Model.extend({
        initialize:function(){
            this.onFinger=this.get('onFinger');
            this.mute=this.get('mute');
        }
    });
    SuperDiagrum.Model=Backbone.Model.extend({
        initialize:function(){
            this.codeName=this.get('codeName');
            this.data=new SuperDiagrum.Model2(this.get('data'));
        }
    });
    SuperDiagrum.Coll=Backbone.Collection.extend({
        url:'js/code.json',
        model:SuperDiagrum.Model,
        dataType : 'json',
        parse:function(data){
		return data;
	   } 
    });

    SuperDiagrum.Container=Backbone.View.extend({
        el:'#stage',
        initialize:function(){
            var this_=this;
            this_.functions=new SuperDiagrum.functions();
//            $(window).on('load',$.proxy(this,'render'));
//            $(window).on('resize',$.proxy(this,'onresize'));
            this_.functions.init();
            this_.collection.fetch({
                success:function(){
                    this_.eventListener();
                },
                error:function(){
                alert("error");
                }
            });
        },
//        events:{
//            "click .tileBlock":"onclick"
//        },
        onclick:function(e){
            this.render(this.$el.find(".tileBlock").index(e));
        },
        onresize:function(){
            var this_=this;
            if (this.timer2 !== false) {
                clearTimeout(this.timer2);
            }
            this.timer2=setTimeout(function(){
                this_.setsize();
            },400);       
        },
        eventListener:function(){
            var this_=this;
            this_.render($(".codename:checked").val());
             $(".codename").change(function(){
                 this_.render($(this).val());
             
             });
        },
        render:function(blockNO){
            var this_=this;
            var x = this_.collection.where({codeName:blockNO});
            console.log(this_.collection.at(2).get("data")["onFinger"][0][0]);
            var ctx = this.$el[0].getContext( "2d" );
            ctx.clearRect(0, 0, 2000, 1000);
            this_.functions.drowString(ctx);
            this_.functions.drowFlet(ctx);
            for(var i=0;i<x[0].get("data")["onFinger"].length;i++){
            this_.functions.onpu(ctx,x[0].get("data")["onFinger"][i][0],x[0].get("data")["onFinger"][i][1]);
            };
            for(var i=0;i<x[0].get("data")["mute"].length;i++){
            this_.functions.mute(ctx,x[0].get("data")["mute"][i]);
            };
            return this;
        }
    });
    
    SuperDiagrum.coll=new SuperDiagrum.Coll();
    SuperDiagrum.container=new SuperDiagrum.Container({
        collection:SuperDiagrum.coll
    });    
 });
    
    


