class Score {
    private _bricksLeft: number = 0
    private _lives: number =     3

    
    public get bricksLeft() : number {
        return this._bricksLeft
    }

    
    public set bricksLeft(v : number) {
        this._bricksLeft = v;
    }
    
    
    public get lives() : number {
        return this._lives
    }
    
    
    public set lives(v : number) {
        this._lives = v;
    }
    
}