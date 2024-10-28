// @importScripts("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js")
// @importScripts("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js")
VANTA.GLOBE({
    el: "body",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x5ce50d,
    // color: 0xd4d4d4,
    size: 0.90,
    backgroundColor: 0x0
  })

const handleResize = () => {
  const horizontalHashes = document.querySelectorAll(".horizontal-hashes")
  horizontalHashes.forEach(e => e.innerText =  "# ".repeat(window.innerWidth / 34))

  const verticalHashes = document.querySelectorAll(".vertical-hashes")
  verticalHashes.forEach(e => {
    e.innerHTML = `<p>#</p>`.repeat(window.innerHeight/40)
  })

}

// window.onload = handleResize;
window.addEventListener("resize", handleResize);

