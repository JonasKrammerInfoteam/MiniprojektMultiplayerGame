using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Contracts
{
    public class GameInfo
    {

        public string PlayerName { get; }

        public GameInfo(Player player)
        {
            PlayerName = player.PlayerName;
        }

    }
}
