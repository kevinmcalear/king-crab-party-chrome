let useKingCrabPary = false;


chrome.storage.local.get(null, (items) => {
  useKingCrabPary = items.useKingCrabPary;

  if (useKingCrabPary != undefined) {
    var checkedEl = document.querySelector('#king-crab-pary-toggle');
    if (checkedEl) {
      checkedEl.checked = useKingCrabPary;
    }
  };
  if(useKingCrabPary) {
    chrome.tabs.executeScript({
      code: '(' + addCrabs + ')();'
     })
  }
});

// hosted crab images here: https://imgur.com/a/8GFdeDc
const crabURL1 = 'https://i.imgur.com/Xh6StCV.png'
const crabURL2 = 'https://i.imgur.com/Ra5KrBL.png'
const crabURL3 = 'https://i.imgur.com/Fky8cWP.png'
const crabURL4 = 'https://i.imgur.com/pg38hCc.png'
const myCrabs = [crabURL1, crabURL2, crabURL3, crabURL4]
const body = document.querySelector('body');


function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}


const addCrabHandler = (e) => {
  const randomCrabURL = myCrabs[Math.floor(Math.random()*myCrabs.length)];
  const img = document.createElement('img')
  img.src = randomCrabURL;
  img.className = 'king-crab-party-crab'
  img.style.position = 'fixed';
  body.append(img);
  img.style.width = '150px';
  img.style.top = `${e.y}px`;
  img.style.left = `${e.x}px`
  img.animate([
    {
      width: 0,
      transform: `rotate(0deg)`
    },
    {
      width: '50px',
      transform: 'rotate(30deg)'
    },
    {
      width: '50px',
      transform: 'rotate(0deg)'
    },
    {
      width: '50px',
      transform: 'rotate(30deg)'
    },
    {
      width: '50px',
      transform: 'rotate(0deg)'
    },
    {
      width: '100px',
      transform: 'rotate(0deg)'
    },
    {
      width: '150px',
      transform: 'rotate(30deg)'
    },
    {
      width: '150px',
      transform: 'rotate(0deg)'
    },
    {
      width: '150px',
      transform: 'rotate(30deg)'
    },
    {
      width: '200px',
      transform: 'rotate(360deg)'
    },
    {
      width: 0,
      transform: 'rotate(-720deg)'
    }
    ], {
      duration: 10000,
      iterations: Infinity
  })
}

const tHandler = throttled(200, addCrabHandler);

const addCrabs = () => {
  document.addEventListener('mousemove', tHandler)
}

const removeCrabs = () => {
  document.removeEventListener('mousemove', tHandler)
  document.querySelectorAll('.king-crab-party-crab').forEach(crabImg => {
    crabImg.remove()
  })
}

document.addEventListener('change',(e) => {
  console.log(e.target.className)
  if (e.target.id === 'king-crab-pary-toggle') {
    if (e.target.checked) {
      // addCrabs()
      chrome.tabs.executeScript({
        code: '(' + addCrabs + ')();'
       })
    } else {
       chrome.tabs.executeScript({
         code: '(' + removeCrabs + ')();'
        })
      // removeCrabs()
    }
  }
  chrome.storage.local.set({'useKingCrabPary': e.target.checked});
});
