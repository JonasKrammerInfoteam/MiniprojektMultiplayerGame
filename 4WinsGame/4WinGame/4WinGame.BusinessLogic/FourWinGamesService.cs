using _4WinGame.BusinessLogic.Contracts.Exceptions;
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
        public List<IFourWinGame> Games { get; set; }
        public List<FourWinGamePlayer> WaitingGames { get; set; }
        public EventHandler OnGameStarted { get; set; }
        public List<FourWinGamePlayer> AllPlayers { get; set; }


        public IFourWinGame JoinWaitingGame(FourWinGamePlayer p1, FourWinGamePlayer p2)
        {
            if (WaitingGames.Contains(p1))
            {
                throw new PlayerNotInWaitingListException();
            }
            FourWinGame game = new FourWinGame(p1, p2);
            Games.Add(game);
            return game;
        }

        public void LeaveActiveGame(FourWinGamePlayer p, string gameID)
        {
            throw new NotImplementedException();
        }

        public IFourWinGame GetGameByID(string gameID)
        {
            throw new NotImplementedException();
        }
    }
}
