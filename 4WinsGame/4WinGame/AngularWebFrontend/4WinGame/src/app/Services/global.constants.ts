enum GameState {
    Login = 0,
    Lobby = 1,
    Ingame = 2,
}

export class GlobalConstants {
    public static PageTitle : string = "4 Gewinnt";
    public static gameState : GameState = GameState.Login;

    public static SetGameStateToIngame() : void {
        this.gameState = GameState.Ingame;
    }

    public static SetGameStateToLobby() : void {
        this.gameState = GameState.Lobby;
    }   
    
    public static SetGameStateToLogin() : void {
        this.gameState = GameState.Login;
    }

}