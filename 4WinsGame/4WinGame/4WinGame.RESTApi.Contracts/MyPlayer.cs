using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Contracts
{
    public class MyPlayer : Player
    {

        public int PlayerID { get; }
        public string RTPConnectionID { get; }

        public MyPlayer(string playerName, string rtpconnectionid, int id) : base(playerName)
        {
            PlayerName = playerName;
            PlayerID = id;
            RTPConnectionID = rtpconnectionid;
        }
    }
}
