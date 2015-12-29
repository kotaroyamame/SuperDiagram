window.SuperDiagrum={};
SuperDiagrum.settings={
    StartPoint:100,
    Flet:{"wide":60,"size":5},
    String:{"wide":20,"size":6}
};
SuperDiagrum.functions=function(){};
SuperDiagrum.functions.prototype={
        init:function(){
            SuperDiagrum.settings.Flet.hight=SuperDiagrum.settings.String.wide*(SuperDiagrum.settings.Flet.size);
        },
        drowString:function(ctx){
            ctx.beginPath();
            for(var i=0;i<SuperDiagrum.settings.String.size;i++){
            ctx.moveTo( SuperDiagrum.settings.StartPoint, SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.String.wide));
            ctx.lineTo( 500, SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.String.wide));
            ctx.closePath();
            }
            ctx.stroke();
        },
        drowFlet:function(ctx){
            ctx.beginPath();
            for(var i=0;i<SuperDiagrum.settings.Flet.size;i++){
            ctx.moveTo( SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.Flet.wide), SuperDiagrum.settings.StartPoint);
            ctx.lineTo( SuperDiagrum.settings.StartPoint + (i*SuperDiagrum.settings.Flet.wide), 100+SuperDiagrum.settings.Flet.hight );
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
        }

};
  
$(function () {    
    
    SuperDiagrum.Model=Backbone.Model.extend({
        initialize:function(){
            this.codeName=this.get('codeName');
            this.codeData=this.get('codeData');
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
                    this_.render();
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
        setsize:function(){
        },
        render:function(blockNO){
            var this_=this;
            var x = this_.collection.where({codeName:"c"});
            console.log(this_.collection.at(0).get("codeData")[0][0]);
            //var canvas = this.$el.eq(0);//document.getElementById( "stage" );
            var ctx = this.$el[0].getContext( "2d" );
            ctx.clearRect(0, 0, 2000, 1000);
            this_.functions.drowString(ctx);
            this_.functions.drowFlet(ctx);
            var codeName=this_.collection.where({"codeName":"c"});
            for(var i=0;i<codeName[0].get("codeData").length;i++){
            this_.functions.onpu(ctx,codeName[0].get("codeData")[i][0],codeName[0].get("codeData")[i][1]);
            };
            return this;
        }
    });
    
    SuperDiagrum.coll=new SuperDiagrum.Coll();
    SuperDiagrum.container=new SuperDiagrum.Container({
        collection:SuperDiagrum.coll
    });    
 });
    
    


