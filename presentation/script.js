const model = document.getElementById("model")
text = document.getElementById("text")

const slides = [
    { orbit: "0.7853981633974483rad 1.0471975511965976rad 1.394005512113755m", target: "0.22319932297229755m 0.13559815406466985m -0.004142616687683509m", fov: "30.000000000000004", hots: ["none", "none", "none","none"], text: `This is the initial position. <br><br> <a href="https://google.com">It supports HTML!</a>` }
]

// Add your list you got by pressing K here. 
slides.push(
    {orbit: "5.329625205729553rad 1.2614654933964773rad 0.9240880164624616m", target: "0.2542153037843135m 0.12226937537566085m -0.06792249685928903m", fov: "21.211229079154872", hots: ["none","none","block","none"], text: "We 3D printed and spray painted a bunch of plastic pieces!"},{orbit: "0.6886387961046563rad 1.4195088048040616rad 1.2467789429008242m", target: "0.4414386104331244m 0.13476058651121545m -0.0959204468444072m", fov: "28.594013612325156", hots: ["none","none","none","block"], text: "We Spray painted these side plates as well!"},{orbit: "0.8979979997832929rad 1.150632401345464rad 0.46904547373113425m", target: "0.034649818432147025m 0.15562325781352912m -0.10388137936099975m", fov: "17.412657454222256", hots: ["block","none","none","none"], text: "This is where our control hub is placed."},{orbit: "1.9452457425803134rad 1.5226123903901447rad 0.728834231174124m", target: "0.4228908414022766m 0.07060255130570678m -0.1609580462659293m", fov: "21.495939317213647", hots: ["none","block","none","none"], text: "This is one of our wheels. It's a gobuilda omniwheel-ish thing (not sure what it's called)"}
)
slidesetup = []
function goTo(val) {
    model.setAttribute("camera-orbit", val.orbit)
    model.setAttribute("camera-target", val.target)
    model.setAttribute("field-of-view", val.fov + "deg")
    val.hots.forEach((el, index) => {
        console.log(el, index)
        document.getElementById("hot" + (index + 1)).style["display"] = el
        if (!!document.querySelector("input")) {
            var checked
            if (el == "block") checked = true; else checked = false;
            document.getElementById("hotcheck" + (index + 1)).checked = checked
        }
    });
    console.log(text)
    console.log(val.text)
    text.innerHTML = val.text
    text.value = val.text
}

function preventFocus(event) {
    if (event.relatedTarget) {
        // Revert focus back to previous blurring element
        event.relatedTarget.focus();
    } else {
        // No previous focus target, blur instead
        this.blur();
        // Alternatively: event.currentTarget.blur();
    }
}

model.addEventListener('focus', preventFocus);
function check(checkbox) {
    if (checkbox.checked == true) {
        document.getElementById("hot" + checkbox.value).style["display"] = 'block'
    } else {
        document.getElementById("hot" + checkbox.value).style["display"] = 'none'
    }
}

var slide = 0
goTo(slides[slide])
window.addEventListener("keydown", (event) => {
    if (event.isComposing || event.code === 229 || document.activeElement === text) {
        return;
    }
    if (event.code === "ArrowRight" && slide != slides.length) {
        slide++
        goTo(slides[slide])
    }
    if (event.code === "ArrowLeft" && slide != 0) {
        slide--
        goTo(slides[slide])
    }
    if (event.code === "KeyK") {
        hots = []
        var arr = Array.prototype.slice.call( document.getElementsByClassName("Hotspot") )
        arr.forEach(element => {
            hots.push(`"${element.style["display"].toString()}"`)
        })
        slidesetup.push(`{orbit: "${model.getCameraOrbit().toString()}", target: "${model.getCameraTarget().toString()}", fov: "${model.getFieldOfView().toString()}", hots: [${hots}], text: "${text.value}"}\n`)
    }
    if (event.code === "KeyC") {
        alert(slidesetup.toString())
    }
});