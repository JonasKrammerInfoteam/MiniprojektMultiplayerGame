using _4WinGame.BusinessLogic.Contracts.EventArguments;
using _4WinGame.BusinessLogic.Contracts.Interfaces;
using _4WinGame.RESTApi.Contracts.Models;
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Services
{
    public class FourWinGameEventHandler
    {

        private HubConnection hubConnection;
        private string eventHandlerHubAddress;
        private ConnectionService connectionService;

        public FourWinGameEventHandler(string eventHandlerHubAddress, ConnectionService connectionService)
        {
            this.eventHandlerHubAddress = eventHandlerHubAddress;
            this.connectionService = connectionService;
        }

        public void EventHandlerInitalize()
        {
            string serverAddress = eventHandlerHubAddress;
            Task initalizeTask = new Task(async() =>
            {
                int trycounter = 0;
                int maxcounter = 100;
                do
                {
                    Thread.Sleep(3000);
                    trycounter++;
                    hubConnection = new HubConnectionBuilder()
                        .WithUrl(serverAddress)
                        .WithAutomaticReconnect()
                        .Build();
                    Console.WriteLine("try to connect to hub");
                    try
                    {
                        await hubConnection.StartAsync();
                    }
                    catch (Exception exception)
                    {
                        Console.WriteLine($"Exception {exception}");
                    }
                } while (hubConnection.State != HubConnectionState.Connected || trycounter < maxcounter);
                Console.WriteLine("Connected");
            });
            initalizeTask.Start();
        }

        public void OnWaitingListUpdated(object sender, EventArgs e)
        {
            Task sendTask = new Task(async () => await hubConnection.SendAsync("WaitingListUpdated"));
            sendTask.Start();
        }

        public void OnGameStarted(object sender, EventArgs e)
        {
            GameStartedEventArgs gameStarted = (GameStartedEventArgs)e;
            Task sendTask = new Task(async () => await hubConnection.SendAsync("GameStart", gameStarted.GameID));
            sendTask.Start();
        }

        public void OnGameStateChange(object sender, EventArgs e)
        {
            IFourWinGame fourWinGame = (IFourWinGame)sender;
            Task sendTask = new Task(async () => await hubConnection.SendAsync("GameUpdated", fourWinGame.ID));
            sendTask.Start();
        }

        public void OnGameFinish(object sender, EventArgs e)
        {
            GameWinnerEventArgs gameWinnerEvent = (GameWinnerEventArgs)e;
            IFourWinGame fourWinGame = (IFourWinGame)sender;
            MyPlayer player = connectionService.AllPlayers.Where(p => p.PlayerID == fourWinGame.GetWinner().ID).FirstOrDefault();
            Task sendTask = new Task(async () => await hubConnection.SendAsync("GameFinished", (Player)player, fourWinGame.ID));
            sendTask.Start();
        }

    }
}
