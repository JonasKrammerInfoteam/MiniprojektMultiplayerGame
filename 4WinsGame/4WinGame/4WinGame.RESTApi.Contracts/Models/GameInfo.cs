using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Contracts.Models
{
    public class GameInfo
    {
        
        public int[][] Board { get; set; }
        public Player Opponent { get; set; }
        public bool YourMove { get; set; }

        public GameInfo(int[][] board, Player opponent, bool yourmove)
        {
            Board = board;
            Opponent = opponent;
            YourMove = yourmove;
        }

        public GameInfo()
        {

        }

    }
}
