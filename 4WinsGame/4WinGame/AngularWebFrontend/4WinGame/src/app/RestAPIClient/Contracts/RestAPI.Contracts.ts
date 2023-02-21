export class Player
{
    PlayerName: string;
    constructor(playerName: string)
    {
        this.PlayerName = playerName;
    }
}

export class MyPlayer extends Player
{
    PlayerID: string;
    RTPConnectionID: string;
    constructor(playerID: string, rtpConnectionID: string, playerName: string)
    {
        super(playerName);
        this.PlayerID = playerID;
        this.RTPConnectionID = rtpConnectionID;
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
    RegisteredPlayer: MyPlayer;
    constructor(registeredPlayer: MyPlayer)
    {
        this.RegisteredPlayer = registeredPlayer;
    }
}

export class WaitingGamesResponse
{
    WaitingGames: WaitingGame[];
    constructor(waitingGames: WaitingGame[])
    {
        this.WaitingGames = waitingGames;
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
    PlayerName: string;
    constructor(playerName: string)
    {
        this.PlayerName = playerName;
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