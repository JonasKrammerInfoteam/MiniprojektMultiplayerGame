using _4WinGame.BusinessLogic.Contracts.Exceptions;
using _4WinGame.BusinessLogic.Contracts.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace _4WinGame.BusinessLogic.Tests
{
    [TestClass]
    public class FourWinGameTests 
    {
        private FourWinGame fourWinGame;

        [TestInitialize]
        public void Init()
        {
            fourWinGame = new FourWinGame();
            fourWinGame.Player1 = new Contracts.Models.FourWinGamePlayer("Player1", "ID");
            fourWinGame.Player1 = new Contracts.Models.FourWinGamePlayer("Player2", "ID");
        }
        
        [TestMethod]
        public void DoMove_FieldWhereColummIsFull_ColummISFullException()
        {
            fourWinGame.Board = new int[][]
            {
                new int[]{0,2,0,0,0,0,0},
                new int[]{0,1,0,0,0,0,0},
                new int[]{0,2,0,0,0,0,0},
                new int[]{0,1,0,0,0,0,0},
                new int[]{0,1,0,0,0,0,0},
                new int[]{0,2,0,0,0,0,0},
            };
            Assert.ThrowsException<BoardColumnIsFullException>(()=>fourWinGame.DoMove(2));
            
        }

        [TestMethod]
        public void DoMove_BoardOutOfRange()
        {
            Assert.ThrowsException<BoardOutOfRangeException>(() => fourWinGame.DoMove(8));
            Assert.ThrowsException<BoardOutOfRangeException>(() => fourWinGame.DoMove(0));

        }
        [TestMethod]
        public void DoMove_MoveNotPossibleBecauseItsNotPlayerMove()
        {
            
        }
        [TestMethod]
        public void DoMove_GamePieceIsSetOneTheFieldOfTheOpponent()
        {

        }
        [TestMethod]
        public void GetWinner_PlayerNotInGame()
        {

        }
        [TestMethod]
        public void ReSign_PlayerNotInGame()
        {

        }
        [TestMethod]
        public void GetCurrentPlayer_SetCurrentPlayerOne_ReturnsPlayerOne()
        {
            fourWinGame.CurrentPlayer = 1;
            var player = new Contracts.Models.FourWinGamePlayer("Test", "ID");
            fourWinGame.Player1 = player;
            Assert.AreEqual(player, fourWinGame.GetCurrentPlayer());
        }

        [TestMethod]
        public void GetCurrentPlayer_SetCurrentPlayerTwo_ReturnsPlayerTwo()
        {
            fourWinGame.CurrentPlayer = 2;
            var player = new Contracts.Models.FourWinGamePlayer("Test", "ID");
            fourWinGame.Player2 = player;
            Assert.AreEqual(player, fourWinGame.GetCurrentPlayer());
        }

        }
}
