﻿using _4WinGame.BusinessLogic.Contracts.Models;
using System;

namespace _4WinGame.BusinessLogic.Contracts.Interfaces
{
    public interface IFourWinGame
    {
        EventHandler OnGameStateChange { get; set; }
        EventHandler OnGameFinish { get; set; }
        string GameID { get; set; }
        
        void DoMove(int column);
        FourWinGamePlayer GetWinner();
        void Resign(FourWinGamePlayer p);
        FourWinGamePlayer GetCurrentPlayer();
        bool isPlayerInGame(string playerID);
    }
}
