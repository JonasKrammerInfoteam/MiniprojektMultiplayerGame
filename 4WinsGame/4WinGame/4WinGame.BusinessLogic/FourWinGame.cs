using _4WinGame.BusinessLogic.Contracts.Interfaces;
using System;

namespace _4WinGame.BusinessLogic
{
    public class FourWinGame : IFourWinGame
    {
        public int ID { get; }

        public EventHandler OnCurrentPlayerChange { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public void DoMove(int column)
        {
            throw new NotImplementedException();
        }
    }
}
