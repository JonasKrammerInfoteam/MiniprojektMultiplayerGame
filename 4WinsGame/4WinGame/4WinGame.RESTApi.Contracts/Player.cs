using System;

namespace _4WinGame.RESTApi.Contracts
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
