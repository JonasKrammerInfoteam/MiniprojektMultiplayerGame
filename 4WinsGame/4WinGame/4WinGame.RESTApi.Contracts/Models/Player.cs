using System;

namespace _4WinGame.RESTApi.Contracts.Models
{
    public class Player
    {
        public string PlayerName { get; protected set; }

        public Player(string playerName)
        {
            PlayerName = playerName;
        }

    }
}
