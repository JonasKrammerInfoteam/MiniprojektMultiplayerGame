using _4WinGame.BusinessLogic.Contracts.Models;
using System;

namespace _4WinGame.BusinessLogic.Contracts.Interfaces
{
    public interface IFourWinGame
    {
        EventHandler OnGameStateChange { get; set; }
        EventHandler OnGameFinish { get; set; }
        int ID { get; }
        
        void DoMove(int column);
        FourWinGamePlayer GetWinner();
        void Resign(FourWinGamePlayer p);
        FourWinGamePlayer GetCurrentPlayer();
    }
}
