var silenced = !!localStorage.getItem("silenced")
var forceAlert = $notif
function updateSilence(silence=0){
  silenced = typeof silence !== "number" ? silence : silenced
  localStorage.setItem("silenced",silenced?"1":"")
  if(silenced){
    $notif = (...args)=>{}
  }else{
    $notif = forceAlert
  }
}
document.addEventListener("keydown",ev=>{
  if(ev.code == "KeyS" && ev.altKey){
    silenced = !silenced
    updateSilence()
    forceAlert("Silencer "+(silenced?"active":"disabled"))
  }
})
