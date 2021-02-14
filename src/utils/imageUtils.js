export const imageToBase64 = async imageFile => {
    return await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result);
    })
}

export const base64ToTiles = image => {
    return new Promise (resolve => {
        const picture = new Image();
        picture.onload = () => resolve(sliceTiles(picture));
        picture.src = image
    })
}

const sliceTiles = picture => {
    let tilesArray = []
    const canvas = document.createElement('canvas');
    canvas.width = picture.width;
    canvas.height = picture.height;
    const context = canvas.getContext('2d')
    context.drawImage(picture, 0, 0);
    const tileWidth = canvas.width / 4;
    const tileHeight = canvas.height / 4;
    let oneElementIsBlank =  false;
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            let imageData = context.getImageData(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = tileWidth;
            tempCanvas.height = tileHeight;
            const tempContext = tempCanvas.getContext('2d');
            if (Math.random() < 0.2 && !oneElementIsBlank) {
                oneElementIsBlank = true;
                imageData = context.createImageData(tileWidth, tileHeight)
            }
            tempContext.putImageData(imageData, 0, 0);
            tilesArray = [
                ...tilesArray,
                tempCanvas.toDataURL('image/png'),
            ]
        }
    }
    return tilesArray;
}

const BLANK_TILE_DEFAULT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAABCCAYAAABtjkmUAAAA9ElEQVR4Xu3TAREAAAiDQNe/tD3+sAHgdh1rYCxZYFdc+AmKW1zYAIzWcosLG4DRWm5xYQMwWsstLmwARmu5xYUNwGgtt7iwARit5RYXNgCjtdziwgZgtJZbXNgAjNZyiwsbgNFabnFhAzBayy0ubABGa7nFhQ3AaC23uLABGK3lFhc2AKO13OLCBmC0lltc2ACM1nKLCxuA0VpucWEDMFrLLS5sAEZrucWFDcBoLbe4sAEYreUWFzYAo7Xc4sIGYLSWW1zYAIzWcosLG4DRWm5xYQMwWsstLmwARmu5xYUNwGgtt7iwARit5RYXNgCjtVw47gOToQBDC7+/1AAAAABJRU5ErkJggg=='

export const moveClickedTile = (currentBoard, tileClicked) => {
    // determine if clicked tile is adjacent to blank one
    const likelyValid = currentBoard.some((tile, index) => 
        tile === BLANK_TILE_DEFAULT &&
        [1, -1, 4, -4].some(offset => index === tileClicked + offset)
    )
    // swap tiles
    return likelyValid ? currentBoard.map((tile, index) => {
        if (tile === BLANK_TILE_DEFAULT) return currentBoard[tileClicked]
        else if (index === tileClicked) return BLANK_TILE_DEFAULT
        return tile
    }) : currentBoard
}

export const compareArrays = (current, winner) => {
    return current.length === winner.length &&
    current.every((v, i) => v === winner[i])
}