(async ()=>{
	if(window.includes["hasFSLoad"])return
	window["hasFSLoad"] = true
	var fsHandle
	document.addEventListener("keydown", async (ev)=>{
		if(ev.key == "r" && ev.altKey){
			if(ev.ctrlKey){
				fsHandle = await showDirectoryPicker()
			}
			restartAppManInstall(fsHandle)
		}
	})
})()
async function restartAppManInstall(fsHandle){
	sessionStorage.setItem("verboseMode", "no")
	var installHandle = await fsHandle.getFileHandle("install.js")
	var installFile = await installHandle.getFile()
	var text = await installFile.text()
	var readFsHandle = fsHandle
	eval(text)
}
