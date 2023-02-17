using _4WinGame.BusinessLogic.Contracts.Interfaces;
using _4WinGame.BusinessLogic.Contracts.Models;
using System;

namespace _4WinGame.BusinessLogic
{
    public class FourWinGame : IFourWinGame
    {
        public int[][] Board { get; }
        public FourWinGamePlayer Player1 { get; }
        public FourWinGamePlayer Player2 { get; }

        public int ID { get; }

        public EventHandler OnCurrentPlayerChange { get; set; }

        public void DoMove(int column)
        {
            throw new NotImplementedException();
        }

        FourWinGamePlayer IFourWinGame.GetWinner()
        {
            throw new NotImplementedException();
        }

        public FourWinGamePlayer 
    }
}
