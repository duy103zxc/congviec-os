function createGrid(size = 16) {
    const gridlinesToggle = document.getElementById('gridlines-toggle');
    for (let i = 0; i < size; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('id', `row-${i}`)
        row.style.cssText = `display: flex;width: 500px; height: ${500/size}px; min-width: 500px; min-height: ${500/size}px; max-width: 500px; max-height: ${500/size}px`
        document.querySelector('.grid').appendChild(row);
        for (let j = 0; j < size; j++) {
            let box = document.createElement('div');
            box.classList.add('box');
            box.id = `${i}-${j}`
            if (gridlinesToggle.checked) {
                box.style.cssText = `user-select: none; border: 1px solid #D3D3D3; width: ${500/size}px; height: ${500/size}px; min-width: 0px; min-height: 0px; max-width: ${500/size}px; max-height: ${500/size}px;`
            }
            else{
                box.style.cssText = `user-select: none; width: ${500/size}px; height: ${500/size}px; min-width: 0px; min-height: 0px; max-width: ${500/size}px; max-height: ${500/size}px;`
            }
            row.appendChild(box);
        }
    }
    draw();
}

function clearGrid() {
    let boxes = document.querySelectorAll('.box')
    boxes.forEach(box => {
        if (box.style.backgroundColor != 'white'){
            box.style.backgroundColor = 'white';
        }
    });
}


function draw(color='black', rainbow=false) {
  let isDrawing = false;

  function startDrawing() {
    isDrawing = true;
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function drawBox(box) {
    if (isDrawing) {
        if (rainbow) {
            color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        }
        box.style.backgroundColor = color;
    }
  }

  let boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.addEventListener('mousedown', () => {
      startDrawing();
      drawBox(box);
    });
    box.addEventListener('mouseover', () => {
        drawBox(box);
    });
  });

  document.addEventListener('mouseup', stopDrawing);
}


function removeGrid() {
    let grid = document.querySelector('.grid');
    grid.innerHTML = '';
}

function gridAction() {

    createGrid();

    const boxSlider = document.getElementById('box-slider');
    const boxCountDisplay = document.querySelectorAll('.box-count');
    const eraseButton = document.querySelector('.eraser');
    const clearButton = document.querySelector('.clear');
    const rainbowButton = document.querySelector('.rainbow');
    const colorButton = document.querySelector('.color');

    boxSlider.addEventListener('input', () => {
        boxCountDisplay.forEach(boxCount => boxCount.textContent = boxSlider.value);
        removeGrid();
        createGrid(boxSlider.value);
        const colorPicker = document.querySelector("#color-picker");
        draw(colorPicker.value); 
        if (eraseButton.style.opacity == 1) {
            draw('white');
        }
        else if (rainbowButton.style.opacity == 1) {
            draw('white',true);
        }
    });

    clearButton.onclick = clearGrid;

    eraseButton.addEventListener('click', () => {
        eraseButton.style.cssText = "opacity: 1;"
        rainbowButton.style.cssText = "font-family: neon; color: white; opacity: 0.6; transition: 0.3s; cursor: pointer; background-color: transparent; padding: 10px 20px; margin: 5px; transition-duration: 0.4s; font-size: 1.8rem; text-align: center; text-transform: uppercase; font-weight: 400;"
        draw('white');
    });

    rainbowButton.addEventListener('click', () => {
        rainbowButton.style.cssText = "opacity: 1;"
        eraseButton.style.cssText = "font-family: neon; color: white; opacity: 0.6; transition: 0.3s; cursor: pointer; background-color: transparent; padding: 10px 20px; margin: 5px; transition-duration: 0.4s; font-size: 1.8rem; text-align: center; text-transform: uppercase; font-weight: 400;"
        draw('white',true);
    });

    colorButton.addEventListener('click', () => {
        eraseButton.style.cssText = "font-family: neon; color: white; opacity: 0.6; transition: 0.3s; cursor: pointer; background-color: transparent; padding: 10px 20px; margin: 5px; transition-duration: 0.4s; font-size: 1.8rem; text-align: center; text-transform: uppercase; font-weight: 400;"
        rainbowButton.style.cssText = "font-family: neon; color: white; opacity: 0.6; transition: 0.3s; cursor: pointer; background-color: transparent; padding: 10px 20px; margin: 5px; transition-duration: 0.4s; font-size: 1.8rem; text-align: center; text-transform: uppercase; font-weight: 400;"
        const colorPicker = document.querySelector("#color-picker");
        draw(colorPicker.value); 
    });

    const gridlinesToggle = document.getElementById('gridlines-toggle');
    gridlinesToggle.addEventListener('change', () => {
        let boxes = document.querySelectorAll('.box')
        boxes.forEach(box => {
            if (gridlinesToggle.checked) {
                box.style.border = '1px solid #D3D3D3';
            }
            else {
                box.style.border = 'none';
            }
        });
    });

    window.addEventListener("load", startup, false);

}

function startup() {
    let colorPicker;
    colorPicker = document.querySelector("#color-picker");
    colorPicker.value = "#000000";
    colorPicker.addEventListener("input", updateFirst, false);
    colorPicker.addEventListener("change", updateAll, false);
    colorPicker.select();
}

function updateFirst(event) {
    draw(event.target.value);
}

function updateAll(event) {
    draw(event.target.value);
}

gridAction();

