using _4WinGame.BusinessLogic.Contracts.Interfaces;
using _4WinGame.BusinessLogic.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic
{
    class FourWinGamesService : IFourWinGamesService
    {
        public const int BoardWidth = 7;
        public const int BoardHeight = 6;
        public List<FourWinGamePlayer> WaitingGames { get; set; }
        public EventHandler OnGameStarted { get; set; }
        public List<FourWinGamePlayer> AllPlayers { get; set; }


        public IFourWinGame JoinWaitingGame(FourWinGamePlayer p1, FourWinGamePlayer p2)
        {
            throw new NotImplementedException();
        }

        public void LeaveActiveGame(FourWinGamePlayer p, string gameID)
        {
            throw new NotImplementedException();
        }

        public void AddGame(string id)
        {
            throw new NotImplementedException();
        }

        public void AddPlayer(string name, string id)
        {
            throw new NotImplementedException();
        }

        public IFourWinGame GetGameByID(string id)
        {
            throw new NotImplementedException();
        }
    }
}
