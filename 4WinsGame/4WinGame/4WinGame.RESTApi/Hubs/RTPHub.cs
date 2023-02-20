using _4WinGame.RESTApi.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Hubs
{
    public class RTPHub : Hub
    {

        private readonly ConnectionService connectionService;

        public RTPHub(ConnectionService connectionService)
        {
            this.connectionService = connectionService;
        }

        public override async Task OnConnectedAsync()
        {
            connectionService.ConnectedIDs.Add(Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            connectionService.ConnectedIDs.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception); 
        }

    }
}
