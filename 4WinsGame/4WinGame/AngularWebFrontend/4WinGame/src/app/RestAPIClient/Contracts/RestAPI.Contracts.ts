export class Player
{
    playerName: string;
    constructor(playerName: string)
    {
        this.playerName = playerName;
    }
}

export class MyPlayer extends Player
{
    playerID: string;
    rtpConnectionID: string;
    constructor(playerID: string, rtpConnectionID: string, playerName: string)
    {
        super(playerName);
        this.playerID = playerID;
        this.rtpConnectionID = rtpConnectionID;
    }
}

export class GameInfo
{
    Board: number[][];
    Opponent: Player;
    YourMove: Boolean;
    constructor(board: number[][], opponent: Player, yourMove: Boolean)
    {
        this.Board = board;
        this.Opponent = opponent;
        this.YourMove = yourMove;
    }
}

export class RegisterPlayerResponse
{
    registeredPlayer: MyPlayer;
    constructor(registeredPlayer: MyPlayer)
    {
        this.registeredPlayer = registeredPlayer;
    }
}

export class WaitingGamesResponse
{
    waitingGames: WaitingGame[];
    constructor(waitingGames: WaitingGame[])
    {
        this.waitingGames = waitingGames;
    }
}

export class JoinGameResponse
{
    GameID: string;
    constructor(gameID: string)
    {
        this.GameID = gameID; 
    }
}

export class WaitingGame
{
    playerName: string;
    constructor(playerName: string)
    {
        this.playerName = playerName;
    }
}

export class GameInfoResponse
{
    GameInfo: GameInfo;
    constructor(gameInfo: GameInfo)
    {
        this.GameInfo = gameInfo;
    }
}