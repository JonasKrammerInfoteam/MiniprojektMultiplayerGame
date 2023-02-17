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
            IFourWinGame game = new FourWinGame(p1, p2);
            Games.Add(game);
            return game;
        }

        public void LeaveActiveGame(FourWinGamePlayer p, string gameID)
        {
            throw new NotImplementedException();
            IFourWinGame game = GetGameByID(gameID);
            if (game.Player1.ID != p.ID && game.Player2.ID != p.ID)
            {
                throw new PlayerNotInGameException();
            }
            Games.Remove(game);
            // Declare Winner?
        }

        public IFourWinGame GetGameByID(string gameID)
        { 
            foreach (IFourWinGame game in Games)
            {
                if (game.ID == gameID)
                {
                    return game;
                }
            }
            throw new GameNotFoundException();
        }
    }
}
