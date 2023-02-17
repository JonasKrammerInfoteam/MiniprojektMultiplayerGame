using _4WinGame.BusinessLogic.Contracts.Interfaces;
using _4WinGame.BusinessLogic.Contracts.Models;
using System;

namespace _4WinGame.BusinessLogic
{
    public class FourWinGame : IFourWinGame
    {
        public int[][] Board { get; set; }
        public FourWinGamePlayer Player1 { get; set; }
        public FourWinGamePlayer Player2 { get; set; }
        public int CurrentPlayer { get; set; }
        public EventHandler OnGameStateChange { get; set; }
        public EventHandler OnGameFinish { get; set}
        public string ID { get; set; }


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
            throw new NotImplementedException();
        }

        public FourWinGamePlayer GetCurrentPlayer()
        {
            if (CurrentPlayer == 1)
            {
                return Player1;
            }
            else if (CurrentPlayer == 2)
            {
                return Player2;
            }
            throw new IndexOutOfRangeException();
        }
    }
}
