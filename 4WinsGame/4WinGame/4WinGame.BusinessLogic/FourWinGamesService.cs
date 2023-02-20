using _4WinGame.BusinessLogic.Contracts.EventArguments;
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
    public class FourWinGamesService : IFourWinGamesService
    {
        public List<IFourWinGame> Games { get; set; }
        public List<FourWinGamePlayer> WaitingGames { get; set; }
        public EventHandler OnGameStarted { get; set; }
        public List<FourWinGamePlayer> AllPlayers { get; set; }


        public FourWinGamesService()
        {
            AllPlayers = new List<FourWinGamePlayer>();
            WaitingGames = new List<FourWinGamePlayer>();
        }

        public IFourWinGame JoinWaitingGame(FourWinGamePlayer playerFromWaitingList, FourWinGamePlayer playerJoining)
        {
            if (WaitingGames.Contains(playerFromWaitingList))
            {
                throw new PlayerNotInWaitingListException();
            }
            WaitingGames.Remove(playerFromWaitingList);
            IFourWinGame game = new FourWinGame(playerFromWaitingList, playerJoining);
            Games.Add(game);
            OnGameStarted?.Invoke(this, new GameStartedEventArgs(game.ID));
            return game;
        }

        public void LeaveActiveGame(FourWinGamePlayer p, string gameID)
        {
            IFourWinGame game = GetGameByID(gameID);
            if (game.Player1.ID != p.ID && game.Player2.ID != p.ID)
            {
                throw new PlayerNotInGameException();
            }
            game.Resign(p);
            Games.Remove(game);
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
