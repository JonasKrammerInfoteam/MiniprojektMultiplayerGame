﻿using _4WinGame.BusinessLogic.Contracts.Exceptions;
using _4WinGame.BusinessLogic.Contracts.Interfaces;
using _4WinGame.BusinessLogic.Contracts.Models;
using _4WinGame.RESTApi.Contracts.Exceptions;
using _4WinGame.RESTApi.Contracts.Models;
using _4WinGame.RESTApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FourWinGameController : ControllerBase
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

        [HttpPost("RegisterPlayer")]
        public IActionResult RegisterPlayer([FromQuery] string name, [FromQuery] string RTPconnectionID)
        {
            MyPlayer player = new MyPlayer(name, RTPconnectionID, Guid.NewGuid().ToString());
            if(!connectionService.ConnectedIDs.Contains(RTPconnectionID))
            {
                throw new ConnectionIDNotFoundException();
            }
            connectionService.AddPlayer(player.PlayerID, RTPconnectionID);
            return Ok( new RegisterPlayerResponse(player));
        }

        [HttpPost("CreateGame")]
        public IActionResult CreateGame([FromBody] MyPlayer player)
        {
            FourWinGamePlayer found = fourWinGameService.AllPlayers.Where(p => p.ID == player.PlayerID).FirstOrDefault();
            if (found==null)
            {
                throw new PlayerNotFoundException();
            }
            FourWinGamePlayer fourWinGamePlayer = new FourWinGamePlayer(player.PlayerName, player.PlayerID);
            fourWinGameService.AllPlayers.Add(fourWinGamePlayer);
            fourWinGameService.WaitingGames.Add(fourWinGamePlayer);
            return Ok();
        }

        [HttpPost("JoinGame")]
        public IActionResult JoinGame([FromBody] MyPlayer p1, [FromQuery] int waitingGameListIndex)
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
            return Ok(new JoinGameResponse(fourWinGame.ID));
        }

        [HttpPost("DoMove")]
        public IActionResult DoMove([FromQuery] int column, [FromQuery] string gameID, [FromBody] MyPlayer player)
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
                fourWinGameService.GetGameByID(gameID).DoMove(column, found);
            }
            catch (BoardColumnIsFullException e)
            {

                throw new DoMoveException("The column is already full", e);
            }
            catch (BoardOutOfRangeException e)
            {
                throw new DoMoveException("The column is out of range!", e);
            }
            return Ok();
        }

        [HttpPost("LeaveGame")]
        public IActionResult LeaveGame([FromBody] MyPlayer player, [FromQuery] string gameID)
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
            return Ok();
        }

        [HttpGet("GetWaitingGames")]
        public IActionResult GetWaitingGames()
        {
            return Ok(new WaitingGamesResponse(fourWinGameService.WaitingGames.Select(player => new WaitingGame(player.Name)).ToList()));
        }

        [HttpGet("GetGameInfo")]
        public IActionResult GetGameInfo([FromQuery] string gameID, [FromQuery] string playerID)
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
            Player opponent = new Player(fourWinGame.GetOpponent(found).Name);
            return Ok(new GameInfoResponse(new GameInfo(fourWinGame.Board, opponent, yourmove)));
        }        
    }
}
