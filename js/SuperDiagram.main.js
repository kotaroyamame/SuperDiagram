$(function () {
    SuperDiagrum.Model=Backbone.Model.extend({
        initialize:function(){
            this.codeName=this.get('codeName');
            this.onFinger=this.get('onFinger');
            this.mute=this.get('mute');
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

    SuperDiagrum.View=Backbone.View.extend({
        el:'#stage',
        initialize:function(){
            var this_=this;
            this_.functions=new SuperDiagrum.functions();
            this_.functions.init();
            this_.collection.fetch({
                success:function(){
                    this_.modeChange();
                     $(".mode").on("change",function(){
                        this_.modeChange();
                    });
                },
                error:function(){
                    console.log("error");
                }
            });
        },
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
        randomRender:function(){
            var this_=this;
            var rand=Math.floor(Math.random()*$(".codename").length);
            this_.render($(".codename").eq(rand).val());
        
        },
        practice:function(){
            var this_=this;
            $(".textfield").text("プラクティスモード");
            this_.render($(".codename:checked").val());
            $(".codename").off();
            $(".codename").on("change",function(){
                this_.render($(this).val());
            });
        
        },
        quize:function(){
            var this_=this;
            $(".textfield").text("クイズモード　以下のコードはなに？？");
            this_.randomRender();
           
            $(".codename").off();
            $(".codename").on("click",function(){
                var ans=SuperDiagrum.settings.blockNO.charAt(0).toUpperCase() + SuperDiagrum.settings.blockNO.slice(1);
                $(".correct").off();
                if($(this).val()==SuperDiagrum.settings.blockNO){
                    
                    $("#text1").text("正解◯");
                    $("#text2").text("その通り！正解は"+ans+"です");
                    $(".correct").css({display:"block"}).animate({opacity:1});
                    $(".correct").on("click",function(){
                        this_.randomRender();
                         $(this).animate({opacity:0},500,function(){
                         $(this).css({display:"none"});
                         });
                    });
                }else{
                    
                    $("#text1").text("間違い☓");
                    $("#text2").text("正解は"+ans+"です");
                    $(".correct").css({display:"block"}).animate({opacity:1});
                    $(".correct").on("click",function(){
                        this_.randomRender();
                         $(this).animate({opacity:0},500,function(){
                         $(this).css({display:"none"});
                         });
                    });
                };
            });
        },
        modeChange:function(){
            var this_=this;
                if($(".mode:checked").val()=="practice"){
                    this_.practice();
                }else{
                    this_.quize();
                };
             
        },
        render:function(blockNO){
            if(blockNO!=null){
                SuperDiagrum.settings.blockNO=blockNO;
            };
            var this_=this;
            var x = this_.collection.where({codeName:blockNO});
            var ctx = this.$el[0].getContext( "2d" );
            ctx.clearRect(0, 0, 2000, 1000);
            this_.functions.drowString(ctx);
            this_.functions.drowFlet(ctx);
            for(var i=0;i<x[0].get("onFinger").length;i++){
            this_.functions.onpu(ctx,x[0].get("onFinger")[i][0],x[0].get("onFinger")[i][1]);
            };
            for(var i=0;i<x[0].get("mute").length;i++){
            this_.functions.mute(ctx,x[0].get("mute")[i]);
            };
            return this;
        }
    });
    
    SuperDiagrum.coll=new SuperDiagrum.Coll();
    SuperDiagrum.view=new SuperDiagrum.View({
        collection:SuperDiagrum.coll
    }); 
 });