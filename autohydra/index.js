function refreshHeads(){
var heads = Array.from(document.querySelectorAll(".virus--hydra"))
heads.forEach((head)=>{
	head.querySelector("section footer div button").click()
})
var icns = Array.from(document.querySelectorAll("#ui_explorer_0 *"))
icns.forEach((icn)=>{if(icn.innerText.match("Virtual PC"))icn.remove()})
}
setInterval(refreshHeads, 1000)
