// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {

    // Grab elements, create settings, etc.
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var mediaConfig =  { video: true };
    var errBack = function(e) {
        console.log('An error has occurred!', e)
    };
    const image = document.getElementById('nose');
    var button = document.getElementById('snap');
    var download = document.getElementById('download');
    var pigelate = document.getElementById('pigelate');
    var final = document.getElementById('demo');
    var img = document.getElementById('pic');

    // Put video listeners into place
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;

            video.play();
            
        });
    }

    /* Legacy code below! */
    else if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(mediaConfig, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(mediaConfig, function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function(stream){
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }

    // Trigger photo take
    button.addEventListener('click', function() {
                   
        imgW = image.clientWidth;
        imgH = image.clientHeight;
        xRes = image.offsetTop;
        yRes = image.offsetLeft;

        context.drawImage(video, 0, 0, 640, 480);
        context.drawImage(image, 245, 255, imgW, imgH);

        if(video.paused) {
            button.innerHTML = "Take Photo!";
            download.style.display = 'none';
            pigelate.style.display = 'none';
            final.style.display = 'none';
            video.style.display = 'block';
            nose.style.display = 'block';
            video.play();
        }
        else {
            video.pause();
            button.innerHTML = "Again!";
            video.style.display = 'none';
            nose.style.display = 'none';
            demo.style.display = 'block';
            download.style.display = 'inline-block';
            pigelate.style.display = 'inline-block';
        }

        img.src = canvas.toDataURL("image/png");
        
    });

    download.addEventListener('click', function() {

        var to_img = demo.toDataURL("image/png");

        var link = download
        link.download = 'happyCNY.png';
        link.href = to_img;   
    });
    

    pigelate.addEventListener('click', function() {

        img.src = canvas.toDataURL("image/png");

    
        document.getElementById('factor').style.display = 'block';

    });


    replaceInputRange();

        var ctx = demo.getContext('2d'),
        img = new Image,
        value = factor.value;
    
        img.onload = pixelate;
        img.src = canvas.toDataURL("image/png");;
    
    function pixelate() {
    
        /// calculate the factor
        var fw = (img.width / value)|0,
            fh = (img.height / value)|0;
        
        /// turn off image smoothing (prefixed in some browsers)
        ctx.imageSmoothingEnabled =
        ctx.mozImageSmoothingEnabled =
        ctx.msImageSmoothingEnabled =
        ctx.webkitImageSmoothingEnabled = false;
        
        /// draw mini-version of image
        ctx.drawImage(img, 0, 0, fw, fh);
        
        /// draw the mini-version back up, voila, pixelated
        ctx.drawImage(demo, 0, 0, fw, fh, 0, 0, img.width, img.height);
    }
    
    /// for demo, use slider to change pixelation
    factor.onchange = function() {
        value = factor.value;
        pixelate();
    };
    

}, false);

/*
 *	Input range replacer version 1.0 BETA
 *
 *	By Ken Fyrstenberg Nilsen (c) 2013 Abdias Software
 *	http://abdiassoftware.com/
 *	PRIVATE.
*/
window.addEventListener("load",replaceInputRange,!1);function replaceInputRange(){var r=document.querySelectorAll("input[type=range]"),p=0,y=r.length,e=[],a=null,O,n,x,v=10,F=0,u=document.createElement("canvas"),s=u.getContext("2d"),o=!1;for(;p<y;p++){if(!r[p]._ids){var q=r[p],c=window.getComputedStyle(q),H=q.parentElement,A=parseFloat(q.min||"0"),z=parseFloat(q.max||"100"),N=parseFloat(q.value||"0"),L=parseFloat(q.step||"1"),f=g(L),G=q.onchange||q.getAttribute("onchange"),b=document.createElement("canvas");O=parseInt(c.getPropertyValue("width"),10)||182;n=Math.max(20,parseInt(c.getPropertyValue("height"),10)||20);if(typeof G==="string"){G=new Function(G)}H.removeChild(r[p]);b.id=q.id;b._id=F;b.name=q.name;b.width=O;b.height=n;b.className=q.className;b.min=A;b.max=z;b.value=N;b.step=L;b.onchange=G;b.style.margin=c.getPropertyValue("margin");b.style.padding=c.getPropertyValue("padding");x=M(b,N,v);b._s={isDown:!1,isInside:!1,kx:x,kw:v,oldx:-1,oldv:N,d:f,q:Math.pow(10,f)};if(o===!1){u.width=v;u.height=n;J(s,v,n);o=!0}I(b);b.onmousedown=B;b.onkeydown=t;b.onfocus=m;b.tabIndex=0;H.appendChild(b);e.push(b);F++}}window.addEventListener("mouseup",E,!1);window.addEventListener("mousemove",D,!1);function m(d){var w=d.srcElement||d.target,l=0,h;a=null;for(;h=e[l];l++){if(h._id===w._id){a=h;return}}}function B(d){var l=j(this,d),i=this._s.kx,h=this._s.kw;a=this;this._s.isInside=!0;if(l.x>i-h*0.5&&l.x<i+h*0.5){this._s.isDown=!0;a=this}}function D(d){if(a===null){return}if(a._s.isDown===!0){var h=j(a,d),i;if(d.preventDefault){d.preventDefault()}i=k(h);if(i==a._s.oldv){return !1}a._s.oldv=i;I(a);if(typeof a.onchange==="function"){a.onchange({value:i,timeStamp:d.timeStamp})}return !1}}function E(d){var h=0,l;if(a!==null&&a._s.isInside===!0){a._s.isInside=!1;a._s.kx=j(a,d).x;l=k({x:a._s.kx});I(a);if(typeof a.onchange==="function"){a.onchange({value:l,timeStamp:d.timeStamp})}}for(;h<e.length;h++){e[h]._s.isDown=!1}}function j(d,h){h=h||window.event;var i=d.getBoundingClientRect(),l=((h.clientX||h.offsetX||h.layerX)-i.left+0.5)|0,w=((h.clientY||h.offsetY||h.layerY)-i.top+0.5)|0;return{x:l,y:w}}function t(d){d=d||window.event;var h=d.keyCode||d.which;switch(h){case 38:case 39:if(d.preventDefault){d.preventDefault()}a.value=parseFloat(a.value)+parseFloat(a.step);if(a.value>a.max){a.value=a.max}K();return !1;case 37:case 40:if(d.preventDefault){d.preventDefault()}a.value=parseFloat(a.value)-parseFloat(a.step);if(a.value<a.min){a.value=a.min}K();return !1;case 35:if(d.preventDefault){d.preventDefault()}a.value=parseFloat(a.max);K();return !1;case 36:if(d.preventDefault){d.preventDefault()}a.value=parseFloat(a.min);K();return !1}}function K(){var P=parseFloat(a.value),l=parseFloat(a.min),i=parseFloat(a.max),C=a._s,w=C.q,d=a._s.kw,h=h=M(a,P);P=(parseInt(P*w+(a.step*0.5),10)/w).toFixed(C.d);a.value=P;C.kx=h;I(a);if(typeof a.onchange==="function"){a.onchange({value:P})}}function k(h){var C,l=a._s,i=l.q,w=parseFloat(a.step),d=l.kw;if(h.x<d*0.5){h.x=d*0.5}if(h.x>a.width-d*0.5){h.x=a.width-d*0.5}C=((h.x-d*0.5)/(a.width-d-1))*(a.max-a.min);C=C/(w*i)*(w*i);if(C<a.min){C=a.min}if(C>a.max){C=a.max}C=C.toFixed(l.d);a.value=C;l.kx=h.x;return C}function I(d){var i=d.getContext("2d"),S=d._s,Q=S.kx,C=S.kw,R=S.oldx,T=d.width,l=d.height,P=C*0.5;i.fillStyle="#000";if(R>-1){i.clearRect(R-1,0,C+2,l)}i.fillRect(P,l*0.5-1,T-C,2);S.oldx=Q-P;i.drawImage(u,Q-P,0)}function J(d,U,P){var T=[2,0,U-2,0,U,2,U,P-2,U-2,P,2,P,0,P-2,0,2],Q=0,R=T.length;d.fillStyle="#888";d.strokeStyle="#ccc";d.beginPath();for(;Q<R;Q+=2){(Q===0)?d.moveTo(T[Q],T[Q+1]):d.lineTo(T[Q],T[Q+1])}d.closePath();d.fill();d.stroke();if(U>7){C(0.5,"#333");C(-0.5,"#aaa")}function C(i,h){d.translate(0,i);d.strokeStyle=h;d.beginPath();S(3,P*0.3,U-3,P*0.3);S(3,P*0.5,U-3,P*0.5);S(3,P*0.7,U-3,P*0.7);d.stroke()}function S(h,l,i,w){d.moveTo(h,l);d.lineTo(i,w)}}function g(h){var d=(h+"").match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return d?Math.max(0,(d[1]?d[1].length:0)-(d[2]?+d[2]:0)):0}function M(d,C,h){var P=d.width,i=h?h:d._s.kw,l=(C/(d.max-d.min))*(P-i)+i*0.5;if(l<i*0.5){l=i*0.5}if(l>P-i*0.5){l=P-i*0.5}return l}};