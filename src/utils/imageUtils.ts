import * as Png from 'pngjs';

export const imageToBase64 = async (imageFile: File): Promise<string> => {
    return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result as string);
    })
}

export const base64ToTiles = (image: string): Promise<string[]> => {
    return new Promise (resolve => {
        const picture = new Image();
        picture.onload = () => resolve(sliceTiles(picture));
        picture.src = image as string;
    })
}

const sliceTiles = (picture: HTMLImageElement): string[] => {
    const tilesArray: string[] = [];
    const canvas = document.createElement('canvas');
    canvas.width = picture.width;
    canvas.height = picture.height;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(picture, 0, 0);
    const tileWidth = canvas.width / 4;
    const tileHeight = canvas.height / 4;
    let oneElementIsBlank =  false;
    // by default board will be 4 x 4 tiles
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            let imageData = context.getImageData(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = tileWidth;
            tempCanvas.height = tileHeight;
            const tempContext = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
            // create blank/transparent tile
            if (Math.random() < 0.2 && !oneElementIsBlank) {
                imageData = context.createImageData(tileWidth, tileHeight);
                oneElementIsBlank = true;
            }
            tempContext.putImageData(imageData, 0, 0);
            tilesArray.push(tempCanvas.toDataURL('image/png'));
        }
    }
    return tilesArray;
}

export const moveClickedTile = (currentBoard: string[], tileClicked: number) => {
    // determine if clicked tile is adjacent to blank one
    const likelyValid = currentBoard.some((tile, index) => 
        transparentTile(tile) &&
        [1, -1, 4, -4].some(offset => index === tileClicked + offset)
    )
    // swap tiles
    return likelyValid ? currentBoard.map((tile, index) => {
        if (transparentTile(tile)) return currentBoard[tileClicked]
        else if (index === tileClicked) return currentBoard.filter(tile => transparentTile(tile))[0]
        return tile
    }) : currentBoard
}

export const compareArrays = (current: string[], winner: string[]) => {
    return current.length === winner.length &&
    current.every((v, i) => v === winner[i]);
}

const transparentTile = (base64: string): boolean => {
    const tileToPNG = Png.PNG.sync.read(Buffer.from(base64.split(',')[1], 'base64'));
    const uint8 = Uint8ClampedArray.from(tileToPNG.data);
    return uint8.every(bit => bit === 0)
} 