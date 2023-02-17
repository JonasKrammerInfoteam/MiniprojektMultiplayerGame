using _4WinGame.BusinessLogic.Contracts.Exceptions;
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
            FourWinGamePlayer found = fourWinGameService.AllPlayers.Where(p => p.ID == player.PlayerID).FirstOrDefault();
            if (found==null)
            {
                throw new PlayerNotFoundException();
            }
            fourWinGameService.AllPlayers.Add(new FourWinGamePlayer(player.PlayerName, player.PlayerID));
        }

        public JoinGameResponse JoinGame(MyPlayer p1, int waitingGameListIndex)
        {
            FourWinGamePlayer found = fourWinGameService.AllPlayers.Where(player => player.ID == p1.PlayerID).FirstOrDefault();
            if (found==null) {
                throw new PlayerNotFoundException();
            }
            if(waitingGameListIndex > fourWinGameService.WaitingGames.Count)
            {
                throw new WaitingListEntryNotFoundException();
            }
            IFourWinGame fourWinGame = fourWinGameService.JoinWaitingGame(fourWinGameService.WaitingGames.ElementAt(waitingGameListIndex), found);
            return new JoinGameResponse(fourWinGame.GameID);
        }

        public void DoMove(int column, string gameID, MyPlayer player)
        {
            if(!gameIDList.Contains(gameID))
            {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.GameNotFoundException();
            }
            FourWinGamePlayer found = fourWinGameService.AllPlayers.Where(p => p.ID == player.PlayerID).FirstOrDefault();
            if (found==null) {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.PlayerNotFoundException();
            } 
            if(fourWinGameService.GetGameByID(gameID).Player1.ID != player.PlayerID ||
                fourWinGameService.GetGameByID(gameID).Player2.ID != player.PlayerID)
            {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.PlayerNotInGameException();
            }

            try
            {
                fourWinGameService.GetGameByID(gameID).DoMove(column);
            }
            catch (BoardColumnIsFullException e)
            {

                throw new DoMoveException("The column is already full", e);
            }
            catch (BoardOutOfRangeException e)
            {
                throw new DoMoveException("The column is out of range!", e);
            }
        }

        public void LeaveGame(MyPlayer player, string gameID)
        {
            if (!gameIDList.Contains(gameID))
            {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.GameNotFoundException();
            }
            try
            {
                FourWinGamePlayer found = fourWinGameService.AllPlayers.Where(p => p.ID==player.PlayerID).FirstOrDefault();
                if (found==null)
                {
                    throw new PlayerNotFoundException();
                }
                fourWinGameService.LeaveActiveGame(found, gameID);
                connectionService.LeavePlayer(player.PlayerID);
            }
            catch (BusinessLogic.Contracts.Exceptions.PlayerNotInGameException)
            {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.PlayerNotInGameException();
            }
        }

        public WaitingGamesResponse GetWaitingGames()
        {
            return new WaitingGamesResponse(fourWinGameService.WaitingGames.Select(player => new WaitingGame(player.Name)).ToList());
        }

        public GameInfoResponse GetGameInfo(string gameID, string playerID)
        {
            if (!gameIDList.Contains(gameID))
            {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.GameNotFoundException();
            }
            FourWinGamePlayer found = fourWinGameService.AllPlayers.Where(p => p.ID == playerID).FirstOrDefault();
            if(found==null)
            {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.PlayerNotFoundException();
            }
            IFourWinGame fourWinGame = fourWinGameService.GetGameByID(gameID);
            if(fourWinGame.Player1.ID != playerID ||
                fourWinGame.Player2.ID != playerID)
            {
                throw new _4WinGame.RESTApi.Contracts.Exceptions.PlayerNotInGameException();
            }
            bool yourmove = (playerID==fourWinGame.GetCurrentPlayer().ID) ? true : false;
            ///string playerName = (playerID == fourWinGame.GetCurrentPlayer().ID) ? "Andere Spieler" : found.Name;
            return new GameInfoResponse(new GameInfo(fourWinGame.Board, new Player(playerName), yourmove));
        }



    }
}
