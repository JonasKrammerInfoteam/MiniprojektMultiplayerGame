using System;

namespace _4WinGame.BusinessLogic.Contracts.Interfaces
{
    public interface IFourWinGame
    {
        int ID { get; }
        EventHandler OnCurrentPlayerChange { get; set; }

        void DoMove(int column);
    }
}
