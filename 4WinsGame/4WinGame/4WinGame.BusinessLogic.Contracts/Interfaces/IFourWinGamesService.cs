using _4WinGame.BusinessLogic.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic.Contracts.Interfaces
{
    public interface IFourWinGamesService
    {
        List<FourWinGamePlayer> WaitingGames { get; set; }
        EventHandler OnGameStarted { get; set; }
        List<FourWinGamePlayer> AllPlayers { get; set; }

        IFourWinGame JoinWaitingGame(FourWinGamePlayer p1, FourWinGamePlayer p2);
        void LeaveActiveGame(FourWinGamePlayer p, string gameID);
        void AddGame(string id);
        void AddPlayer(string name, string id);
        IFourWinGame GetGameByID(string id);
    }
}
