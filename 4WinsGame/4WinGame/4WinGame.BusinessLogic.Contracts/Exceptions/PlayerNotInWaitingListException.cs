using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic.Contracts.Exceptions
{
    class PlayerNotInWaitingListException : Exception
    {
        PlayerNotInWaitingListException(): base("This player is not in the waiting list") { }
    }
}
