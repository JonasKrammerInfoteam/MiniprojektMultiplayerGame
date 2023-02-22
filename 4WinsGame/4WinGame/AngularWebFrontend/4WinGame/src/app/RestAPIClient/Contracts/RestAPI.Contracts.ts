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
    board: number[][];
    opponent: Player;
    yourMove: Boolean;
    constructor(board: number[][], opponent: Player, yourMove: Boolean)
    {
        this.board = board;
        this.opponent = opponent;
        this.yourMove = yourMove;
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
    gameInfo: GameInfo;
    constructor(gameInfo: GameInfo)
    {
        this.gameInfo = gameInfo;
    }
}