import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  //variables to ajust the movements
  const dinoElem = document.querySelector("[data-dino]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0015
  const DINO_FRAME_COUNT = 2
  const FRAME_TIME = 100
  
  let isJumping
  let dinoFrame
  let currentFrameTime
  let yVelocity
  export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  //rectangle around dino
  export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
  }
  
  //displays loosing image on screen
  export function setDinoLose() {
    dinoElem.src = "imgs/dino-lose.png"
  }
  
  function handleRun(delta, speedScale) {
    //to ajust visuals of jumping dino
    if (isJumping) {
      dinoElem.src = `imgs/dino-stationary.png`
      return
    }
  //loops the animation frames
    if (currentFrameTime >= FRAME_TIME) {
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
      dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }
  
  function handleJump(delta) {
    if (!isJumping) return
    //moves the position of the dino
    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
      setCustomProperty(dinoElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  //making a jump when space is pressed
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }