using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.RESTApi.Contracts.Models
{
    public class WaitingGamesResponse
    {
        public WaitingGame[] WaitingGames { get;}
        
        public WaitingGamesResponse(WaitingGame[] waitingGames) 
        {
            WaitingGames = waitingGames;
        }

    }

}
