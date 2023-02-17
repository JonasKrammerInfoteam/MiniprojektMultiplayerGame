using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Contracts.Models
{
    public class JoinGameResponse
    {

        public int GameID { get; }

        public JoinGameResponse(int gameid)
        {
            GameID = gameid;
        }

    }
}
