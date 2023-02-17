using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic.Contracts.Exceptions
{
    class PlayerNotInGameException : Exception
    {
        PlayerNotInGameException() : base("This player is not in this game") { }
    }
}
