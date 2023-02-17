using _4WinGame.BusinessLogic.Contracts.Interfaces;
using _4WinGame.BusinessLogic.Contracts.Models;
using _4WinGame.RESTApi.Contracts.Exceptions;
using _4WinGame.RESTApi.Contracts.Models;
using _4WinGame.RESTApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Controllers
{
    public class FourWinGameController
    {

        private List<string> gameIDList;
        private ConnectionService connectionService;
        private IFourWinGamesService fourWinGameService;

        public FourWinGameController(ConnectionService connectionService, IFourWinGamesService fourWinGames)
        {
            this.gameIDList = new List<string>();
            this.connectionService = connectionService;
            this.fourWinGameService = fourWinGames;
        }

        public RegisterPlayerResponse RegisterPlayer(string name, string RTPconnectionID)
        {
            MyPlayer player = new MyPlayer(name, RTPconnectionID, new Guid().ToString());
            connectionService.AddPlayer(player.PlayerID, RTPconnectionID);
            return new RegisterPlayerResponse(player);
        }

        public void CreateGame(MyPlayer player)
        {
            fourWinGameService.AddPlayer(player.PlayerName, player.PlayerID);
        }

        private bool PlayerExists(MyPlayer p1)
        {
            FourWinGamePlayer found = fourWinGameService.AllPlayers.Where(player => player.ID == p1.PlayerID).FirstOrDefault();
            if(found==null)
            {
                return false;
            } else
            {
                return true;
            }
        }

        public JoinGameResponse JoinGame(MyPlayer p1, int waitingGameListIndex)
        {
            if()
        }

        public void DoMove(int column, string gameID, MyPlayer player)
        {
            
        }

        public void LeaveGame(MyPlayer player, string gameID)
        {
            if (!gameIDList.Contains(gameID))
            {
                throw new GameNotFoundException();
            }
            try
            {
                fourWinGameService.LeaveActiveGame(player.PlayerID, gameID);
            }
            catch (BusinessLogic.Contracts.Exceptions.PlayerNotInGameException)
            {
                throw new PlayerNotInGameException();
            }
        }

        public WaitingGamesResponse GetWaitingGames()
        {
        }

        public GameInfoResponse GetGameInfo(string gameID, string playerID, IFourWinGamesService fwgs)
        {

        }



    }
}
