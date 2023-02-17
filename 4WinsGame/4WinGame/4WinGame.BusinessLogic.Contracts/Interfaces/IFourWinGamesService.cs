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
        List<IFourWinGame> Games { get; set; }
        List<FourWinGamePlayer> WaitingGames { get; set; }
        EventHandler OnGameStarted { get; set; }
        List<FourWinGamePlayer> AllPlayers { get; set; }

        IFourWinGame JoinWaitingGame(string player1ID, string player2ID);
        void LeaveActiveGame(string playerID, string gameID);
        void AddGame(string id);
        void AddPlayer(string name, string id);
        IFourWinGame GetGameByID(string id);
    }
}
