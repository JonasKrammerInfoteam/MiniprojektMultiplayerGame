﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic.Contracts.Exceptions
{
    class BoardOutOfRangeException : Exception
    {
        BoardOutOfRangeException() : base("This board column does not exist. Please select another one") { }
    }
}
