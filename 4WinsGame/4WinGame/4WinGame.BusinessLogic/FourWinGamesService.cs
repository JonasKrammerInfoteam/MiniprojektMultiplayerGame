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
        public List<FourWinGamePlayer> WaitingGames { get; }
        public EventHandler OnGameStarted { get; }
        public List<FourWinGamePlayer> AllPlayers { get; }


        public IFourWinGame JoinWaitingGame(FourWinGamePlayer p1, FourWinGamePlayer p2)
        {
            throw new NotImplementedException();
        }

        public void LeaveActiveGame(FourWinGamePlayer p, string gameID)
        {
            throw new NotImplementedException();
        }

        public IFourWinGame GetGameByID(string id)
        {
            throw new NotImplementedException();
        }
    }
}
