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
        public int CurrentPlayer { get; }
        public EventHandler OnGameStateChange { get; }
        public EventHandler OnGameFinish { get; }
        public int ID { get; }


        public void DoMove(int column)
        {
            throw new NotImplementedException();
        }
        public FourWinGamePlayer GetWinner()
        {
            throw new NotImplementedException();
        } 

        public void Resign(FourWinGamePlayer p)
        {

        }

        public void getCurrentPlayer()
        {

        }

    }
}
