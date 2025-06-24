// this code now can drag an element but it can go outside of borders which is a problem still.
// we need also to implement resize, zoom in and zoom out

"use strict";

class FluidElement {
    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw TypeError("element is expected to be an HTMLElement!");
        }

        // this.element = element;
        // this.pointerDown = false;
        // this.startX = element.offsetLeft;
        // this.startY = element.offsetTop;

        element.style.position = "fixed";

        if (!element.style.left) {
            element.style.left = "0px";
        }
        if (!element.style.top) {
            element.style.top = "0px";
        }

        this.element = element;
        this.pointerDown = false;

        this.AddPointerDownEventListener();
        this.AddPointerMoveEventListener();
        this.AddPointerUpEventListener();
    }

    AddPointerDownEventListener(destroy = false) {
        if (destroy) {
            console.log("Removing pointerdown event listener");
            this.element.removeEventListener(
                "pointerdown",
                this.handlePointerDown
            );
            return;
        }

        console.log("Adding pointerdown event listener");
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.element.addEventListener("pointerdown", this.handlePointerDown);
    }

    handlePointerDown(e) {
        console.log("Pointer down event triggered");
        e.preventDefault();
        this.pointerDown = true;
    }

    AddPointerMoveEventListener(destroy = false) {
        if (destroy) {
            console.log("Removing pointermove event listener");
            window.removeEventListener("pointermove", this.handlePointerMove);
            return;
        }

        console.log("Adding pointermove event listener");
        this.handlePointerMove = this.handlePointerMove.bind(this);
        window.addEventListener("pointermove", this.handlePointerMove);
    }

    handlePointerMove(e) {
        e.preventDefault();
        if (this.pointerDown) {
            console.log(
                `Moving element - movementX: ${e.movementX}, movementY: ${e.movementY}`
            );
            this.element.style.left =
                Number(this.element.style.left.slice(0, -2)) +
                e.movementX +
                "px";
            this.element.style.top =
                Number(this.element.style.top.slice(0, -2)) +
                e.movementY +
                "px";
        }
    }

    AddPointerUpEventListener(destroy = false) {
        if (destroy) {
            console.log("Removing pointerup event listener");
            window.removeEventListener("pointerup", this.handlePointerUp);
            return;
        }

        console.log("Adding pointerup event listener");
        this.handlePointerUp = this.handlePointerUp.bind(this);
        window.addEventListener("pointerup", this.handlePointerUp);
    }

    handlePointerUp(e) {
        console.log("Pointer up event triggered");
        e.preventDefault();
        this.pointerDown = false;
    }

    destroy() {
        console.log("Destroying FluidElement - removing all event listeners");
        this.AddPointerDownEventListener(true);
        this.AddPointerMoveEventListener(true);
        this.AddPointerUpEventListener(true);
    }
}

let img = document.images[0];
let fluidImg = new FluidElement(img);

setTimeout(function () {
    fluidImg.destroy();
}, 10000);
