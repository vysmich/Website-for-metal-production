let gallery = Array.from(document.querySelectorAll(".gallery a"));
let overlay = document.querySelector("#overlay");
let close = document.querySelector(".fa-times");
let prev = document.querySelector(".fa-arrow-left");
let next = document.querySelector(".fa-arrow-right");
let imgPreload = [];

//preload gallery
if (gallery) {
    let preload = () => {
        
        for (let i = 0; i < gallery.length; i++) {
            let preloadSrc = gallery[i].getAttribute("href");
            let preloadPic = document.createElement("img");
            preloadPic.setAttribute("src", preloadSrc);     
            imgPreload.push(preloadPic);
        }
    };

    preload();
}




gallery.forEach((image) => {
    image.onclick = function (event) {
        //function for displaying arrows
        let hideArrow = () => {
            if (imgNum >= gallery.length - 1) {
                next.style.display = "none";
            } else if (imgNum <= 0) {
                prev.style.display = "none";
            } else {
            }
        };

        //function to display next image
        let nextPicture = () => {
            prev.style.display = "inline-block";
            imgNum = imgNum + 1;
            let imgNext = gallery[imgNum].getAttribute("href");
            let picture = overlay.querySelector("img");
            picture.classList.toggle("animate");
            picture.classList.toggle("animate-two");
            picture.setAttribute("src", imgNext);
            hideArrow();
        };
        //function to display previous image
        let prevPicture = () => {
            next.style.display = "inline-block";
            imgNum = imgNum - 1;
            let imgNext = gallery[imgNum].getAttribute("href");
            let picture = overlay.querySelector("img");
            picture.classList.toggle("animate");
            picture.classList.toggle("animate-two");
            picture.setAttribute("src", imgNext);
            hideArrow();
        };
        //show overlay element with image
        overlay.style.display = "flex";
        event.preventDefault();
        let href = image.getAttribute("href");
        overlay.insertAdjacentHTML(
            "afterbegin",
            `<img src="${href}" class="animate">`
        );
        let imgNum = gallery.indexOf(image);
        prev.style.display = "inline-block";
        next.style.display = "inline-block";
        hideArrow();
        

        ///////shift in gallery

        //next
        next.addEventListener("click", nextPicture);

        //prev
        prev.addEventListener("click", prevPicture);

        //control gallery with arrows
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 39 && !(imgNum >= gallery.length - 1)) {
                nextPicture();
            } else if (e.keyCode == 37 && !(imgNum <= 0)) {
                prevPicture();
            }
        });

        //Swipe gallery for mobile
        document.addEventListener("swipeleft", function () {
            if (!(imgNum >= gallery.length - 1)) {
                nextPicture();
            }
            
        });
        document.addEventListener("swiperight", function () {
            if (!(imgNum <= 0)) {
                prevPicture();
            }
        });

        //close gallery

        close.onclick = () => {
            overlay.removeChild(overlay.firstChild);
            overlay.style.display = "none";
        };

        

    };
});
