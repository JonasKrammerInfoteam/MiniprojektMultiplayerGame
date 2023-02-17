using _4WinGame.BusinessLogic.Contracts.Models;
using System;

namespace _4WinGame.BusinessLogic.Contracts.Interfaces
{
    public interface IFourWinGame
    {
        EventHandler OnGameStateChange { get; }
        EventHandler OnGameFinish { get; }
        string ID { get; }
        
        void DoMove(int column);
        FourWinGamePlayer GetWinner();
        void Resign(FourWinGamePlayer p);
        FourWinGamePlayer GetCurrentPlayer();
    }
}
