using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4WinGame.BusinessLogic.Contracts.Models
{
    class FourWinGamePlayer
    {
        public string Name { get; }
        public int ID { get; }
        public FourWinGamePlayer(string name, int id)
        {
            Name = name;
            ID = id;
        }
    }
}
