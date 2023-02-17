using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Contracts.Models
{
    public class GameInfo
    {
        
        public int[][] Board { get; }
        public Player Opponent { get; }
        public bool YourMove { get; }

        public GameInfo(int[][] board, Player opponent, bool yourmove)
        {
            Board = board;
            Opponent = opponent;
            YourMove = yourmove;
        }

    }
}
