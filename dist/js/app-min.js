var loadColors=function(){$.ajax({type:"GET",url:"/get_colors.php",dataType:"HTML",success:function(e){var o=JSON.parse(e);o.forEach(function(e){var o=e.hex.split(" "),a=e.id;$(".home").append('<div class="item" id="'+a+'" data-id="'+a+'"><div class="color" style="background-color:#'+o[0]+'" data-color="'+o[0]+'"></div><div class="color" style="background-color:#'+o[1]+'" data-color="'+o[1]+'"></div><div class="color" style="background-color:#'+o[2]+'" data-color="'+o[2]+'"></div><div class="color" style="background-color:#'+o[3]+'" data-color="'+o[3]+'"></div></div>')})}})},loadFavourites=function(){$.ajax({type:"GET",url:"/get_colors.php",dataType:"HTML",success:function(e){var o=JSON.parse(e);o.forEach(function(e){var o=localStorage.getItem("palettes"),a=o.split(","),t=e.hex.split(" "),r=e.id,s=""+r;a.indexOf(s)>=0&&$(".favourites").append('<div class="item" id="'+r+'" data-id="'+r+'"><div class="color" style="background-color:#'+t[0]+'" data-color="'+t[0]+'"></div><div class="color" style="background-color:#'+t[1]+'" data-color="'+t[1]+'"></div><div class="color" style="background-color:#'+t[2]+'" data-color="'+t[2]+'"></div><div class="color" style="background-color:#'+t[3]+'" data-color="'+t[3]+'"></div></div>')})}})},hexToRgb=function(e){return e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,o,a,t){return"#"+o+o+a+a+t+t}).substring(1).match(/.{2}/g).map(function(e){return parseInt(e,16)})},sidebar=function(){var e=$("#content"),o=$(".sidebar"),a=$("#close-sidebar"),t=$("#changeBgColor");e.on("click",".item",function(a){a.stopPropagation();var r=$(a.target).parent().data("id"),s=$(a.target).parent().children();o.find(".color").remove(),$("#navigation").removeClass("active"),$(".nav-toggle").removeClass("active"),s.each(function(){var e=$(this).data("color");o.append('<div class="color"><div class="example" style="background-color:#'+e+'"></div><div class="hex"><span>HEX: </span>#'+e+'</div><div class="rgb"><span>RGB: </span>'+hexToRgb("#"+e)+"</div></div>")}),o.find(".favourite").remove(),t.removeClass("active"),o.addClass("active");var l=localStorage.getItem("palettes");e.hasClass("favourites")?o.append('<button id="removeFavourite" class="favourite remove" value="'+r+'">Remove favourite</button>'):l.indexOf(r)!==-1?(o.append('<button id="removeFavourite" class="favourite remove" value="'+r+'">Remove favourite</button>'),loadColors()):o.append('<button id="favourite" class="favourite" value="'+r+'">+ Add favourite</button>')}),$(document).on("keyup",function(e){27===e.keyCode&&(o.removeClass("active"),o.find(".favourite").remove(),$("#navigation").removeClass("active"),$(".nav-toggle").removeClass("active"))}),a.on("click",function(){o.removeClass("active"),t.removeClass("active"),o.find(".favourite").remove()})},changeBgColor=function(){var e=$("#content"),o=$("#pink"),a=$("#green"),t=$("#blue"),r=$("#yellow"),s=$("#grey"),l=$("#red"),i=$("#black"),c=$("#changeBgColorButton"),n=$("#changeBgColor");c.on("click",function(e){n.toggleClass("active"),e.stopPropagation()}),$(document).on("keyup",function(e){27===e.keyCode&&n.removeClass("active")}),o.on("click",function(){e.removeClass(),e.addClass("pink"),n.removeClass("active")}),a.on("click",function(){e.removeClass(),e.addClass("green"),n.removeClass("active")}),t.on("click",function(){e.removeClass(),e.addClass("blue"),n.removeClass("active")}),r.on("click",function(){e.removeClass(),e.addClass("yellow"),n.removeClass("active")}),s.on("click",function(){e.removeClass(),e.addClass("grey"),n.removeClass("active")}),l.on("click",function(){e.removeClass(),e.addClass("red"),n.removeClass("active")}),i.on("click",function(){e.removeClass(),e.addClass("black"),n.removeClass("active")})},favourite=function(){var e=$("body");e.on("click","#favourite",function(){var o=$("#favourite").attr("value"),a=localStorage.getItem("palettes");localStorage.setItem("palettes",a+o+","),$(".alert").remove(),$('<div style="display: none;" class="alert success">Palette saved!</div>').appendTo(e).slideDown("fast"),setTimeout(function(){$(".alert").remove()},3e3)})},removeFavourite=function(){var e=$("body");e.on("click","#removeFavourite",function(){var o=$("#content"),a=$(".sidebar"),t=""+$("#removeFavourite").attr("value"),r=localStorage.getItem("palettes"),s=r.split(",");s=$.grep(s,function(e){return e!==t});var l=s;localStorage.setItem("palettes",l),o.empty(),a.removeClass("active"),o.hasClass("favourites")?loadFavourites():loadColors(),$(".alert").remove(),$('<div style="display: none;" class="alert error">Palette error!</div>').appendTo(e).slideDown("fast"),setTimeout(function(){$(".alert").remove()},3e3)})},mobileMenu=function(){var e=$("#nav-toggle"),o=$("#navigation");e.on("click",function(){o.toggleClass("active"),$(this).toggleClass("active"),$(".sidebar").removeClass("active")})};$(document).ready(function(){loadColors(),sidebar(),changeBgColor(),favourite(),loadFavourites(),removeFavourite(),mobileMenu()});