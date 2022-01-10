var loaded = false
var dat = {}
function bgManager(){
	if(!sessionStorage.getItem("openWin") || sessionStorage.getItem("openWin") == "yes")
	$file.open("/a/manApps/bgStyles/index.html",(htmlData)=>{
		loaded = true
		var p = $window({
			title:"Background Settings",
			html:htmlData,
		onclose:()=>{
			$file.save("/a/currentBG.json", JSON.stringify(genReport()))
		},
		onready:()=>{
			updateBG()
		}
		})
	    window.bgManagerWin = p
	    var $cont = $("#bgConfigPanel")
	})
	window.updateBG = function(data){
		if(!data){
		data = {
			type:$("#BgType").val(),
			rot:$("#BgDeg").val(),
			items:[]
		}
		let c = $("#bgColors").children()
		for(var li = 0; li < $("#bgColors").children().length;li++){
			data.items.push({
				color:$(c[li]).children("input[type=color]").val(),
			effect:$(c[li]).children("input[type=range]").val()
		    })
		}
	    }
		console.log("update")
		var result = ""
	    console.log(data)
	    switch(data.type){
	      case "lin":result += "linear-gradient(";break;
	      case "rad":result += "radial-gradient(";break;
	      case "reprad":result += "repeating-radial-gradient(";break;
	      case "replin":result += "repeating-linear-gradient(";break;
	    }
	    if(data.type == "lin" || data.type == "rad" || data.type == "reprad" || data.type == "replin"){
	      $("#BgDeg,#bgType-lin-or-rad").show()
	      $("#bgType-onecol").hide()
	      result += data.type == "lin" || data.type == "replin"? data.rot : Number(data.rot)+180
	      result += data.type == "lin" || data.type == "replin"? "deg" : "px"
		for(var li = 0; li < data.items.length;li++){
			result += ","
				result += data.items[li].color
			result += " "
			result += data.items[li].effect
			result += "%"
		}
	    }
		if(data.type == "rad" || data.type == "reprad"){
		if(data.type == "reprad"){
			result += data.rot
		    result += "px"
		}

	    }
	    if(data.type != "fill"){
		result += ")"
	    }else{
		$("#BgDeg,#bgType-lin-or-rad").hide()
		$("#bgType-onecol").show()
		result += $("#bgColor1").val()
	    }
	    $("#bgStyle").text(`.skin_background,.ui_window__head{background:${result} !important;}`)
	}
	window.addBGColor = function(data){
		if(!data){data = {color:"#000000", effect:"50"}}
		console.log("add: ", data)
	    if(loaded)
		$("#bgColors").append(`<li data-color="#000000"><input type="color" onchange="updateBG()" value="${data.color}"/><input type="range" onmousemove="updateBG()" style="width:50%" value="${data.effect}"/><button onclick="this.parentElement.remove();updateBG()">-</button></li>`)
	    updateBG()
	}
	if(!$("#bgStyle").length){
		$("body").append('<style id="bgStyle" />')
	}
	window.saveBG = function(){
		var settings = genReport()
	    console.log(settings)
	    var exp
	    exp = $explorer({save:true,onclose:()=>{
		var p = exp.getSelectionInput().value
		$file.save(p.endsWith(".json") ? p : p+".json", JSON.stringify(settings))
	    }})
	    console.log(exp)
	}
	function genReport(){
		var settings = {
		rot:$("#BgDeg").val(),
		items:[]
	    }
		Array.from($("#bgColors").children()).forEach((c)=>{
		settings.items.push({
			color:$(c).children("input[type=color]").val(),
			effect:$(c).children("input[type=range]").val()
		})
	    })
	    return settings
	}
	window.loadBG = function(path){
		var exp
	    var p
	    function read(){
		p = path ? path : exp.getSelectionInput().value
		console.log(exp)
		$file.open(p, "String", (f)=>{
			var settings = JSON.parse(f)
		    dat = settings
		    $("#BgDeg").val(settings.rot)
		    $("#bgColors").children().remove()
		    settings.items.forEach((i)=>{
			if(loaded)
				addBGColor(i)
		    })
			updateBG(dat)
			})
	    }
	    if(!path)exp = $explorer({browse:true, onclose:read})
	    else read()
	}
}
le._apps.backgroundStyler = {
	categories:"Utility;Viewer",
	exec:bgManager,
	name:"Background Style Config"
}
loadBG("/a/currentBG.json")
