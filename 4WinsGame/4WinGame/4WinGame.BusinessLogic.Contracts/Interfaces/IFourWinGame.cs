using _4WinGame.BusinessLogic.Contracts.Models;
using System;

namespace _4WinGame.BusinessLogic.Contracts.Interfaces
{
    interface IFourWinGame
    {
        int ID { get; }
        EventHandler OnCurrentPlayerChange { get; set; }

        void DoMove(int column);
        FourWinGamePlayer GetWinner();
    }
}
