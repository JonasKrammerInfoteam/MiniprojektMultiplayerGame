﻿using System;

namespace _4WinGame.RESTApi.Contracts.Models
{
    public class Player
    {
        public string PlayerName { get;}

        public Player(string playerName)
        {
            PlayerName = playerName;
        }

    }
}
