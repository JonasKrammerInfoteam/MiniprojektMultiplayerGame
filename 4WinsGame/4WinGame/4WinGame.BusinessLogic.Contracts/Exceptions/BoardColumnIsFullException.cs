using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic.Contracts.Exceptions
{
    class BoardColumnIsFullException : Exception
    {
        BoardColumnIsFullException() : base("This board column is full. Please select another one") { }
    }
}
