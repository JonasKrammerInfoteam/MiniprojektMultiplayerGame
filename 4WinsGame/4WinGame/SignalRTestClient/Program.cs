using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Threading.Tasks;

namespace SignalRTestClient
{
    public class Program
    {
        static async Task Main(string[] args) {
            await TestSignalRClient();
        }

        private static async Task TestSignalRClient()
        {
            HubConnection hubConnection;
            string serverAddress = "https://localhost:44362/fourwingamehub";
            do
            {
                await Task.Delay(3000);
                hubConnection = new HubConnectionBuilder()
                    .WithUrl(serverAddress)
                    .WithAutomaticReconnect()
                    .Build();
                Console.WriteLine("try to connect to hub");
                try
                {
                    await hubConnection.StartAsync();
                } catch(Exception exception)
                {
                    Console.WriteLine($"Exception {exception}");
                }
            } while (hubConnection.State != HubConnectionState.Connected);

            Console.WriteLine("Connection to hub was successful");
            Console.WriteLine($"Connection-ID: {hubConnection.ConnectionId}");
            Console.ReadLine();
        }

    }
}
