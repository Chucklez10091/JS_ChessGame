import piece from "./piece.js";

export default class board{
    
    spaces = {};
    capturedPieces = [];
    
    constructor() {
        // Write space codes explicitly for faster write time
        const spaceCodes = [
            'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
            'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
            'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
            'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
            'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'
        ];

        // Initialize the board with space codes and null for pieces
        for (let i = 0; i < 64; i++) {
            this.spaces[i] = {
                spaceCode: spaceCodes[i],
                piece: null // Initially, no piece on the space
            };
        }
    }

    // Method to get the piece at a specific integer key
    getPieceAt(key) {
        if (key in this.spaces) {
            return this.spaces[key].piece;
        }
        
        return null; // Return null if no piece is found
    }

    // Method to set a piece to a specific integer key
    setPieceTo(pieceToSet, key) {
        if (key in this.spaces) {
            if (this.spaces[key].piece === null){
                this.spaces[key].piece = pieceToSet;
                return true;
            }
        }
        return false;
    }

    // Method to move a piece from one integer key to another
    movePiece(fromKey, toKey) {
        if (fromKey in this.spaces && toKey in this.spaces) {
            // Move the piece
            this.spaces[toKey].piece = this.spaces[fromKey].piece;
            this.spaces[fromKey].piece = null;
        }
    }
    
    // Method to remove a piece from a specific integer key
    removePieceAt(key){
        // if a piece exists at the key
        if (key in this.spaces && this.getPieceAt(key) !== null){
            // remove the piece from the board space
            const temp = this.spaces[key].piece;
            this.spaces[key].piece = null;
            return temp;
        }
        return null;
    }

    capturePieceAt(key){
        if (key in this.spaces && this.getPieceAt(key) !== null){
            let temp = this.getPieceAt(key)
            this.capturedPieces.push(temp);
            temp.captured = true;
            // remove the piece from the board space
            this.spaces[key].piece = null;
            return temp;
        }
        return null;
    }

    // Method to get the space code for a specific integer key
    getSpaceCode(key) {
        if (key in this.spaces) {
            return this.spaces[key].spaceCode;
        }
        return null; // Return null if the key is invalid
    }
}