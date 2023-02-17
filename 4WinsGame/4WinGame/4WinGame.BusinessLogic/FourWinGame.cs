using _4WinGame.BusinessLogic.Contracts.Exceptions;
using _4WinGame.BusinessLogic.Contracts.Interfaces;
using _4WinGame.BusinessLogic.Contracts.Models;
using System;

namespace _4WinGame.BusinessLogic
{
    public class FourWinGame : IFourWinGame
    {
        public const int BoardWidth = 7;
        public const int BoardHeight = 6;
        public int[,] Board { get; set; }
        public FourWinGamePlayer Player1 { get; set; }
        public FourWinGamePlayer Player2 { get; set; }
        public int CurrentPlayer { get; set; }
        public EventHandler OnGameStateChange { get; set; }
        public EventHandler OnGameFinish { get; set; }
        public string GameID { get; set; }

        public FourWinGame(FourWinGamePlayer player1, FourWinGamePlayer player2)
        {
            // set empty board
            Board = new int [BoardHeight, BoardWidth];
            for (int row = 0; row < BoardWidth; row++)
            {
                for (int column = 0; column < BoardHeight; column++)
                {
                    Board[row, column] = 0;
                }
            }

            Player1 = player1;
            Player2 = player2;
            CurrentPlayer = 1;
            Guid uuid = Guid.NewGuid();
            GameID = uuid.ToString();
        }
        public void DoMove(int column, FourWinGamePlayer player)
        {
            string playerID = player.ID;
            if (Player1.ID != playerID && Player2.ID != playerID)
            {
                throw new PlayerNotInGameException();
            }
            if (Player1.ID == playerID && CurrentPlayer != 1 || Player2.ID == playerID && CurrentPlayer != 2)
            {
                throw new NotYourTurnException();
            }
            if (Board[BoardHeight-1, column-1] != 0)
            {
                throw new BoardColumnIsFullException();
            }
            if (column < 1 || column > 7)
            {
                throw new BoardOutOfRangeException();
            }

            for (int row = 0; row < BoardHeight; row++)
            {
                if (Board[row, column-1] == 0)
                {
                    Board[row, column-1] = CurrentPlayer;
                }
            }

            CurrentPlayer = (CurrentPlayer - 1) * -1 + 2; // Toggle CurrentPlayer
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

        public bool IsPlayerInGame(string playerID)
        {
            if (Player1.ID == playerID || Player2.ID == playerID)
            {
                return true;
            }
            return false;
        }

        public FourWinGamePlayer GetOpponent(FourWinGamePlayer player)
        {
            if (Player1.ID == player.ID)
            {
                return Player2;
            }
            if (Player2. ID == player.ID)
            {
                return Player1;
            }
            throw new PlayerNotInGameException();
        }
    }
}
