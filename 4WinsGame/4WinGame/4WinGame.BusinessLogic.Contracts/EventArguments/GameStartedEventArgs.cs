using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic.Contracts.EventArguments
{
    class GameStartedEventArgs : EventArgs
    {
        int GameID;
        public GameStartedEventArgs(int id)
        {
            GameID = id;
        }

    }
}
