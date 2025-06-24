// 1- refactor fluid element so there is only handle....... methods and the bindings are
// done in the constructor and there is only a destroy method that removes the listeners

// 2- use percentages for top and left instead of pxs for the elements to stay at
// its same place when zoomed in or out

// note we will use the default browser scroll, zoom in, and zoom out for our application.

// this code now can drag an element but it can go outside of borders which is a problem still.
// we need also to implement resize, zoom in and zoom out

"use strict";

class FluidElement {
    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw TypeError("element is expected to be an HTMLElement!");
        }
        
        this.element = element;
        this.pointerDown = false;
        this.initElementPos();

        this.handlePointerDown = this.handlePointerDown.bind(this);
        element.addEventListener("pointerdown", this.handlePointerDown);

        this.handlePointerMove = this.handlePointerMove.bind(this);
        window.addEventListener("pointermove", this.handlePointerMove);

        this.handlePointerUp = this.handlePointerUp.bind(this);
        window.addEventListener("pointerup", this.handlePointerUp);
    }

    initElementPos(){
        this.element.style.position = "fixed";
        this.element.style.left = "0%";
        this.element.style.top = "0%";
    }

    handlePointerDown(e) {
        console.log("Pointer down event triggered");
        e.preventDefault();
        this.pointerDown = true;
    }

    handlePointerMove(e) {
        e.preventDefault();
        if (this.pointerDown) {
            console.log(
                `Moving element - movementX: ${e.movementX}, movementY: ${e.movementY}`
            );

            const sensitivity = 100;

            this.element.style.left = e.movementX / (this.element.parentElement.offsetWidth) * sensitivity +
            Number(this.element.style.left.slice(0, -1)) +
            "%";
            this.element.style.top = e.movementY / (this.element.parentElement.offsetHeight) * sensitivity +
            Number(this.element.style.top.slice(0, -1)) +
            "%";
        }
    }

    handlePointerUp(e) {
        console.log("Pointer up event triggered");
        e.preventDefault();
        this.pointerDown = false;
    }

    destroy() {
        console.log("Destroying FluidElement - removing all event listeners");
        this.element.removeEventListener("pointerdown", this.handlePointerDown);
        window.removeEventListener("pointermove", this.handlePointerMove);
        window.removeEventListener("pointerup", this.handlePointerUp);
    }
}

let img = document.images[0];
let fluidImg = new FluidElement(img);

setTimeout(function () {
    fluidImg.destroy();
}, 10000);
