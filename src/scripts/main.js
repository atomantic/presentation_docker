"use strict";

bespoke.plugins.delaySrc = function(deck, options) {
  var delayedObjects = deck.slides.map(function(slide) {
    return [].slice.call(slide.querySelectorAll('[data-bespoke-delay-src]'), 0);
  });

  deck.on('activate', function(slide) {
    delayedObjects[slide.index].map(function(object) {
      object.setAttribute('src', object.dataset.bespokeDelaySrc);
      requestAnimationFrame(function() {
        object.classList.add('scrolldown');
      })
    })
  });

  deck.on('deactivate', function(slide) {
    delayedObjects[slide.index].map(function(object) {
      object.setAttribute('src', '');
      object.classList.remove('scrolldown');
    })
  })
}

bespoke.plugins.startXGif = function(deck, options) {
  var gifs = deck.slides.map(function(slide) {
    return [].slice.call(slide.querySelectorAll('x-gif'), 0);
  });

  var setStopped = function(stopped) {
    return function(slide) {
      gifs[slide.index].map(function(gif) {
        stopped ? gif.setAttribute('stopped', '') : gif.removeAttribute('stopped');
        slide.slide.classList.remove('x-gif-finished');
        if (!stopped) gif.addEventListener('x-gif-finished', function() {
            slide.slide.classList.add('x-gif-finished');
          })
      });
    }
  };

  deck.on('activate', setStopped(false));
  deck.on('deactivate', setStopped(true));
};

bespoke.plugins.steps = function(deck, options) {
  var currentSlide;
  deck.on('activate', function(e) {
    // if(e.slide.id==='projecttime'){
    //     // build chart

    // }
    var numSteps = parseInt(e.slide.dataset.bespokeSteps);
    if (numSteps && numSteps > 1) {
      currentSlide = e.slide;
      currentSlide.dataset.bespokeStepNr = 1;
    } else {
      currentSlide = undefined;
    }
  });
  deck.on('next', function(e) {
    if (currentSlide) {
      var numSteps = parseInt(currentSlide.dataset.bespokeSteps),
        stepNr = parseInt(currentSlide.dataset.bespokeStepNr);
      if (stepNr < numSteps) {
        currentSlide.dataset.bespokeStepNr = stepNr + 1;
        return false;
      }
    }
    return true;
  })
};

bespoke.from('article', {
  keys: true,
  touch: true,
  scale: false,
  hash: true,
  state: true,
  bullets: '.bullet',
  delaySrc: true,
  startXGif: true,
  steps: true
});

window.addEventListener('resize', function() {
  [].forEach.call(document.querySelectorAll('x-gif'), function(elem) {
    elem.relayout();
  });
})

var brightness = 0;
document.addEventListener('keyup', function(e) {
  var setBrightness = function() {
    document.querySelector('article').style.webkitFilter = "brightness(" + (1 + brightness) + ") contrast(" + (1 + brightness * 0.25) + ")"
  }
  if (e.shiftKey) {
    if (e.keyCode == 38) {
      brightness += 0.1;
      setBrightness(brightness);
    } else if (e.keyCode == 40) {
      brightness -= 0.1;
      setBrightness(brightness);
    } else if (e.keyCode == 48) {
      brightness = 0;
      setBrightness(brightness);
    }
  }
  console.log(e.keyCode);
  if (e.keyCode == 82) { // r
    document.querySelector('.rotate').classList.toggle('on');
  }
})
/*
var myMyo = Myo.create();

myMyo.on('fingers_spread', function(edge){
    if(!edge) return;
    console.log('spread');
    // unlock for 5 minutes
    //myMyo.vibrate();
});

myMyo.on('wave_out', function(edge){
    if(!edge) return;
    bespoke.next();
    myMyo.unlock(60000);
    //myMyo.vibrate();
});
myMyo.on('wave_in', function(edge){
    if(!edge) return;
    bespoke.prev();
    //myMyo.vibrate();
});
var audio = false,
    audioOn = false;
myMyo.on('fist', function(edge){
    if(!edge) return;
    if(!audio){
      audio = document.getElementById('audio');
    }
    if(audioOn){
      audioOn = false;
      audio.pause()
    }else{
      audioOn = true;
      audio.play()
    }
    //myMyo.vibrate();
});
*/
